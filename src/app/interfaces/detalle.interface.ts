export interface RespuestaDetalle {
  ok: boolean;
  data: Data[];
}

export interface Data {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  Formularios: Formulario[];
}

export interface Formulario {
  id?: number;
  fechaPedido: string;
  fechaEntrega: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: any;
  cliente_id: number;
  tecnico_id: number;
  DetallesFormularios: DetallesFormulario[];
  Tecnico: Tecnico;
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

export interface DetallesFormulario {
  id: number;
  descripcion: string;
  precioTotal: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  detalleFormulario_id: number;
  item_id: number;
  Item: Item;
}

export interface Item {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  categoria_id: number;
  Categorium: Categorium;
}

export interface Categorium {
  id: number;
  Nombre: string;
  Descripcion: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}
