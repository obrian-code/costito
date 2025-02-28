import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function Final() {
  const datos = [
    {
      materiaPrima: 100,
      costosIndirectos: 50,
      manoDeObra: 30,
      gastosOperativos: 20,
    },
    {
      materiaPrima: 200,
      costosIndirectos: 70,
      manoDeObra: 40,
      gastosOperativos: 30,
    },
  ];

  const calcularTotales = () => {
    const totalMateriaPrima = datos.reduce(
      (acc, item) => acc + item.materiaPrima,
      0
    );
    const totalCostosIndirectos = datos.reduce(
      (acc, item) => acc + item.costosIndirectos,
      0
    );
    const totalManoDeObra = datos.reduce(
      (acc, item) => acc + item.manoDeObra,
      0
    );
    const totalGastosOperativos = datos.reduce(
      (acc, item) => acc + item.gastosOperativos,
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
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
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
      </ScrollView>
    </GestureHandlerRootView>
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
