import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

interface Campo {
  label: string;
  value: string;
  onChangeText?: (value: string) => void;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  disabled?: boolean;
}

interface FormularioGenericoProps {
  title: string;
  campos: Campo[];
  onSubmit: () => void;
}

export function FormularioGenerico({
  title,
  campos,
  onSubmit,
}: FormularioGenericoProps) {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>{title}</Text>
      {campos.map((campo, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.label}>{campo.label}</Text>
          <TextInput
            style={styles.input}
            value={campo.value}
            onChangeText={campo.onChangeText}
            keyboardType={campo.keyboardType}
            disableFullscreenUI={campo.disabled}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.Submit} onPress={onSubmit}>
        <AntDesign name="plus" size={20} color="#25D360" />
        <Text style={styles.SubmitText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
  },
  Submit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    width: "100%",
    height: 50,
    borderColor: "#25D360",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
  },
  SubmitText: {
    color: "#25D360",
    fontSize: 15,
  },
});
