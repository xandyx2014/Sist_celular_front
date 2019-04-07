export interface RespuestaCategoria {
  ok: boolean;
  data: Categoria[];
}

export interface Categoria {
  id: number;
  Nombre: string;
  Descripcion: string;
  updatedAt: string;
  createdAt: string;
  deletedAt?: string;
}
