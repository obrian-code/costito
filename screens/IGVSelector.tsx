import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import igvOptions from "@/mock/igvOptions.json";
//import { useNavigation } from "expo-router";

interface IGVOption {
  id: string;
  label: string;
  value: number;
}

export function IGVSelector() {
  const [selectedIGV, setSelectedIGV] = useState<IGVOption>(igvOptions[31]);
  //const navigation = useNavigation();
  useEffect(() => {
    const loadIGV = async () => {
      try {
        const savedIGV = await AsyncStorage.getItem("selectedIGV");
        if (savedIGV) {
          const parsedIGV: IGVOption = JSON.parse(savedIGV);
          setSelectedIGV(parsedIGV);
        }
      } catch (error) {
        console.error("Error al cargar el IGV seleccionado:", error);
      }
    };

    loadIGV();
  }, []);

  const saveIGV = async (igv: IGVOption) => {
    try {
      await AsyncStorage.setItem("selectedIGV", JSON.stringify(igv));
      setSelectedIGV(igv);
      console.log({ igv });
      // navigation.push("/home", {});
    } catch (error) {
      console.error("Error al guardar el IGV seleccionado:", error);
    }
  };

  const renderItem = ({ item }: { item: IGVOption }) => (
    <TouchableOpacity style={styles.option} onPress={() => saveIGV(item)}>
      <Text style={styles.optionText}>
        {item.label}
        {selectedIGV.id === item.id ? " ✔️" : ""}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccione el IGV</Text>
      <FlatList
        data={igvOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  list: {
    width: 350,
  },
  option: {
    padding: 15,
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
  },
});
