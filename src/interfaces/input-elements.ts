export interface FormInputChangeProps {
  key: string;
  value: string | boolean | number;
}

export type FormChangeHandler = (value: FormInputChangeProps) => null | void;

export interface RadioProps {
  name: string;
  options?: string[];
  onChange?: FormChangeHandler;
  default?: string;
  label?: string;
  hint?: string;
}

export interface InputProps {
  name: string;
  placeholder?: string;
  type: "text" | "number";
  label?: string;
  hint?: string;
  onChange?: FormChangeHandler;
}

export interface ToggleProps {
  name: string;
  label?: string;
  hint?: string;
  default?: boolean;
  onChange?: FormChangeHandler;
}

export type FormInput = InputProps | RadioProps | ToggleProps;
