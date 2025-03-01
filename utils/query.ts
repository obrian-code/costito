export const QueryProductInfo = (id: number) => {
  return `SELECT  
      p.id AS producto_id, p.nombre AS producto_nombre, p.descripcion, p.precio,

      mp.id AS materia_prima_id, mp.nombre AS materia_prima_nombre, mp.pt AS materia_prima_pt, mp.cant AS materia_prima_cant, mp.pu AS materia_prima_pu,

      pk.id AS packaging_id, pk.nombre AS packaging_nombre, pk.pt AS packaging_pt, pk.cant AS packaging_cant, pk.pu AS packaging_pu,

      mo.id AS mano_obra_id, mo.nombre AS mano_obra_nombre, 
      mo.pt AS mano_obra_pt, 
      mo.cant AS mano_obra_cant, 
      mo.pu AS mano_obra_pu,

      go.id AS gastos_id, go.nombre AS gastos_nombre, 
      go.pt AS gastos_pt, 
      go.cant AS gastos_cant, 
      go.pu AS gastos_pu,

      ca.id AS cost_analysis_id, 
      ca.cu AS cost_analysis_cu, 
      ca.utilidad AS cost_analysis_utilidad,
      ca.igv AS cost_analysis_igv

      FROM Producto p
      LEFT JOIN materia_prima mp ON p.id = mp.producto_id
      LEFT JOIN packaging pk ON p.id = pk.producto_id
      LEFT JOIN mano_obra mo ON p.id = mo.producto_id
      LEFT JOIN gastos_operativos go ON p.id = go.producto_id
      LEFT JOIN CostAnalysis ca ON p.id = ca.producto_id
      WHERE p.id = ${id};`;
};
