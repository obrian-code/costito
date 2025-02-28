import { AntDesign } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface UserData {
  id: string;
  name: string;
  age: number;
  city: string;
}

const data: UserData[] = [
  { id: "1", name: "Juan Pérez", age: 30, city: "Madrid" },
  { id: "2", name: "Ana Gómez", age: 25, city: "Barcelona" },
  { id: "3", name: "Carlos López", age: 40, city: "Valencia" },
];

const DataTable = ({ title }: { title: string }) => {
  const renderItem = ({ item }: { item: UserData }) => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.age}</Text>
      <Text style={styles.cell}>{item.city}</Text>
    </View>
  );

  return (
    <View style={styles.tableSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.cell, styles.headerText]}>ID</Text>
            <Text style={[styles.cell, styles.headerText]}>Nombre</Text>
            <Text style={[styles.cell, styles.headerText]}>Edad</Text>
            <Text style={[styles.cell, styles.headerText]}>Ciudad</Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default function InfoScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Información" }} />
      <View style={styles.screenContainer}>
        <ScrollView style={styles.contentContainer}>
          <DataTable title="Información General" />
          <DataTable title="Detalles Adicionales" />
          <DataTable title="Resumen" />
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => alert("Finalizado!")}
          >
            <AntDesign
              name="clouddownloado"
              style={styles.downloadButtonText}
            />
            <Text style={styles.downloadButtonText}>Descargar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    width: "100%",
    flex: 1,
    padding: 5,
  },
  tableSection: {
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
    width: "120%",
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
