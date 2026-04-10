import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  imports: [],
  templateUrl: './metric-card.html',
  styleUrl: './metric-card.scss',
})
export class MetricCard {
  @Input() titulo: string = '';
  @Input() valor: string | number = '';
  @Input() subtitulo: string = '';
}
