import { createSignal } from "solid-js";
import { get } from "lodash-es";
import { InputProps } from "~/interfaces/input-elements";
import LengthDropdown from "./LengthDropdown";
import { UnitDropdownHandler } from "~/interfaces/select/custom-select";
import { convertDistance } from "./conversion";

export default (props: InputProps) => {
  const [displayValue, setDisplayValue] = createSignal("");

  const handleChange = (event) => {
    const value = get(event, "target.value", "");
    setDisplayValue(value);
    props.onChange && props.onChange({ key: props.name, value });
  };

  // Removing off non-input element props
  const { label, hint, category, defaultUnit, ...inputProps } = props;

  const handleUnitConversion = (event: UnitDropdownHandler) => {
    const value = parseFloat(displayValue());
    const newValue = convertDistance(value, event.oldUnit, event.newUnit) + "";
    setDisplayValue(newValue);
    props.onChange && props.onChange({ key: props.name, value: newValue });
  };

  const categoryMap = {
    length: () => <LengthDropdown onChange={handleUnitConversion} />,
  };

  return (
    <div>
      <label
        for="email"
        class="font-medium text-sm text-gray-700 dark:text-white block "
      >
        {props.label || props.name}
      </label>
      <div class="mt-1 relative">
        <input
          class="rounded-md border-gray-300 shadow-sm w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500"
          aria-describedby={props.name + "-description"}
          {...inputProps}
          value={displayValue()}
          onChange={handleChange}
        />
        {get(categoryMap, category, () => null)()}
      </div>
      <p class="mt-2 text-sm text-gray-500">{props.hint || ""}</p>
    </div>
  );
};
