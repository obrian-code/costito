import { CostAnalysis } from "@/screens/CostAnalysis";
import { ManoDeObra } from "@/screens/ManoDeObra";
import { GastosOperativos } from "@/screens/GastosOperativos";
import { SafeAreaView } from "react-native-safe-area-context";
import { Steps } from "../../components/Steps";
import { Packaging } from "@/screens/Packaging";
import { MateriaPrima } from "@/screens/MateriaPrima";
import { useState } from "react";

import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { ProductProvider } from "@/context/ProductContext";
import { Producto } from "@/screens/Producto";

export default function AddProductScreen() {
  const [stepOption, setStepOption] = useState({
    isStepValid: false,
    submitEvent: false,
  });

  const steps = [
    {
      setStepOption,
      stepOption,
      content: (
        <ScrollView style={{ flex: 1 }}>
          <Producto stepOption={stepOption} setStepOption={setStepOption} />
        </ScrollView>
      ),
    },
    {
      setStepOption,
      stepOption,
      content: (
        <ScrollView style={{ flex: 1 }}>
          <MateriaPrima stepOption={stepOption} setStepOption={setStepOption} />
        </ScrollView>
      ),
    },
    {
      setStepOption,
      stepOption,
      content: (
        <ScrollView style={{ flex: 1 }}>
          <Packaging stepOption={stepOption} setStepOption={setStepOption} />
        </ScrollView>
      ),
    },
    {
      setStepOption,
      stepOption,
      content: (
        <ScrollView style={{ flex: 1 }}>
          <ManoDeObra stepOption={stepOption} setStepOption={setStepOption} />
        </ScrollView>
      ),
    },
    {
      setStepOption,
      stepOption,
      content: (
        <ScrollView style={{ flex: 1 }}>
          <GastosOperativos
            stepOption={stepOption}
            setStepOption={setStepOption}
          />
        </ScrollView>
      ),
    },
    {
      setStepOption,
      stepOption,
      content: (
        <ScrollView style={{ flex: 1 }}>
          <CostAnalysis stepOption={stepOption} setStepOption={setStepOption} />
        </ScrollView>
      ),
    },
  ];

  return (
    <GestureHandlerRootView>
      <ProductProvider>
        <Stack.Screen options={{ title: "Registrar Producto" }} />
        <SafeAreaView style={{ flex: 1 }}>
          <Steps steps={steps} />
        </SafeAreaView>
      </ProductProvider>
    </GestureHandlerRootView>
  );
}
