export interface UsuarioModel {
  id: number;
  saldo: number;
  notificacion: 'email' | 'sms';
}