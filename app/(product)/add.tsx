import { Final } from "@/screens/final";
import { Formulario3 } from "@/screens/Formulario3";
import { Formulario4 } from "@/screens/Formulario4";

import { SafeAreaView } from "react-native-safe-area-context";
import { Steps } from "../../components/Steps";
import { IGVSelector } from "@/screens/IGVSelector";
import { Formulario2 } from "@/screens/Formulario2";
import { Formulario1 } from "@/screens/Formulario1";
import { Formulario0 } from "@/screens/Formulario0";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Stack } from "expo-router";
export default function AddProductScreen() {
  const [isIGVSelected, setIsIGVSelected] = useState(false);

  useEffect(() => {
    const checkIGVSelection = async () => {
      try {
        const savedIGV = await AsyncStorage.getItem("selectedIGV");
        if (savedIGV) {
          setIsIGVSelected(true);
        }
        //const savedIGV = await AsyncStorage.clear();
      } catch (error) {
        console.error("Error al verificar la selección de IGV:", error);
      }
    };

    checkIGVSelection();
  }, []);
  const steps = [
    {
      title: "Step 1",
      content: (
        <ScrollView style={{ flex: 1 }}>
          <Formulario0 />
        </ScrollView>
      ),
    },
    {
      title: "Step 2",
      content: (
        <ScrollView style={{ flex: 1 }}>
          <Formulario1 />
        </ScrollView>
      ),
    },
    {
      title: "Step 3",
      content: (
        <ScrollView style={{ flex: 1 }}>
          <Formulario2 />
        </ScrollView>
      ),
    },
    {
      title: "Step 4",
      content: (
        <ScrollView style={{ flex: 1 }}>
          <Formulario3 />
        </ScrollView>
      ),
    },
    {
      title: "Step 5",
      content: (
        <ScrollView style={{ flex: 1 }}>
          <Formulario4 />
        </ScrollView>
      ),
    },
    {
      title: "Step 6",
      content: (
        <ScrollView style={{ flex: 1 }}>
          <Final />
        </ScrollView>
      ),
    },
  ];

  return (
    <GestureHandlerRootView>
      <Stack.Screen options={{ title: "Registrar Producto" }} />
      <SafeAreaView style={{ flex: 1 }}>
        {isIGVSelected ? <Steps steps={steps} /> : <IGVSelector />}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
