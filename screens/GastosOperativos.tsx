import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { FieldsI } from "@/interface/Fields";
import { FormularioGenerico } from "@/components/FormularioGenerico";
import { useProduct } from "@/context/ProductContext";
import { FlatListField } from "@/components/FlatListField";

export function GastosOperativos() {
  const { productData, addProduct } = useProduct();
  const [formState, setFormState] = useState<FormI>({
    id: "",
    name: "",
    pt: "",
    cant: "",
    pu: "",
  });

  const campos: Array<FieldsI> = [
    {
      label: "Gastos OP",
      value: formState.gastosOp,
      onChangeText: (value: string) =>
        setFormState({ ...formState, gastosOp: value }),
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

  const handleSubmit = () => {
    const { name, pt, cant, pu } = formState;
    console.log(!name || !pt || !cant || !pu);
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

    addProduct("gastos_operativos", nuevoRegistro);

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

  return (
    <View style={styles.container}>
      <FormularioGenerico
        title="GASTOS OPERATIVOS UNITARIOS"
        campos={campos}
        onSubmit={handleSubmit}
      />
      <FlatListField
        datos={productData.gastos_operativos as never}
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
