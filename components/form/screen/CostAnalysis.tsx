import { useProduct } from "@/context/ProductContext";
import { StepOptionConfigI } from "@/interface/Step";
import { AntDesign } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export function CostAnalysis({ setStepOption, stepOption }: StepOptionConfigI) {
  const [submitLocal, setSubmitLocal] = useState(false);
  const { productData } = useProduct();

  const db = useSQLiteContext();

  const calcularTotales = () => {
    const totalMateriaPrima = productData["materia_prima"].reduce(
      (acc, item) => acc + parseFloat(item.pu),
      0
    );
    const totalCostosIndirectos = productData["packaging"].reduce(
      (acc, item) => acc + parseFloat(item.pu),
      0
    );
    const totalManoDeObra = productData["mano_obra"].reduce(
      (acc, item) => acc + parseFloat(item.pu),
      0
    );
    const totalGastosOperativos = productData["gastos_operativos"].reduce(
      (acc, item) => acc + parseFloat(item.pu),
      0
    );

    const muCalculate = parseFloat(productData.Producto.margenUtilidad) / 100;
    const costoUnitario =
      totalMateriaPrima +
      totalCostosIndirectos +
      totalManoDeObra +
      totalGastosOperativos;
    const margenUtilidad = costoUnitario * muCalculate;
    const igv = costoUnitario * parseFloat(productData.Producto.igv);
    const precioVenta = costoUnitario + margenUtilidad + igv;

    return {
      costoUnitario,
      margenUtilidad,
      igv,
      precioVenta,
    };
  };

  const totales = calcularTotales();

  const handleSubmit = async () => {
    const response = await insertarDatosEnDB();
    if (response) {
      setSubmitLocal(true);
      setStepOption({ ...stepOption, submitEvent: true });
    }
  };

  const insertarDatosEnDB = async () => {
    try {
      await db.execAsync("BEGIN TRANSACTION;");

      const queryProducto = `
        INSERT INTO Producto (nombre, descripcion, precio) 
        VALUES (?, ?, ?)
        RETURNING id; 
      `;
      const productoId = await db.getFirstAsync(queryProducto, [
        productData.Producto.name,
        "Deliciosa torta con cobertura de chocolate",
        totales.precioVenta,
      ]);

      const queryCostAnalysis = `
        INSERT INTO CostAnalysis (producto_id, cu, utilidad, igv) 
        VALUES (?, ?, ?, ?)
      `;
      await db.runAsync(queryCostAnalysis, [
        (productoId as { id: number }).id,
        totales.costoUnitario,
        totales.margenUtilidad,
        totales.igv,
      ]);

      const queryMateriaPrima = `
        INSERT INTO materia_prima (producto_id, nombre, pt, cant, pu) 
        VALUES (?, ?, ?, ?, ?);
      `;
      for (const item of productData.materia_prima) {
        await db.runAsync(queryMateriaPrima, [
          (productoId as { id: number }).id,
          item.name,
          item.pt,
          item.cant,
          item.pu,
        ]);
      }

      const queryPackaging = `
        INSERT INTO packaging (producto_id, nombre, pt, cant, pu) 
        VALUES (?, ?, ?, ?, ?);
      `;
      for (const item of productData.packaging) {
        await db.runAsync(queryPackaging, [
          (productoId as { id: number }).id,
          item.name,
          item.pt,
          item.cant,
          item.pu,
        ]);
      }

      const queryManoObra = `
        INSERT INTO mano_obra (producto_id, nombre, pt, cant, pu) 
        VALUES (?, ?, ?, ?, ?);
      `;
      for (const item of productData.mano_obra) {
        await db.runAsync(queryManoObra, [
          (productoId as { id: number }).id,
          item.name,
          item.pt,
          item.cant,
          item.pu,
        ]);
      }

      const queryGastosOperativos = `
        INSERT INTO gastos_operativos (producto_id, nombre, pt, cant, pu) 
        VALUES (?, ?, ?, ?, ?);
      `;
      for (const item of productData.gastos_operativos) {
        await db.runAsync(queryGastosOperativos, [
          (productoId as { id: number }).id,
          item.name,
          item.pt,
          item.cant,
          item.pu,
        ]);
      }

      await db.execAsync("COMMIT;");

      alert("Datos guardados correctamente.");
      return true;
    } catch (error) {
      await db.execAsync("ROLLBACK;");
      console.error("Error al insertar datos:", error);
      alert("No se pudo guardar los datos.");
      return false;
    }
  };

  useEffect(() => {
    if (stepOption.submitEvent && !submitLocal) {
      insertarDatosEnDB();
    }
  }, [stepOption]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.containertitle}>
          <Text style={styles.title}>ANÁLISIS DE COSTOS Y UTILIDAD</Text>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.tableTitle}>Resultados:</Text>
          <Text>{`Costo Unitario: ${totales.costoUnitario.toFixed(2)}`}</Text>
          <Text>{`Margen de Utilidad (${
            productData.Producto.margenUtilidad
          }%): ${totales.margenUtilidad.toFixed(2)}`}</Text>
          <Text>{`IGV (${
            parseFloat(productData.Producto.igv) * 100
          }%): ${totales.igv.toFixed(2)}`}</Text>
          <Text>{`Precio de Venta con IGV: ${totales.precioVenta.toFixed(
            2
          )}`}</Text>
        </View>

        <TouchableOpacity
          style={styles.addContainer}
          onPress={() => handleSubmit()}
        >
          <AntDesign name="plus" style={styles.addText} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
    height: "auto",
  },
  containertitle: {
    width: "100%",
    marginTop: 50,
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    padding: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableTitle: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  resultContainer: {
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
    padding: 10,
    paddingBottom: 30,
    borderRadius: 5,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  addContainer: {
    marginTop: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 3,
    borderStyle: "dotted",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "25%",
    marginBottom: 100,
  },
  addText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "gray",
  },
});
