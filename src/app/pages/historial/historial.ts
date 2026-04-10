import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TransaccionesService } from '../../core/services/transacciones.service';
import { Transaccion } from '../../core/models/transaccion.model';
import { HistorialItem } from '../../components/historial-item/historial-item';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [HistorialItem],
  templateUrl: './historial.html',
  styleUrl: './historial.scss',
})
export class Historial implements OnInit {

  transacciones: Transaccion[] = [];

  constructor(
    private readonly transaccionesService: TransaccionesService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.transaccionesService.cargarTransacciones().subscribe(t => {
      this.transacciones = t;
      this.cdr.detectChanges();
    });
  }
}