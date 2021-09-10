import { createSignal } from "solid-js";
import { ToggleProps } from "~/interfaces/input-elements";

export default (props: ToggleProps) => {
  const [enabled, setEnabled] = createSignal(props.default);

  const handleClick = () => {
    const newValue = !enabled();
    props.onChange({ key: props.name, value: newValue });
    setEnabled(newValue);
  };

  return (
    <div class="flex items-center justify-between">
      <span class="flex-grow flex flex-col">
        <span class="text-sm font-medium text-gray-900" id="availability-label">
          {props.label}
        </span>
        <span class="text-sm text-gray-500" id="availability-description">
          {props.hint}
        </span>
      </span>
      <button
        type="button"
        class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        role="switch"
        aria-checked="false"
        aria-labelledby="availability-label"
        aria-describedby="availability-description"
        onClick={handleClick}
        classList={{
          [enabled() ? "bg-indigo-600" : "bg-gray-200"]: true,
        }}
      >
        <span
          aria-hidden="true"
          class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          classList={{
            [enabled() ? "translate-x-5" : "translate-x-0"]: true,
          }}
        ></span>
      </button>
    </div>
  );
};
