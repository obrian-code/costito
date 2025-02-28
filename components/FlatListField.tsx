import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Item {
  [x: string]: string;
}

interface Props {
  datos: Item[];
  handleEdit: (item: Item) => void;
  handleDelete: (id: string) => void;
}

export function FlatListField({ datos, handleEdit, handleDelete }: Props) {
  const [toggle, setToggle] = useState<boolean>(false);

  const toggleMenu = () => setToggle(!toggle);
  return (
    <FlatList
      data={datos}
      keyExtractor={(item: Item) => (item as { id: string }).id}
      renderItem={({ item }) => (
        <View style={styles.record}>
          <View style={styles.info}>
            <Text>{`Nombre: ${item.name}`}</Text>
            <Text>{`PT: ${item.pt}`}</Text>
            <Text>{`Cantidad: ${item.cant}`}</Text>
            <Text>{`PU: ${item.pu}`}</Text>
          </View>
          <TouchableOpacity style={styles.menu} onPress={() => toggleMenu()}>
            <Entypo name="dots-two-vertical" size={24} color="black" />
          </TouchableOpacity>

          <View
            style={[
              styles.buttonContainer,
              {
                display: toggle ? "flex" : "none",
              },
            ]}
          >
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEdit(item)}
            >
              <MaterialCommunityIcons
                style={styles.buttonText}
                name="circle-edit-outline"
                size={18}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete((item as { id: string }).id)}
            >
              <AntDesign
                style={styles.buttonText}
                name="delete"
                size={18}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      ListFooterComponent={<View style={{ height: 20 }} />}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  record: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  info: {
    width: "85%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  menu: {
    width: "15%",
    height: "95%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  buttonContainer: {
    right: 10,
    top: 32,
    position: "absolute",
    gap: 5,
    flexDirection: "column",
    marginTop: 10,
  },
  editButton: {
    borderColor: "#f3f3f3",
    backgroundColor: "#f3f3f3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  deleteButton: {
    borderColor: "#f3f3f3",
    backgroundColor: "#f3f3f3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    textAlign: "center",
  },
});
