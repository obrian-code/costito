import { ProductDataI } from "@/interface/FormatProduct";
import { formatProductData } from "@/utils/formatData";
import { QueryProductInfo } from "@/utils/query";
import { AntDesign } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import XLSX from "xlsx";
const DataTable = ({
  title,
  data,
  columns,
}: {
  title: string;
  data: any[];
  columns: string[];
}) => {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.tableRow}>
      {columns.map((col) => (
        <Text key={col} style={styles.cell}>
          {item[col]}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.tableSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            {columns.map((col) => (
              <Text key={col} style={[styles.cell, styles.headerText]}>
                {col}
              </Text>
            ))}
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => String(item?.id || Math.random())}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default function InfoScreen() {
  const { id } = useLocalSearchParams();

  const [productData, setProductData] = useState<ProductDataI>({
    producto: {
      nombre: "",
      descripcion: "",
      precio: 0,
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
  });
  const db = useSQLiteContext();
  useEffect(() => {
    fetchProdut();
  }, [id]);

  const fetchProdut = useCallback(async () => {
    try {
      const query = QueryProductInfo(Number(id));
      const result = await db.getAllAsync(query);
      console.log({ result: formatProductData(result) });
      if (result.length > 0) {
        setProductData(formatProductData(result));
      }
    } catch (error) {
      console.error("Error al obtener producto:", error);
    }
  }, [id]);

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
    <>
      <Stack.Screen options={{ title: "Información" }} />
      <View style={styles.screenContainer}>
        <ScrollView style={styles.contentContainer}>
          {/* Leyenda */}
          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>📌 Leyenda:</Text>
            <Text style={styles.legendItem}>
              <Text style={styles.boldText}>PT:</Text> Precio Total
            </Text>
            <Text style={styles.legendItem}>
              <Text style={styles.boldText}>CANT:</Text> Cantidad
            </Text>
            <Text style={styles.legendItem}>
              <Text style={styles.boldText}>PU:</Text> Precio Unitario
            </Text>
            <Text style={styles.legendItem}>
              <Text style={styles.boldText}>CU:</Text> Cantidad Unitaria
            </Text>
          </View>

          {/* Información General */}

          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Información General:</Text>
            <Text style={styles.legendItem}>
              <Text style={styles.boldText}>Nombre:</Text>{" "}
              {productData?.producto.nombre}
            </Text>
            <Text style={styles.legendItem}>
              <Text style={styles.boldText}>Descripcion:</Text>{" "}
              {productData?.producto.descripcion}
            </Text>
            <Text style={styles.legendItem}>
              <Text style={styles.boldText}>Precio:</Text>{" "}
              {productData?.producto.precio.toFixed(2)}
            </Text>
          </View>

          {/* Detalles Adicionales */}
          <DataTable
            title="Materia Prima"
            data={productData?.materia_prima}
            columns={["nombre", "pt", "cant", "pu"]}
          />
          <DataTable
            title="Packaging"
            data={productData?.packaging}
            columns={["nombre", "pt", "cant", "pu"]}
          />
          <DataTable
            title="Mano de Obra"
            data={productData?.mano_obra}
            columns={["nombre", "pt", "cant", "pu"]}
          />
          <DataTable
            title="Gastos Operativos"
            data={productData?.gastos_operativos}
            columns={["nombre", "pt", "cant", "pu"]}
          />

          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Resumen:</Text>
            <Text style={styles.legendItem}>
              <Text style={styles.boldText}>Utitlidad:</Text>
              {productData?.cost_analysis.utilidad}
            </Text>
            <Text style={styles.legendItem}>
              <Text style={styles.boldText}>IGV:</Text>
              {productData?.cost_analysis.igv}
            </Text>
            <Text style={styles.legendItem}>
              <Text style={styles.boldText}>Costo Unitario:</Text>
              {productData?.cost_analysis.cu}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => {
              exportToExcel();
            }}
          >
            <AntDesign
              name="clouddownloado"
              style={styles.downloadButtonText}
            />
            <Text style={styles.downloadButtonText}>Descargar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    width: "100%",
    flex: 1,
    padding: 5,
  },
  legendContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  legendItem: {
    fontSize: 16,
    marginBottom: 2,
  },
  boldText: {
    fontWeight: "bold",
  },

  tableSection: {
    marginBottom: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  tableContainer: {
    borderRadius: 5,
    width: "120%",
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tableHeader: {
    backgroundColor: "#25D360",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
    padding: 12,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
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
