import { Dispatch, SetStateAction } from "react";

export interface FormInteractionI {
  isSubmitted: boolean;
  isTouched: boolean;
}

export interface ValidationRulesI {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  confirmPassword?: string;
  greaterThanZero?: boolean;
}

export interface ValidationErrorsI {
  [key: string]: string[];
}

export interface ValidationResultI {
  errors: ValidationErrorsI;
  setFormInteraction: Dispatch<SetStateAction<FormInteractionI>>;
  formInteraction?: FormInteractionI;
}
