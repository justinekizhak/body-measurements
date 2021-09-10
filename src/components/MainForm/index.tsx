import Input from "~/components/library/input";
import Radio from "~/components/library/radio";
import { For } from "solid-js";
import { get } from "lodash-es";
import {
  FormElement,
  InputProps,
  RadioProps,
} from "~/interfaces/form-elements";

export default () => {
  const inputs: FormElement[] = [
    {
      type: "radio",
      props: { name: "sex", options: ["Male", "Female"], default: "Male" },
    },
    { category: "length", props: { name: "height", type: "number" } },
  ];
  const inputMap = {
    radio: (props: RadioProps) => <Radio {...props} />,
    number: (props: InputProps) => <Input {...props} />,
  };
  const getInputEl = (input: FormElement) => {
    const inputType = get(input, "type", "number");
    const accessor = get(inputMap, inputType, () => null);
    return accessor(input.props);
  };
  return (
    <div class="m-8 lg:mx-auto lg:w-[640px]">
      <For each={inputs}>
        {(input) => <div class="my-8">{getInputEl(input)}</div>}
      </For>
    </div>
  );
};
