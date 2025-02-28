import { FormularioGenerico } from "@/components/FormularioGenerico";
import { FieldsI } from "@/interface/Fields";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface FormState {
  id: string;
  packaging: string;
  pt: string;
  cant: string;
  pu: string;
}

interface Registro {
  id: string;
  packaging: string;
  pt: string;
  cant: string;
  pu: string;
}

export function Formulario2() {
  const [datos, setDatos] = useState<Registro[]>([]);
  const [formState, setFormState] = useState<FormState>({
    id: "",
    packaging: "",
    pt: "",
    cant: "",
    pu: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const campos: Array<FieldsI> = [
    {
      label: "Packaging",
      value: formState.packaging,
      onChangeText: (value: string) =>
        setFormState({ ...formState, packaging: value }),
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
    const { packaging, pt, cant, pu } = formState;

    if (!packaging || !pt || !cant || !pu) {
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
      const nuevoRegistro: Registro = {
        id: Math.random().toString(),
        packaging,
        pt,
        cant,
        pu,
      };
      setDatos((prevDatos) => [...prevDatos, nuevoRegistro]);
    }

    setFormState({
      id: "",
      packaging: "",
      pt: "",
      cant: "",
      pu: "",
    });
    setIsEditing(false);
  };

  const handleEdit = (item: Registro) => {
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

  return (
    <View style={styles.container}>
      <FormularioGenerico
        title="PACKAGING"
        campos={campos}
        onSubmit={handleSubmit}
      />
      {/*       <ScrollView> */}
      <FlatList
        data={datos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.record}>
            <Text>{`Packaging: ${item.packaging}`}</Text>
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
      {/*   </ScrollView> */}
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
