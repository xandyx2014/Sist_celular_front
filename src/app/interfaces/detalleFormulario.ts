export interface RespuestaDetalleFormulario {
  ok: boolean;
  data: DetalleFormulario;
}

export interface DetalleFormulario {
  id?: number;
  descripcion: string;
  precioTotal: string;
  item_id: string;
  detalleFormulario_id: string;
  updatedAt?: string;
  createdAt?: string;
}
