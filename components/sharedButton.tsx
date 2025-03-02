import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import XLSX from "xlsx";
import { AntDesign } from "@expo/vector-icons";
import { ProductDataI } from "@/interface/FormatProduct";

export function SharedButton(productData: ProductDataI) {
  const exportToExcel = async () => {
    try {
      const formatted = {
        Producto: [productData.producto],
        Materia_Prima: productData.materia_prima,
        Packaging: productData.packaging,
        Mano_Obra: productData.mano_obra,
        Gastos_Operativos: productData.gastos_operativos,
        Resumen: [productData.cost_analysis],
      };

      const workbook = XLSX.utils.book_new();

      Object.keys(formatted).forEach((key) => {
        const worksheet = XLSX.utils.json_to_sheet(
          formatted[key as keyof typeof formatted]
        );
        XLSX.utils.book_append_sheet(workbook, worksheet, key);
      });

      const excelData = XLSX.write(workbook, {
        type: "base64",
        bookType: "xlsx",
      });

      const filePath = FileSystem.documentDirectory + "Producto.xlsx";

      await FileSystem.writeAsStringAsync(filePath, excelData, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await Sharing.shareAsync(filePath);
    } catch (error) {
      console.error("Error al exportar:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.downloadButton} onPress={exportToExcel}>
      <AntDesign name="clouddownloado" style={styles.downloadButtonText} />
      <Text style={styles.downloadButtonText}>Descargar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  downloadButton: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#25D360",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  downloadButtonText: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
});
