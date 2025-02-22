import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

interface Campo {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
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
          />
        </View>
      ))}
      <Button title="Enviar" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
    padding: 20,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
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
});
