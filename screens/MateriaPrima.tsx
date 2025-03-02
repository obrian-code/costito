import { FormularioGenerico } from "@/components/FormularioGenerico";
import { FieldsI } from "@/interface/Fields";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { FlatListField } from "../components/FlatListField";
import { useProduct } from "@/context/ProductContext";
import { StepOptionConfigI } from "@/interface/Step";
import { calculatePt } from "@/utils/calculatePt";
import { FormI } from "@/interface/Form";
import { validationsRuleForm } from "@/helpers/validationrule";
import { useFormValidation } from "@/hooks/useFormValidation";

export function MateriaPrima({ setStepOption, stepOption }: StepOptionConfigI) {
  const { productData, addProduct, deleteProduct } = useProduct();
  const [formState, setFormState] = useState<FormI>({
    id: "",
    name: "",
    pt: "",
    cant: "",
    pu: "",
  });

  const { errors, setFormInteraction } = useFormValidation(
    formState,
    validationsRuleForm
  );

  const campos: Array<FieldsI> = [
    {
      title: "Materia Prima",
      label: "name",
      value: formState.name,
      onChangeText: (value: string) => {
        setFormState({ ...formState, name: value });
        setFormInteraction({
          isSubmitted: false,
          isTouched: true,
        });
      },
    },
    {
      title: "Cantidad",
      label: "cant",
      value: formState.cant,
      onChangeText: (value: string) => {
        setFormState({
          ...formState,
          cant: value,
          pt: calculatePt(value, formState.pu),
        });
        setFormInteraction({
          isSubmitted: false,
          isTouched: true,
        });
      },
      keyboardType: "numeric",
    },
    {
      title: "Precio Unitario",
      label: "pu",
      value: formState.pu,
      onChangeText: (value: string) => {
        setFormState({
          ...formState,
          pu: value,
          pt: calculatePt(value, formState.cant),
        });
        setFormInteraction({
          isSubmitted: false,
          isTouched: true,
        });
      },
      keyboardType: "numeric",
    },
    {
      title: "Precio Total",
      label: "pt",
      value: formState.pt,
      disabled: true,
    },
  ];

  const handleSubmit = () => {
    setFormInteraction({
      isSubmitted: true,
      isTouched: false,
    });

    const hasErrors =
      errors && typeof errors === "object" && Object.keys(errors).length > 0;

    setStepOption({ ...stepOption, isStepValid: hasErrors }), stepOption;

    if (hasErrors) {
      return;
    }

    const { name, pt, cant, pu } = formState;

    const nuevoRegistro = {
      id: Math.random().toString(),
      name: name,
      pt,
      cant,
      pu,
    };

    addProduct("materia_prima", nuevoRegistro);

    setFormInteraction({
      isSubmitted: false,
      isTouched: false,
    });

    setFormState({
      id: "",
      name: "",
      pt: "",
      cant: "",
      pu: "",
    });
  };

  const handleEdit = (item: FormI) => {
    setFormState(item);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Eliminar Registro",
      "¿Estás seguro de que deseas eliminar este registro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            deleteProduct("materia_prima", id);
          },
        },
      ]
    );
  };

  useEffect(() => {
    setStepOption({ ...stepOption, isStepValid: true });
  }, []);

  return (
    <View style={styles.container}>
      <FormularioGenerico
        title="MATERIA PRIMA UNITARIA"
        campos={campos}
        onSubmit={handleSubmit}
        errors={errors}
      />
      <FlatListField
        datos={productData.materia_prima as never}
        handleEdit={handleEdit as never}
        handleDelete={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
});
