import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CopCurrencyPipe } from '../../core/pipes/cop-currency.pipe';
import { FormsModule } from '@angular/forms';
import { MetodoNotificacion } from '../../core/models/transaccion.model';
import { Fondo } from '../../core/models/fondo.model';

@Component({
  selector: 'app-suscribir-modal',
  imports: [FormsModule, CopCurrencyPipe],
  templateUrl: './suscribir-modal.html',
  styleUrl: './suscribir-modal.scss',
})
export class SuscribirModal {
  @Input() fondo!: Fondo;
  @Input() saldoDisponible: number = 0;
  @Input() visible: boolean = false;

  @Output() confirmar = new EventEmitter<{ fondo: Fondo; notificacion: MetodoNotificacion }>();
  @Output() cerrar = new EventEmitter<void>();

  notificacion: MetodoNotificacion = 'email';
  errorMensaje: string = '';

  get saldoInsuficiente(): boolean {
    return this.saldoDisponible < this.fondo?.montoMinimo;
  }

  seleccionarNotificacion(metodo: MetodoNotificacion) {
    this.notificacion = metodo;
  }

  onConfirmar() {
    if (this.saldoInsuficiente) {
      this.errorMensaje = 'No tienes saldo suficiente para suscribirte a este fondo.';
      return;
    }
    this.errorMensaje = '';
    this.confirmar.emit({ fondo: this.fondo, notificacion: this.notificacion });
  }

  onCerrar() {
    this.errorMensaje = '';
    this.cerrar.emit();
  }
}
