export interface OptionsI {
  id: string;
  label: string;
  value: number;
}

export interface FieldsI {
  title: string;
  label?: string;
  value: string;
  onChangeText?: (value: string) => void;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  disabled?: boolean;
  options?: Array<OptionsI>;
}
