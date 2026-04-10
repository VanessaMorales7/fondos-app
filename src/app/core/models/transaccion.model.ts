export type TipoTransaccion = 'suscripcion' | 'cancelacion';
export type MetodoNotificacion = 'email' | 'sms';

export interface Transaccion {
  id?: number;
  fondoId: number;
  nombreFondo: string;
  tipo: TipoTransaccion;
  monto: number;
  notificacion: MetodoNotificacion;
  fecha: string;
}