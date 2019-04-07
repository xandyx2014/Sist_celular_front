export interface RespuestaItem {
  ok: boolean;
  data: Item[];
}

export interface Item {
  id?: number;
  nombre: string;
  marca: string;
  modelo: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: any;
  categoria_id: number;
}
