import { useProduct } from "@/context/ProductContext";
import { AntDesign } from "@expo/vector-icons";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export function CostAnalysis() {
  const { productData } = useProduct();

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

    const costoUnitario =
      totalMateriaPrima +
      totalCostosIndirectos +
      totalManoDeObra +
      totalGastosOperativos;
    const margenUtilidad = costoUnitario * 0.2; // 20%
    const igv = costoUnitario * 0.18; // 18%
    const precioVenta = costoUnitario + margenUtilidad + igv;

    return {
      costoUnitario,
      margenUtilidad,
      igv,
      precioVenta,
    };
  };
  const totales = calcularTotales();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.containertitle}>
          <Text style={styles.title}>ANÁLISIS DE COSTOS Y UTILIDAD</Text>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.tableTitle}>Resultados:</Text>
          <Text>{`Costo Unitario: ${totales.costoUnitario.toFixed(2)}`}</Text>
          <Text>{`Margen de Utilidad (20%): ${totales.margenUtilidad.toFixed(
            2
          )}`}</Text>
          <Text>{`IGV (18%): ${totales.igv.toFixed(2)}`}</Text>
          <Text>{`Precio de Venta con IGV: ${totales.precioVenta.toFixed(
            2
          )}`}</Text>
        </View>

        <TouchableOpacity style={styles.addContainer}>
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
