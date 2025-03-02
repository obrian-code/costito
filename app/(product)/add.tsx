import { CostAnalysis } from "@/screens/CostAnalysis";
import { ManoDeObra } from "@/screens/ManoDeObra";
import { GastosOperativos } from "@/screens/GastosOperativos";
import { Steps } from "../../components/Steps";
import { Packaging } from "@/screens/Packaging";
import { MateriaPrima } from "@/screens/MateriaPrima";
import { useState } from "react";
import { Stack } from "expo-router";
import { ProductProvider } from "@/context/ProductContext";
import { Producto } from "@/screens/Producto";
import { View, ScrollView } from "react-native";

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
        <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
          <Packaging stepOption={stepOption} setStepOption={setStepOption} />
        </ScrollView>
      ),
    },
    {
      setStepOption,
      stepOption,
      content: (
        <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
          <ManoDeObra stepOption={stepOption} setStepOption={setStepOption} />
        </ScrollView>
      ),
    },
    {
      setStepOption,
      stepOption,
      content: (
        <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
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
        <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
          <CostAnalysis stepOption={stepOption} setStepOption={setStepOption} />
        </ScrollView>
      ),
    },
  ];

  return (
    <ProductProvider>
      <Stack.Screen options={{ title: "Registrar Producto" }} />
      <View style={{ flex: 1 }}>
        <Steps steps={steps} />
      </View>
    </ProductProvider>
  );
}
