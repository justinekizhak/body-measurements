import { JSXElement } from "solid-js";

export interface Button {
  type?: "button" | "submit" | "reset";
  label?: string;
  name?: string;
  children?: JSXElement;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick?: ({ name: string }) => null | void;
}