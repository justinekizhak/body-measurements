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
    type: "toggle",
    props: {
      name: "roughEstimate",
      default: true,
      label: "I don't know my wrist circumference",
    },
  },
  {
    category: "length",
    props: { name: "height", type: "number", label: "Height" },
  },
  {
    category: "length",
    if: (store) => !store["roughEstimate"],
    props: { name: "wrist", type: "number", label: "Wrist" },
  },
];
