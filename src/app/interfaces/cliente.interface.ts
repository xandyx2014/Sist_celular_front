export interface RespuestaCliente {
  ok: boolean;
  data: Cliente[];
}

export interface Cliente {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}
