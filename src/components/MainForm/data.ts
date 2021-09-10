import { FormElement } from "~/interfaces/form-elements";

export const mainFormInputs: FormElement[] = [
  {
    type: "radio",
    props: {
      name: "sex",
      label: "Sex",
      options: ["Male", "Female"],
      default: "Male",
    },
  },
  {
    props: {
      name: "height",
      type: "number",
      label: "Height",
      min: "0",
      category: "length",
    },
  },
  {
    type: "toggle",
    props: {
      name: "roughEstimate",
      default: false,
      label: "I  know my wrist circumference",
      hint: "Wrist circumference will give you better results",
    },
  },
  {
    if: (store) => store["roughEstimate"],
    props: {
      name: "wrist",
      type: "number",
      label: "Wrist",
      category: "length",
    },
  },
];
