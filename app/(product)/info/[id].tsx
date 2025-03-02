import { ProductDataI } from "@/interface/FormatProduct";
import { formatProductData } from "@/utils/formatData";
import { QueryProductInfo } from "@/utils/query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { DataTable } from "@/components/Table";
import { CardInfo } from "@/components/CardInfo";
import { SharedButton } from "@/components/sharedButton";
import { InitialInfoScreen } from "@/helpers/constant";
import { styles } from "./style";

export default function InfoScreen() {
  const [productData, setProductData] =
    useState<ProductDataI>(InitialInfoScreen);

  const { id } = useLocalSearchParams();

  const db = useSQLiteContext();

  useEffect(() => {
    fetchProdut();
  }, [id]);

  const fetchProdut = useCallback(async () => {
    try {
      const query = QueryProductInfo(Number(id));
      const result = await db.getAllAsync(query);
      if (result.length > 0) {
        setProductData(formatProductData(result));
      }
    } catch (error) {
      console.error("Error al obtener producto:", error);
    }
  }, [id]);

  return (
    <>
      <Stack.Screen options={{ title: "Información" }} />
      <View style={styles.screenContainer}>
        <ScrollView style={styles.contentContainer}>
          <CardInfo
            title="📌 Leyenda:"
            items={[
              { label: "PT", value: "Precio Total" },
              { label: "CANT", value: "Cantidad" },
              { label: "PU", value: "Precio Unitario" },
              { label: "CU", value: "Cantidad Unitaria" },
            ]}
          />

          <CardInfo
            title="Información General:"
            items={[
              { label: "Nombre", value: productData?.producto.nombre },
              {
                label: "Descripcion",
                value: productData?.producto.descripcion,
              },
              {
                label: "Precio",
                value: productData?.producto.precio.toFixed(2),
              },
            ]}
          />
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

          <CardInfo
            title="Resumen:"
            items={[
              { label: "Utilidad", value: productData?.cost_analysis.utilidad },
              { label: "IGV", value: productData?.cost_analysis.igv },
              { label: "Costo Unitario", value: productData?.cost_analysis.cu },
            ]}
          />
        </ScrollView>

        <View style={styles.buttonContainer}>
          <SharedButton {...productData} />
        </View>
      </View>
    </>
  );
}
