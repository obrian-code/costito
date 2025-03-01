export interface Producto {
  id?: number;
  nombre: string;
}

export interface MateriaPrima {
  id?: number;
  producto_id: number;
  nombre: string;
  cantidad: number;
  pu: number;
}

export interface Packaging {
  id?: number;
  producto_id: number;
  nombre: string;
  cantidad: number;
  pu: number;
}

export interface ManoObra {
  id?: number;
  producto_id: number;
  descripcion: string;
  horas: number;
  pu: number;
}

export interface GastosOperativos {
  id?: number;
  producto_id: number;
  concepto: string;
  monto: number;
}

export interface CostAnalysis {
  id?: number;
  producto_id: number;
  costo_unitario: number;
  margen_utilidad: number;
  igv: number;
  precio_venta: number;
}
