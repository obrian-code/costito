import { ProductDataI } from "@/interface/FormatProduct";

export const formatProductData = (rows: any[]): ProductDataI => {
  const formattedData: ProductDataI = {
    producto: {
      nombre: rows[0].producto_nombre,
      descripcion: rows[0].descripcion,
      precio: rows[0].precio,
    },
    materia_prima: [],
    packaging: [],
    mano_obra: [],
    gastos_operativos: [],
    cost_analysis: {
      cu: 0,
      igv: 0,
      utilidad: 0,
    },
  };

  const materiaPrimaIds = new Set();
  const packagingIds = new Set();
  const manoObraIds = new Set();
  const gastosOperativosIds = new Set();

  rows.forEach((row) => {
    if (row.materia_prima_id && !materiaPrimaIds.has(row.materia_prima_id)) {
      materiaPrimaIds.add(row.materia_prima_id);
      formattedData.materia_prima.push({
        nombre: row.materia_prima_nombre,
        pt: row.materia_prima_pt,
        cant: row.materia_prima_cant,
        pu: row.materia_prima_pu,
      });
    }

    if (row.packaging_id && !packagingIds.has(row.packaging_id)) {
      packagingIds.add(row.packaging_id);
      formattedData.packaging.push({
        nombre: row.packaging_nombre,
        pt: row.packaging_pt,
        cant: row.packaging_cant,
        pu: row.packaging_pu,
      });
    }

    if (row.mano_obra_id && !manoObraIds.has(row.mano_obra_id)) {
      manoObraIds.add(row.mano_obra_id);
      formattedData.mano_obra.push({
        nombre: row.mano_obra_nombre,
        pt: row.mano_obra_pt,
        cant: row.mano_obra_cant,
        pu: row.mano_obra_pu,
      });
    }

    if (row.gastos_id && !gastosOperativosIds.has(row.gastos_id)) {
      gastosOperativosIds.add(row.gastos_id);
      formattedData.gastos_operativos.push({
        nombre: row.gastos_nombre,
        pt: row.gastos_pt,
        cant: row.gastos_cant,
        pu: row.gastos_pu,
      });
    }
    if (row.cost_analysis_id) {
      formattedData.cost_analysis = {
        cu: row.cost_analysis_cu,
        igv: row.cost_analysis_igv,
        utilidad: row.cost_analysis_utilidad,
      };
    }
  });

  return formattedData;
};

export const truncateText = (description: string, maxLength = 25) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
};
