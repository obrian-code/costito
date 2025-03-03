import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { truncateText } from "@/utils/formatData";

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  const db = useSQLiteContext();

  const [products, setProducts] = useState<
    { id: number; nombre: string; descripcion: string; precio: number }[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const result = await db.getAllAsync<{
        id: number;
        nombre: string;
        descripcion: string;
        precio: number;
      }>("SELECT id, nombre,descripcion, precio FROM Producto");
      setProducts(result);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const filterProducts = products.filter((product) =>
    product.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <>
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
                onPress={() => router.push(`/(product)/info/${product.id}`)}
              >
                <View>
                  <Text style={styles.productName}>{product.nombre}</Text>
                  <Text style={styles.productDescription}>
                    {truncateText(product.descripcion)}
                  </Text>
                  <Text style={styles.productPrice}>
                    Precio: {product.precio.toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => router.push(`/(product)/add`)}
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </>
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
    width: "100%",
    overflow: "scroll",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  productCard: {
    width: "47%",
    height: 100,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 12,
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

  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  productDescription: {
    fontSize: 14,
    color: "gray",
    fontWeight: "500",
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
