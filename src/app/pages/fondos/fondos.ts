import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CopCurrencyPipe } from '../../core/pipes/cop-currency.pipe';
import { MetricCard } from '../../components/metric-card/metric-card';
import { FondoCard } from '../../components/fondo-card/fondo-card';
import { SuscribirModal } from '../../components/suscribir-modal/suscribir-modal';
import { Fondo } from '../../core/models/fondo.model';
import { MetodoNotificacion, Transaccion } from '../../core/models/transaccion.model';
import { UsuarioModel } from '../../core/models/usuario.model';
import { UsuarioService } from '../../core/services/usuario.service';
import { TransaccionesService } from '../../core/services/transacciones.service';
import { FondosService } from '../../core/services/fondos.service';

@Component({
  selector: 'app-fondos',
  imports: [
    CommonModule,
    AsyncPipe,
    CopCurrencyPipe,
    MetricCard,
    FondoCard,
    SuscribirModal
  ],
  templateUrl: './fondos.html',
  styleUrl: './fondos.scss',
})
export class Fondos implements OnInit {

  fondos: Fondo[] = [];
  usuario: UsuarioModel | null = null;
  transacciones: Transaccion[] = [];

  fondoSeleccionado: Fondo | null = null;
  modalVisible: boolean = false;

  constructor(
    private readonly fondosService: FondosService,
    private readonly transaccionesService: TransaccionesService,
    private readonly usuarioService: UsuarioService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fondosService.cargarFondos().subscribe(f => {
      this.fondos = f;
      this.cdr.detectChanges();
    });

    this.transaccionesService.cargarTransacciones().subscribe(t => {
      this.transacciones = t;
      this.cdr.detectChanges();
    });

    this.usuarioService.cargarUsuario().subscribe(u => {
      this.usuario = u;
      this.cdr.detectChanges();
    });
  }

  get montoInvertido(): number {
    return this.transacciones.reduce((acc, t) => acc + t.monto, 0);
  }

  get fondosActivos(): number {
    return this.transacciones.length;
  }

  getTransaccionActiva(fondo: Fondo): Transaccion | null {
    return this.transacciones.find(t => t.fondoId === fondo.id) ?? null;
  }

  abrirModal(fondo: Fondo) {
    this.fondoSeleccionado = fondo;
    this.modalVisible = true;
  }

  cerrarModal() {
    this.fondoSeleccionado = null;
    this.modalVisible = false;
  }

  onSuscribirse(evento: { fondo: Fondo; notificacion: MetodoNotificacion }) {
    this.transaccionesService.suscribirse(evento.fondo, evento.notificacion).subscribe({
      next: () => this.cerrarModal(),
      error: (err) => console.error(err.message)
    });
  }

  onCancelar(transaccion: Transaccion) {
    this.transaccionesService.cancelar(transaccion).subscribe();
  }
}