import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { FormularioGenerico } from "@/components/FormularioGenerico";
import { FieldsI } from "@/interface/Fields";

export function Formulario0() {
  const [nombreProducto, setNombreProducto] = useState("");

  const campos: Array<FieldsI> = [
    {
      label: "Nombre del Producto",
      value: nombreProducto,
      onChangeText: (value: string) => setNombreProducto(value),
    },
  ];

  const handleSubmit = () => {
    if (!nombreProducto) {
      Alert.alert("Error", "Por favor, ingresa el nombre del producto.");
      return;
    }

    setNombreProducto(""); // Limpiar el campo después de enviar
  };

  return (
    <View style={styles.container}>
      <FormularioGenerico
        title="PRODUCTO"
        campos={campos}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
});
