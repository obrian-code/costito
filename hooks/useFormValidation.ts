import {
  FormInteractionI,
  ValidationErrorsI,
  ValidationResultI,
  ValidationRulesI,
} from "@/interface/Validation";
import { useState, useEffect, useCallback } from "react";

export function useFormValidation(
  formValues: Record<string, unknown>,
  validations: Record<string, ValidationRulesI>
): ValidationResultI {
  const [errors, setErrors] = useState<ValidationErrorsI>({});
  const [formInteraction, setFormInteraction] = useState<FormInteractionI>({
    isSubmitted: false,
    isTouched: false,
  });

  const validateFields = () => {
    const newErrors: ValidationErrorsI = {};

    for (const key in validations) {
      const value = formValues[key];
      const rules = validations[key];
      const fieldErrors: string[] = [];

      const trimmedValue = typeof value === "string" ? value.trim() : value;

      if (
        rules?.required &&
        (!trimmedValue || (typeof trimmedValue === "string" && !trimmedValue))
      ) {
        fieldErrors.push("Este campo es obligatorio.");
      }

      if (
        rules?.minLength &&
        typeof trimmedValue === "string" &&
        trimmedValue.length < rules.minLength
      ) {
        fieldErrors.push(`Debe tener al menos ${rules.minLength} caracteres.`);
      }

      if (
        rules?.maxLength &&
        typeof trimmedValue === "string" &&
        trimmedValue.length > rules.maxLength
      ) {
        fieldErrors.push(
          `No puede tener más de ${rules.maxLength} caracteres.`
        );
      }

      if (rules?.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
          typeof trimmedValue === "string" &&
          !emailRegex.test(trimmedValue)
        ) {
          fieldErrors.push("Formato de correo electrónico no válido.");
        }
        if (typeof trimmedValue === "string" && /\s/.test(trimmedValue)) {
          fieldErrors.push("El correo electrónico no debe contener espacios.");
        }
      }

      if (rules?.confirmPassword) {
        if (formValues["password"] !== formValues["repassword"]) {
          fieldErrors.push("Las contraseñas no coinciden.");
        }
      }
      if (
        rules?.greaterThanZero &&
        typeof trimmedValue === "number" &&
        trimmedValue <= 0
      ) {
        fieldErrors.push("El valor debe ser mayor a 0.");
      }

      if (fieldErrors.length > 0) {
        newErrors[key] = fieldErrors;
      }
    }

    setErrors(newErrors);
  };

  const validate = useCallback(() => {
    if (formInteraction.isTouched || formInteraction.isSubmitted) {
      validateFields();
    }
  }, [formValues]);

  useEffect(() => {
    validate();
  }, [formValues]);

  return { errors, setFormInteraction, formInteraction };
}
