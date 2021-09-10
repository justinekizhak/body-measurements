import { For, onMount, Show } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Input from "~/components/library/input";
import Radio from "~/components/library/radio";
import Toggle from "~/components/library/Toggle";
import Button from "~/components/library/Button";
import { get, isNil } from "lodash-es";
import { FormElement } from "~/interfaces/form-elements";
import {
  InputProps,
  RadioProps,
  ToggleProps,
} from "~/interfaces/input-elements";
import { mainFormInputs } from "./data";

export default () => {
  const [store, setStore] = createStore({
    formData: {},
  });

  const setValue = (key: string, value: string) => {
    setStore(
      "formData",
      produce((formData) => {
        formData[key] = value;
      })
    );
  };

  onMount(() => {
    for (const element of mainFormInputs) {
      const defaultValue = get(element, "props.default");
      if (!isNil(defaultValue)) {
        const key = element.props.name;
        setValue(key, defaultValue);
      }
    }
  });

  const handleFormInput = ({ key, value }) => {
    setValue(key, value);
  };

  const inputMap = {
    radio: (props: RadioProps) => (
      <Radio {...props} onChange={handleFormInput} />
    ),
    number: (props: InputProps) => (
      <Input {...props} onChange={handleFormInput} />
    ),
    toggle: (props: ToggleProps) => (
      <Toggle {...props} onChange={handleFormInput} />
    ),
  };

  const showElement = (inputElement: FormElement) => {
    if (!inputElement.if) {
      return true;
    }
    const value = inputElement.if(store.formData);
    return value;
  };

  const getInputEl = (input: FormElement) => {
    const inputType = get(input, "type", "number");
    const accessor = get(inputMap, inputType, () => null);
    return accessor(input.props);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data: ", store.formData);
  };
  return (
    <div class="m-8 lg:mx-auto lg:w-[640px]">
      <form onSubmit={handleSubmit}>
        <For each={mainFormInputs}>
          {(inputEl) => (
            <Show when={showElement(inputEl)}>
              <div class="my-8">{getInputEl(inputEl)}</div>
            </Show>
          )}
        </For>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
