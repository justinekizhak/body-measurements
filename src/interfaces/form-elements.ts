import { InputProps, RadioProps, ToggleProps } from "./input-elements";

export interface CommonFormElements {
  if?: (data: any) => boolean;
}

export interface FormElementRadio extends CommonFormElements {
  type: "radio";
  props: RadioProps;
}

export interface FormElementNumber extends CommonFormElements {
  props: InputProps;
}

export interface FormElementToggle extends CommonFormElements {
  type: "toggle";
  props: ToggleProps;
}

export type FormElement =
  | FormElementNumber
  | FormElementRadio
  | FormElementToggle;
