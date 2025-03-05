import { FormularioGenerico } from "@/components/form/FormularioGenerico";
import { validationsRuleSupport } from "@/helpers/validationrule";
import { useFormValidation } from "@/hooks/useFormValidation";
import { FieldsI } from "@/interface/Fields";
import { FormDataContactI } from "@/interface/Form";
import { ValidationErrorsI, ValidationRulesI } from "@/interface/Validation";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const [data, setData] = useState<FormDataContactI>({
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [validationsRule, setValidationsRule] = useState<
    Record<string, ValidationRulesI>
  >({});

  const { errors, setFormInteraction, formInteraction } = useFormValidation(
    data,
    validationsRule
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
      isTouched: true,
    });

    if (hasValidationErrors(errors)) return;

    if (formInteraction?.isSubmitted) return;

    if (!isFormValid(data)) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await sendEmail(data);
      handleResponse(response);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Hubo un problema al enviar el correo.");
    }
  };

  const isFormValid = (data: FormDataContactI): boolean => {
    return Object.values(data).every((value) => value.trim() !== "");
  };

  const hasValidationErrors = (errors: ValidationErrorsI) => {
    return (
      errors && typeof errors === "object" && Object.keys(errors).length > 0
    );
  };

  const sendEmail = async (data: FormDataContactI) => {
    return fetch(String(process.env.EXPO_PUBLIC_EMAIL_URL), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_EMAIL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EXPO_PUBLIC_EMAIL_FROM,
        to: process.env.EXPO_PUBLIC_EMAIL_TO,
        subject: `${data.asunto} / ${data.email}`,
        html: data.mensaje,
      }),
    });
  };

  const handleResponse = async (response: Response) => {
    const result = await response.json();

    if (response.ok) {
      Alert.alert("Correo enviado", "Tu mensaje ha sido enviado con éxito.");
      resetForm();
    } else {
      Alert.alert(
        "Error",
        result.error instanceof TypeError
          ? "Parece que hay un problema de conexión. Verifica tu internet e inténtalo más tarde."
          : "Hubo un problema al enviar el correo. Inténtalo nuevamente en unos minutos."
      );
    }
  };

  const resetForm = () => {
    setData({ email: "", asunto: "", mensaje: "" });
    setFormInteraction({ isSubmitted: false, isTouched: false });
  };

  useEffect(() => {
    const condition =
      formInteraction?.isTouched || formInteraction?.isSubmitted;
    console.log({ condition });
    if (condition) {
      setValidationsRule(validationsRuleSupport);
    }
  }, [formInteraction]);

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
