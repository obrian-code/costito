import React, { useState } from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import { FormularioGenerico } from "@/components/FormularioGenerico";
import { FieldsI } from "@/interface/Fields";
import { useProduct } from "@/context/ProductContext";

export function Producto() {
  const { setProducto, productData } = useProduct();

  const [data, setData] = useState({
    producto: "",
    descripcion: "",
    toggle: false,
  });

  const campos: Array<FieldsI> = [
    {
      label: "Nombre",
      value: data.producto,
      onChangeText: (value: string) => setData({ ...data, producto: value }),
    },
    {
      label: "Descripcion",
      value: data.descripcion,
      onChangeText: (value: string) => setData({ ...data, descripcion: value }),
    },
  ];

  const handleSubmit = () => {
    if (!data.producto) {
      Alert.alert("Error", "Por favor, ingresa el nombre del producto.");
      return;
    }

    setProducto({ name: data.producto, description: data.descripcion });
    setData({ producto: "", descripcion: "", toggle: true });
  };

  return (
    <View style={styles.container}>
      <FormularioGenerico
        title="PRODUCTO"
        campos={campos}
        onSubmit={handleSubmit}
      />
      {data.toggle && (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Producto:</Text>

          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{productData.Producto.name}</Text>
            <Text style={styles.itemDescription}>
              {productData.Producto.description}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  listContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
  itemDescription: {
    fontSize: 14,
    color: "gray",
    fontWeight: "500",
  },
});
