import { FormularioGenerico } from "@/components/FormularioGenerico";
import { validationsRuleSupport } from "@/helpers/validationrule";
import { useFormValidation } from "@/hooks/useFormValidation";
import { FieldsI } from "@/interface/Fields";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const [data, setData] = useState({
    email: "",
    asunto: "",
    mensaje: "",
  });

  const { errors, setFormInteraction } = useFormValidation(
    data,
    validationsRuleSupport
  );

  const campos: Array<FieldsI> = [
    {
      title: "E-mail",
      label: "email",
      value: data.email,
      onChangeText: (value: string) => {
        setData({ ...data, email: value });
        setFormInteraction({
          isSubmitted: false,
          isTouched: true,
        });
      },
    },
    {
      title: "Asunto del mensaje",
      label: "asunto",
      value: data.asunto,
      onChangeText: (value: string) => {
        setData({ ...data, asunto: value });
        setFormInteraction({
          isSubmitted: false,
          isTouched: true,
        });
      },
    },
    {
      title: "Mensaje",
      label: "mensaje",
      value: data.mensaje,
      onChangeText: (value: string) => {
        setData({ ...data, mensaje: value });
        setFormInteraction({
          isSubmitted: false,
          isTouched: true,
        });
      },
    },
  ];

  const handleSubmit = async () => {
    setFormInteraction({
      isSubmitted: true,
      isTouched: false,
    });

    const hasErrors =
      errors && typeof errors === "object" && Object.keys(errors).length > 0;

    if (hasErrors) {
      return;
    }

    try {
      const response = await fetch(String(process.env.EXPO_PUBLIC_EMAIL_URL), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_EMAIL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EXPO_PUBLIC_EMAIL_FROM,
          to: process.env.EXPO_PUBLIC_EMAIL_TO,
          subject: data.asunto + "/" + data.email,
          html: data.mensaje,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Correo enviado", "Tu mensaje ha sido enviado con éxito.");
        setData({
          email: "",
          asunto: "",
          mensaje: "",
        });
        setFormInteraction({
          isSubmitted: false,
          isTouched: false,
        });
      } else {
        Alert.alert(
          "Error",
          result?.message || "Hubo un problema al enviar el correo."
        );
      }
      console.log({ response });
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Hubo un problema al enviar el correo.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      setData({
        email: "",
        asunto: "",
        mensaje: "",
      });

      setFormInteraction({
        isSubmitted: false,
        isTouched: false,
      });

      return () => {
        setFormInteraction({
          isSubmitted: false,
          isTouched: false,
        });
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <FormularioGenerico
        title="Pongase en contacto con el equipo"
        campos={campos}
        onSubmit={handleSubmit}
        errors={errors}
        submitButton={true}
      />
      <Text style={styles.textFooter}>Creado con ❤ por O'Brian Code</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  textFooter: {
    textAlign: "center",
  },
});
