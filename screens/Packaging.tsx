import { FlatListField } from "@/components/FlatListField";
import { FormularioGenerico } from "@/components/FormularioGenerico";
import { useProduct } from "@/context/ProductContext";
import { validationsRuleForm } from "@/helpers/validationrule";
import { useFormValidation } from "@/hooks/useFormValidation";
import { FieldsI } from "@/interface/Fields";
import { FormI } from "@/interface/Form";
import { StepOptionConfigI } from "@/interface/Step";
import { calculatePt } from "@/utils/calculatePt";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

export function Packaging({ setStepOption, stepOption }: StepOptionConfigI) {
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
      title: "Packaging",
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
      name,
      pt,
      cant,
      pu,
    };

    addProduct("packaging", nuevoRegistro);

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
            deleteProduct("packaging", id);
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
        title="PACKAGING"
        campos={campos}
        onSubmit={handleSubmit}
        errors={errors}
      />
      <FlatListField
        datos={productData.packaging as never}
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
  record: {
    marginVertical: 5,
    padding: 10,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
});
