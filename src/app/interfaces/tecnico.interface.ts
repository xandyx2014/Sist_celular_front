export interface RespuestaTecnico {
  ok: boolean;
  data: Tecnico[];
}

export interface Tecnico {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}
