import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { FieldsI } from "@/interface/Fields";
import { FormularioGenerico } from "@/components/FormularioGenerico";
import { FlatListField } from "@/components/FlatListField";
import { useProduct } from "@/context/ProductContext";

export function ManoDeObra() {
  const { productData, addProduct, deleteProduct } = useProduct();

  const [formState, setFormState] = useState<FormI>({
    id: "",
    name: "",
    pt: "",
    cant: "",
    pu: "",
  });

  const campos: Array<FieldsI> = [
    {
      label: "Mano de Obra",
      value: formState.name,
      onChangeText: (value: string) =>
        setFormState({ ...formState, name: value }),
    },
    {
      label: "Cantidad",
      value: formState.cant,
      onChangeText: (value: string) =>
        setFormState({
          ...formState,
          cant: value,
          pt: (parseFloat(value) * parseFloat(formState.pu || "0")).toString(),
        }),
      keyboardType: "numeric",
    },

    {
      label: "Precio Unitario",
      value: formState.pu,
      onChangeText: (value: string) =>
        setFormState({
          ...formState,
          pu: value,
          pt: (
            parseFloat(value) * parseFloat(formState.cant || "0")
          ).toString(),
        }),
      keyboardType: "numeric",
    },
    {
      label: "Precio Total",
      value: formState.pt,
      disabled: true,
    },
  ];

  const handleSubmit = () => {
    const { name, pt, cant, pu, id } = formState;

    if (!name || !pt || !cant || !pu) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const nuevoRegistro = {
      id: Math.random().toString(),
      name: name,
      pt,
      cant,
      pu,
    };

    addProduct("mano_obra", nuevoRegistro);

    setFormState({
      id: "",
      name: "",
      pt: "",
      cant: "",
      pu: "",
    });
  };

  const handleEdit = (item: FormI) => {
    setFormState(item);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Eliminar Registro",
      "¿Estás seguro de que deseas eliminar este registro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            deleteProduct("mano_obra", id);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FormularioGenerico
        title="MANO DE OBRA UNITARIA"
        campos={campos}
        onSubmit={handleSubmit}
      />
      <FlatListField
        datos={productData.mano_obra as never}
        handleEdit={handleEdit as never}
        handleDelete={handleDelete}
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
  record: {
    marginVertical: 5,
    padding: 10,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
});
