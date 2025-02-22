import { FormularioGenerico } from "@/components/FormularioGenerico";
import { FieldsI } from "@/interface/Fields";
import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

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
      <ScrollView>
        <FlatList
          data={datos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.record}>
              <Text>{`Materia Prima: ${item.materiaPrima}`}</Text>
              <Text>{`PT: ${item.pt}`}</Text>
              <Text>{`Cantidad: ${item.cant}`}</Text>
              <Text>{`PU: ${item.pu}`}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
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
    backgroundColor: "#007BFF", // Color para el botón de Editar
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red", // Color para el botón de Eliminar
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
});
