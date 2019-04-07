interface RespuestaFormulario {
  ok: boolean;
  data: Formulario[];
}

interface Formulario {
  id?: number;
  fechaPedido: string;
  fechaEntrega: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: any;
  cliente_id: number;
  tecnico_id: number;
}
