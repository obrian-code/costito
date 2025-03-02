import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CardInfoPropsI {
  title: string;
  items: { label: string; value: string | number }[];
}

export function CardInfo({ title, items }: CardInfoPropsI) {
  return (
    <View style={styles.legendContainer}>
      <Text style={styles.legendTitle}>{title}</Text>
      {items.map((item, index) => (
        <Text key={index} style={styles.legendItem}>
          <Text style={styles.boldText}>{item.label}:</Text> {item.value}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  legendContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  legendItem: {
    fontSize: 16,
    marginBottom: 2,
  },
  boldText: {
    fontWeight: "bold",
  },
});
