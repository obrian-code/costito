import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as XLSX from "xlsx";
import RNFS from "react-native-fs";

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

  const handleExportarData = async () => {
    /*    const ws = XLSX.utils.json_to_sheet(datos);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

    const filePath = `${RNFS.DownloadDirectoryPath}/datos_producto.xlsx`;

    RNFS.writeFile(filePath, blob.toString(), "ascii")
      .then(() => {
        console.log("Archivo guardado en:", filePath);
      })
      .catch((error) => {
        console.error("Error al guardar el archivo:", error);
      }); */
  };

  /*   const s2ab = (s: string) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }; */

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
