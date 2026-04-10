import { Injectable } from '@angular/core';
import { environment } from '../../../env/enviroment';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${environment.apiUrl}/usuario/1`;
  private usuarioSubject = new BehaviorSubject<UsuarioModel | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  cargarUsuario() {
    return this.http.get<UsuarioModel>(this.url).pipe(
      tap(usuario => this.usuarioSubject.next(usuario))
    );
  }

  actualizarSaldo(nuevoSaldo: number) {
    return this.http.patch<UsuarioModel>(this.url, { saldo: nuevoSaldo }).pipe(
      tap(usuario => this.usuarioSubject.next(usuario))
    );
  }

  get saldoActual(): number {
    return this.usuarioSubject.value?.saldo ?? 0;
  }
}
