import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface ErrorListPropsI {
  errors: string[];
}

export function ErrorList({ errors }: ErrorListPropsI) {
  return (
    <View style={styles.container}>
      {errors?.map((error, index) => (
        <View key={`${error}-${index}`} style={styles.errorContainer}>
          <AntDesign name="exclamationcircleo" size={20} color="#e63946" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 5,
    /*   padding: 10, */
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    /*   marginBottom: 10, */
    gap: 5,
  },
  errorText: {
    /* marginLeft: 10, */
    color: "#e63946",
  },
});
