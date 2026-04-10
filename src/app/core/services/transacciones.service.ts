import { Injectable } from '@angular/core';
import { environment } from '../../../env/enviroment';
import { BehaviorSubject, tap } from 'rxjs';
import { MetodoNotificacion, Transaccion } from '../models/transaccion.model';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Fondo } from '../models/fondo.model';

@Injectable({
  providedIn: 'root',
})
export class TransaccionesService {
  private url = `${environment.apiUrl}/transacciones`;
  private transaccionesSubject = new BehaviorSubject<Transaccion[]>([]);
  transacciones$ = this.transaccionesSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private usuarioService: UsuarioService) { }

  cargarTransacciones() {
    return this.http.get<Transaccion[]>(this.url).pipe(
      tap(t => this.transaccionesSubject.next(t))
    );
  }

  suscribirse(fondo: Fondo, notificacion: MetodoNotificacion) {
    const saldoActual = this.usuarioService.saldoActual;

    if (saldoActual < fondo.montoMinimo) {
      throw new Error('Saldo insuficiente');
    }

    const transaccion: Transaccion = {
      fondoId: fondo.id,
      nombreFondo: fondo.nombre,
      tipo: 'suscripcion',
      monto: fondo.montoMinimo,
      notificacion,
      fecha: new Date().toISOString()
    };

    return this.http.post<Transaccion>(this.url, transaccion).pipe(
      tap(t => {
        this.transaccionesSubject.next([...this.transaccionesSubject.value, t]);
        this.usuarioService.actualizarSaldo(saldoActual - fondo.montoMinimo).subscribe();
      })
    );
  }

  cancelar(transaccion: Transaccion) {
    return this.http.delete(`${this.url}/${transaccion.id}`).pipe(
      tap(() => {
        const actualizadas = this.transaccionesSubject.value.filter(t => t.id !== transaccion.id);
        this.transaccionesSubject.next(actualizadas);
        const nuevoSaldo = this.usuarioService.saldoActual + transaccion.monto;
        this.usuarioService.actualizarSaldo(nuevoSaldo).subscribe();
      })
    );
  }
}
