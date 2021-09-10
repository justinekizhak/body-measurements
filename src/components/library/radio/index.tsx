import { For, createSignal } from "solid-js";
import { RadioProps } from "~/interfaces/form-elements";
import { get } from "lodash-es";

export default (props: RadioProps) => {
  const [selected, setSelected] = createSignal(props.default || "");

  const handleClick = (event) => {
    const value: string = get(event, "target.value", "");
    console.log(value);
    setSelected(value);
    props.onClick && props.onClick(value);
  };
  return (
    <fieldset>
      <legend class="font-medium text-sm text-gray-700 dark:text-white block capitalize">
        {props.name || ""}
      </legend>
      <div class="relative bg-white rounded-md -space-y-px">
        <For each={props.options || []}>
          {(option, index) => (
            <label
              class="relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none"
              classList={{
                "rounded-t-md": index() === 0,
                "rounded-b-md": index() === props.options.length - 1,
                [option === selected()
                  ? "bg-indigo-50 border-indigo-200 z-10"
                  : "border-gray-200"]: true,
              }}
            >
              <div class="flex items-center text-sm">
                <input
                  type="radio"
                  name={props.name}
                  value={option}
                  checked={option === selected()}
                  class="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  aria-labelledby={props.name + "-label"}
                  aria-describedby={props.name + "-description-" + option}
                  onClick={handleClick}
                />

                <span
                  id="pricing-plans-0-label"
                  class="ml-3 font-medium"
                  classList={{
                    [option === selected()
                      ? "text-indigo-900"
                      : "text-gray-900"]: true,
                  }}
                >
                  {option}
                </span>
              </div>
            </label>
          )}
        </For>
      </div>
    </fieldset>
  );
};
