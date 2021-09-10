export interface RadioProps {
  name: string;
  options?: string[];
  onClick?: (value: string) => null;
  default?: string;
}

export interface InputProps {
  name: string;
  placeholder?: string;
  type: "text" | "number";
  hint?: string;
}

export type FormInput = InputProps | RadioProps;

export interface FormElementRadio {
  type: "radio";
  props: RadioProps;
}

export interface FormElementNumber {
  category: "length" | "weight";
  props: InputProps;
}

export type FormElement = FormElementNumber | FormElementRadio;
