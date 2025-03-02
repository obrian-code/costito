import React from "react";
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native";

export function DataTable({
  title,
  data,
  columns,
}: {
  title: string;
  data: any[];
  columns: string[];
}) {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.tableRow}>
      {columns.map((col) => (
        <Text key={col} style={styles.cell}>
          {item[col]}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.tableSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            {columns.map((col) => (
              <Text key={col} style={[styles.cell, styles.headerText]}>
                {col}
              </Text>
            ))}
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => String(item?.id || Math.random())}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tableSection: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  tableContainer: {
    borderRadius: 5,
    width: 310,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tableHeader: {
    backgroundColor: "#25D360",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  cell: {
    flex: 1,
    padding: 12,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  downloadButton: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#25D360",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  downloadButtonText: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
});
