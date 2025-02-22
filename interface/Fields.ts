export interface FieldsI {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}
