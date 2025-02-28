import { FormularioGenerico } from "@/components/FormularioGenerico";
import { FieldsI } from "@/interface/Fields";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { FlatListField } from "../components/FlatListField";
import { useProduct } from "@/context/ProductContext";

export function MateriaPrima() {
  const { productData, addProduct } = useProduct();
  const [formState, setFormState] = useState<FormI>({
    id: "",
    name: "",
    pt: "",
    cant: "",
    pu: "",
  });

  const handleSubmit = () => {
    const { name, pt, cant, pu } = formState;

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

    addProduct("materia_prima", nuevoRegistro);

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
            const updatedList = productData.materia_prima.filter(
              (item) => item.id !== id
            );

            productData.materia_prima = updatedList;
          },
        },
      ]
    );
  };

  const campos: Array<FieldsI> = [
    {
      label: "Materia Prima",
      value: formState.name,
      onChangeText: (value: string) =>
        setFormState({ ...formState, name: value }),
    },
    {
      label: "PT",
      value: formState.pt,
      onChangeText: (value: string) =>
        setFormState({ ...formState, pt: value }),
      keyboardType: "numeric",
    },
    {
      label: "Cantidad",
      value: formState.cant,
      onChangeText: (value: string) =>
        setFormState({ ...formState, cant: value }),
      keyboardType: "numeric",
    },
    {
      label: "PU",
      value: formState.pu,
      onChangeText: (value: string) =>
        setFormState({ ...formState, pu: value }),
      keyboardType: "numeric",
    },
  ];

  return (
    <View style={styles.container}>
      <FormularioGenerico
        title="MATERIA PRIMA UNITARIA"
        campos={campos}
        onSubmit={handleSubmit}
      />
      <FlatListField
        datos={productData.materia_prima as never}
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
});
