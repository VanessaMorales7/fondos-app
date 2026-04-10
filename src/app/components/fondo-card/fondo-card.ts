import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CopCurrencyPipe } from '../../core/pipes/cop-currency.pipe';
import { Fondo } from '../../core/models/fondo.model';
import { Transaccion } from '../../core/models/transaccion.model';

@Component({
  selector: 'app-fondo-card',
  imports: [CopCurrencyPipe],
  templateUrl: './fondo-card.html',
  styleUrl: './fondo-card.scss',
})
export class FondoCard {
  @Input() fondo!: Fondo;
  @Input() saldoDisponible: number = 0;
  @Input() transaccionActiva: Transaccion | null = null;

  @Output() suscribirse = new EventEmitter<Fondo>();
  @Output() cancelar = new EventEmitter<Transaccion>();

  get estasSuscrito(): boolean {
    return this.transaccionActiva !== null;
  }

  get tieneSaldo(): boolean {
    return this.saldoDisponible >= this.fondo.montoMinimo;
  }

  onSuscribirse() {
    this.suscribirse.emit(this.fondo);
  }

  onCancelar() {
    if (this.transaccionActiva) {
      this.cancelar.emit(this.transaccionActiva);
    }
  }
}
