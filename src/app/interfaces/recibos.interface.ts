export interface RespuestaRecibo {
  ok: boolean;
  data: Recibo[];
}

export interface Recibo {
  id: number;
  formaDePago: string;
  garantia: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  recibo_id: number;
}
