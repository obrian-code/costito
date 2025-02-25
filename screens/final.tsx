import { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function Final() {
  const [datos, setDatos] = useState([
    {
      materiaPrima: 100,
      costosIndirectos: 50,
      manoDeObra: 30,
      gastosOperativos: 20,
    },
    {
      materiaPrima: 200,
      costosIndirectos: 70,
      manoDeObra: 40,
      gastosOperativos: 30,
    },
  ]);
  /*  */
  const [visible, setVisible] = useState(false); // Estado para mostrar/ocultar el menú
  const [selectedItem, setSelectedItem] = useState(null); // Estado para el item seleccionado
  /*  */
  const calcularTotales = () => {
    const totalMateriaPrima = datos.reduce(
      (acc, item) => acc + item.materiaPrima,
      0
    );
    const totalCostosIndirectos = datos.reduce(
      (acc, item) => acc + item.costosIndirectos,
      0
    );
    const totalManoDeObra = datos.reduce(
      (acc, item) => acc + item.manoDeObra,
      0
    );
    const totalGastosOperativos = datos.reduce(
      (acc, item) => acc + item.gastosOperativos,
      0
    );

    const costoUnitario =
      totalMateriaPrima +
      totalCostosIndirectos +
      totalManoDeObra +
      totalGastosOperativos;
    const margenUtilidad = costoUnitario * 0.2; // 20%
    const igv = costoUnitario * 0.18; // 18%
    const precioVenta = costoUnitario + margenUtilidad + igv;

    return {
      costoUnitario,
      margenUtilidad,
      igv,
      precioVenta,
    };
  };

  const totales = calcularTotales();
  /*  */
  const handleMenuPress = (index: unknown) => {
    setSelectedItem(index);
    setVisible(true);
  };

  const handleMenuItemPress = (value: string) => {
    setVisible(false);
    if (value === "Editar") {
      // Lógica para editar
      console.log("Editar presionado");
    } else if (value === "Eliminar") {
      // Lógica para eliminar
      console.log("Eliminar presionado");
    }
  };

  /*  */
  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>ANÁLISIS DE COSTOS Y UTILIDAD</Text>

          <View style={styles.resultContainer}>
            <Text style={styles.tableTitle}>Resultados:</Text>
            <Text>{`Costo Unitario: ${totales.costoUnitario.toFixed(2)}`}</Text>
            <Text>{`Margen de Utilidad (20%): ${totales.margenUtilidad.toFixed(
              2
            )}`}</Text>
            <Text>{`IGV (18%): ${totales.igv.toFixed(2)}`}</Text>
            <Text>{`Precio de Venta con IGV: ${totales.precioVenta.toFixed(
              2
            )}`}</Text>
          </View>

          {/* Nuevo contenedor con borde dotted */}
          <View style={styles.addContainer}>
            <Text style={styles.addText}>+</Text>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  tableTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  resultContainer: {
    marginVertical: 10,
    padding: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
  },
  addContainer: {
    marginTop: 20,
    padding: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dotted",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  addText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
