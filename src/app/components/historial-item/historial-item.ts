import { Component, Input } from '@angular/core';
import { CopCurrencyPipe } from '../../core/pipes/cop-currency.pipe';
import { CommonModule } from '@angular/common';
import { Transaccion } from '../../core/models/transaccion.model';

@Component({
  selector: 'app-historial-item',
  imports: [CommonModule, CopCurrencyPipe],
  templateUrl: './historial-item.html',
  styleUrl: './historial-item.scss',
})
export class HistorialItem {
  @Input() transaccion!: Transaccion;

  get esSuscripcion(): boolean {
    return this.transaccion.tipo === 'suscripcion';
  }

  get fechaFormateada(): string {
    return new Date(this.transaccion.fecha).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
