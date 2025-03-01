import { CostAnalysis } from "@/screens/CostAnalysis";
import { ManoDeObra } from "@/screens/ManoDeObra";
import { GastosOperativos } from "@/screens/GastosOperativos";
import { SafeAreaView } from "react-native-safe-area-context";
import { Steps } from "../../components/Steps";
import { IGVSelector } from "@/screens/IGVSelector";
import { Packaging } from "@/screens/Packaging";
import { MateriaPrima } from "@/screens/MateriaPrima";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { ProductProvider } from "@/context/ProductContext";
import { Producto } from "@/screens/Producto";

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
          <Producto />
        </ScrollView>
      ),
    },
    {
      title: "Step 2",
      content: (
        <ScrollView style={{ flex: 1 }}>
          <MateriaPrima />
        </ScrollView>
      ),
    },
    {
      title: "Step 3",
      content: (
        <ScrollView style={{ flex: 1 }}>
          <Packaging />
        </ScrollView>
      ),
    },
    {
      title: "Step 4",
      content: (
        <ScrollView style={{ flex: 1 }}>
          <ManoDeObra />
        </ScrollView>
      ),
    },
    {
      title: "Step 5",
      content: (
        <ScrollView style={{ flex: 1 }}>
          <GastosOperativos />
        </ScrollView>
      ),
    },
    {
      title: "Step 6",
      content: (
        <ScrollView style={{ flex: 1 }}>
          <CostAnalysis />
        </ScrollView>
      ),
    },
  ];

  return (
    <GestureHandlerRootView>
      <ProductProvider>
        <Stack.Screen options={{ title: "Registrar Producto" }} />
        <SafeAreaView style={{ flex: 1 }}>
          {isIGVSelected ? <Steps steps={steps} /> : <IGVSelector />}
        </SafeAreaView>
      </ProductProvider>
    </GestureHandlerRootView>
  );
}
