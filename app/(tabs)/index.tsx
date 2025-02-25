import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const generateRandomProduct = (index) => {
    const names = [
      "Producto A",
      "Producto B",
      "Producto C",
      "Producto D",
      "Producto E",
    ];
    const price = Math.floor(Math.random() * 100) + 1;
    const igv = price * 0.18;
    const cost = price - igv;

    return {
      id: index,
      name: names[index % names.length],
      unitCost: cost.toFixed(2),
      igv: igv.toFixed(2),
      price: price.toFixed(2),
    };
  };

  const generateProducts = () => {
    const products = [];
    for (let i = 0; i < 20; i++) {
      products.push(generateRandomProduct(i));
    }
    return products;
  };

  const products = generateProducts();
  const filterProducts = products.filter((product) =>
    product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Costito</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Botón flotante presionado")}
        >
          <Ionicons name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.View}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Productos</Text>
          <Ionicons name="filter" size={18} color="black" />
        </View>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={24}
            color="gray"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            placeholderTextColor="gray"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <ScrollView>
          <View style={styles.contrainerProduct}>
            {filterProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() =>
                  console.log("Botón flotante presionado", product.id)
                }
              >
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>
                    Costo UNI: {product.unitCost}
                  </Text>
                  <Text style={styles.productPrice}>IGV: {product.igv}</Text>
                  <Text style={styles.productPrice}>
                    Precio: {product.price}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.floatingButton}>
          <Link replace href="/(product)/add">
            <Ionicons name="add" size={30} color="white" />
          </Link>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    padding: 2,
    width: "100%",
    height: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#25D360",
  },
  titleContainer: {
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff",
    fontWeight: "bold",
    fontStyle: "italic",
    marginRight: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
    paddingHorizontal: 10,
  },
  View: {
    flex: 1,
    width: "100%",
    bottom: 0,
    top: 110,
    position: "absolute",
    backgroundColor: "#F0F0F4",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 15,
  },
  header: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0F0F4",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 5,
    margin: 10,
  },
  searchIcon: {
    marginRight: 15,
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  contrainerProduct: {
    /* flex: 1, */
    width: "100%",
    /*  height: "100%", */
    overflow: "scroll",
    flexDirection: "row",
    flexWrap: "wrap",
    /*    backgroundColor: "tomato", */
    gap: 6,
    /*     paddingVertical: 20, */
    paddingHorizontal: 10,

    alignItems: "center",
    justifyContent: "center",
  },
  productCard: {
    width: "47%",
    height: 100,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    /*     margin: 10, */
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  productImage: {
    width: 80,
    height: 80,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  productDetails: {
    /*     flex: 1, */
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "gray",
  },

  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#25D360",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
