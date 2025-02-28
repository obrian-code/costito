import { FormularioGenerico } from "@/components/FormularioGenerico";
import { FieldsI } from "@/interface/Fields";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { FlatListField } from "../components/FlatListField";

interface RegistroI {
  id: string;
  materiaPrima: string;
  pt: string;
  cant: string;
  pu: string;
}

export function Formulario1() {
  const [datos, setDatos] = useState<RegistroI[]>([]);
  const [formState, setFormState] = useState<RegistroI>({
    id: "",
    materiaPrima: "",
    pt: "",
    cant: "",
    pu: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = () => {
    const { materiaPrima, pt, cant, pu } = formState;

    if (!materiaPrima || !pt || !cant || !pu) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (isEditing) {
      setDatos((prevDatos) =>
        prevDatos.map((item) =>
          item.id === formState.id ? { ...formState } : item
        )
      );
    } else {
      const nuevoRegistro: RegistroI = {
        id: Math.random().toString(),
        materiaPrima,
        pt,
        cant,
        pu,
      };
      setDatos((prevDatos) => [...prevDatos, nuevoRegistro]);
    }

    setFormState({
      id: "",
      materiaPrima: "",
      pt: "",
      cant: "",
      pu: "",
    });
    setIsEditing(false);
  };

  const handleEdit = (item: RegistroI) => {
    setFormState(item);
    setIsEditing(true);
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
            setDatos((prevDatos) => prevDatos.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const campos: Array<FieldsI> = [
    {
      label: "Materia Prima",
      value: formState.materiaPrima,
      onChangeText: (value: string) =>
        setFormState({ ...formState, materiaPrima: value }),
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
        datos={datos as never}
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
