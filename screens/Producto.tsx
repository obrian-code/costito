import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import { FormularioGenerico } from "@/components/FormularioGenerico";
import { FieldsI } from "@/interface/Fields";
import { useProduct } from "@/context/ProductContext";
import { StepOptionConfigI } from "@/interface/Step";
import igvOptions from "@/mock/igvOptions.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validationsRuleProducto } from "@/helpers/validationrule";
import { useFormValidation } from "@/hooks/useFormValidation";

export function Producto({ setStepOption, stepOption }: StepOptionConfigI) {
  const { setProducto, productData } = useProduct();

  const [data, setData] = useState({
    producto: "",
    descripcion: "",
    margenUtilidad: "20",
    igv: "0.18",
    toggle: false,
  });

  const { errors, setFormInteraction } = useFormValidation(
    data,
    validationsRuleProducto
  );

  const campos: Array<FieldsI> = [
    {
      title: "Nombre",
      label: "producto",
      value: data.producto,
      onChangeText: (value: string) => {
        setData({ ...data, producto: value });
        setFormInteraction({
          isSubmitted: false,
          isTouched: true,
        });
      },
    },
    {
      title: "Descripcion",
      label: "descripcion",
      value: data.descripcion,
      onChangeText: (value: string) => {
        setData({ ...data, descripcion: value });
        setFormInteraction({
          isSubmitted: false,
          isTouched: true,
        });
      },
    },
    {
      title: "Margen de Utilidad (%)",
      label: "margenUtilidad",
      value: data.margenUtilidad,
      onChangeText: (value: string) => {
        setData({ ...data, margenUtilidad: value });
        setFormInteraction({
          isSubmitted: false,
          isTouched: true,
        });
      },
      keyboardType: "numeric",
    },
    {
      title: "IGV (%)",
      value: data.igv,
      onChangeText: (value: string) => {
        setData({ ...data, igv: value });
        setFormInteraction({
          isSubmitted: false,
          isTouched: true,
        });
      },
      options: igvOptions,
    },
  ];

  const handleSubmit = async () => {
    setFormInteraction({
      isSubmitted: true,
      isTouched: false,
    });

    if (data.toggle) {
      Alert.alert("Error", "Ya existe un producto registrado.");
      return;
    }
    const hasErrors =
      errors && typeof errors === "object" && Object.keys(errors).length > 0;

    setStepOption({ ...stepOption, isStepValid: hasErrors });

    if (hasErrors) {
      return;
    }

    setProducto({
      name: data.producto,
      description: data.descripcion,
      margenUtilidad: data.margenUtilidad,
      igv: data.igv,
    });

    const savedData = await AsyncStorage.getItem("ProductConfig");
    if (savedData) {
      if (validateDataChange(JSON.parse(savedData))) {
        await AsyncStorage.removeItem("ProductConfig");
        const dataToSave = {
          igv: data.igv,
          margenUtilidad: data.margenUtilidad,
        };
        await AsyncStorage.setItem("ProductConfig", JSON.stringify(dataToSave));
      }
    }
    setFormInteraction({
      isSubmitted: false,
      isTouched: false,
    });

    setData({
      producto: "",
      descripcion: "",
      margenUtilidad: "20",
      igv: "0.18",
      toggle: true,
    });
  };

  const validateDataChange = (parsedData: {
    igv: string;
    margenUtilidad: string;
  }) =>
    parsedData.igv !== data.igv ||
    parsedData.margenUtilidad !== data.margenUtilidad;

  useEffect(() => {
    const loadProductConfig = async () => {
      try {
        const savedData = await AsyncStorage.getItem("ProductConfig");
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          if (validateDataChange(parsedData)) {
            setData({
              ...data,
              igv: parsedData.igv,
              margenUtilidad: parsedData.margenUtilidad,
            });
          }
        }
      } catch (error) {
        console.error("Error al cargar el IGV seleccionado:", error);
      }
    };

    loadProductConfig();
  }, [data.toggle]);

  useEffect(() => {
    setStepOption({ ...stepOption, isStepValid: true });
  }, []);

  return (
    <View style={styles.container}>
      <FormularioGenerico
        title="PRODUCTO"
        campos={campos}
        onSubmit={handleSubmit}
        errors={errors}
      />
      {data.toggle && (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Producto:</Text>

          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              Nombre: {productData.Producto.name}
            </Text>
            <Text style={styles.itemDescription}>
              Descripcion: {productData.Producto.description}
            </Text>
            <Text style={styles.itemDescription}>
              Margen de Utilidad: {productData.Producto.margenUtilidad}%
            </Text>
            <Text style={styles.itemDescription}>
              IGV: {parseFloat(productData.Producto.igv) * 100}%
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  listContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
  itemDescription: {
    fontSize: 14,
    color: "gray",
    fontWeight: "500",
  },
});
