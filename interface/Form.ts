import { FieldsI } from "./Fields";
import { ValidationErrorsI } from "./Validation";

export interface FormI {
  id: string;
  [key: string]: string;
}

export interface FormularioGenericoPropsI {
  title: string;
  campos: FieldsI[];
  onSubmit: () => void;
  errors?: ValidationErrorsI;
  submitButton?: true;
}

export interface FormDataContactI {
  [x: string]: string;
}
