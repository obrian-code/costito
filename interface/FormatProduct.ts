export interface MaterialI {
  nombre: string;
  pt: number;
  cant: number;
  pu: number;
}

export interface ProductI {
  nombre: string;
  descripcion: string;
  precio: number;
}

export interface CostAnalysisI {
  cu: number;
  igv: number;
  utilidad: number;
}

export interface ProductDataI {
  producto: ProductI;
  materia_prima: MaterialI[];
  packaging: MaterialI[];
  mano_obra: MaterialI[];
  gastos_operativos: MaterialI[];
  cost_analysis: CostAnalysisI;
}
