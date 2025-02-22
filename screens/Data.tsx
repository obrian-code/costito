import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function Data() {
  const [datos] = useState([
    {
      producto: "camisa",
      materiaPrima: 100,
      costosIndirectos: 50,
      manoDeObra: 30,
      gastosOperativos: 20,
    },
    {
      producto: "empanada",
      materiaPrima: 200,
      costosIndirectos: 70,
      manoDeObra: 40,
      gastosOperativos: 30,
    },
  ]);

  const handleExportarData = () => {
    console.log("Exportar data ---");
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.productName}>Data</Text>
          {datos.map((item, index) => (
            <View style={styles.resultContainer}>
              <Text
                style={styles.tableTitle}
              >{`Producto: ${item.producto}`}</Text>
              <View key={index} style={styles.dataRow}>
                <Text>{`Materia Prima: ${item.materiaPrima}`}</Text>
                <Text>{`Costos Indirectos: ${item.costosIndirectos}`}</Text>
                <Text>{`Mano de Obra: ${item.manoDeObra}`}</Text>
                <Text>{`Gastos Operativos: ${item.gastosOperativos}`}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.exportButton}
            onPress={handleExportarData}
          >
            <Text style={styles.exportButtonText}>Exportar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 35,
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  tableTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  resultContainer: {
    marginVertical: 10,
    padding: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
  },
  dataRow: {
    marginVertical: 5,
  },
  exportButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  exportButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
