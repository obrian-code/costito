import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export function AboutScreen() {
  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acerca de la Aplicación</Text>
          <Text style={styles.text}>
            Esta aplicación está diseñada para calcular el precio de venta de un
            producto, teniendo en cuenta costos de materia prima, costos
            indirectos, mano de obra y gastos operativos. Facilita el análisis
            de costos y ayuda a establecer precios competitivos y rentables.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Desarrollador</Text>
          <Text style={styles.text}>Nombre: [Tu Nombre]</Text>
          <Text style={styles.text}>Correo: [tuemail@example.com]</Text>
          <Text style={styles.text}>Teléfono: +[Tu Número]</Text>
          <Text style={styles.text}>
            GitHub: [https://github.com/tuusuario]
          </Text>
          <Text style={styles.text}>
            LinkedIn: [https://linkedin.com/in/tuperfil]
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    marginVertical: 50,
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    width: "100%",
  },
  section: {
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
    color: "#25D360",
  },
  text: {
    fontSize: 16,
    textAlign: "justify",
    color: "#333",
    marginBottom: 5,
  },
});
