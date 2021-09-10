import { get } from "lodash-es";
import { InputProps } from "~/interfaces/input-elements";

export default (props: InputProps) => {
  const handleChange = (event) => {
    const value = get(event, "target.value", "");
    props.onChange && props.onChange({ key: props.name, value });
  };
  return (
    <div>
      <label
        for="email"
        class="font-medium text-sm text-gray-700 dark:text-white block "
      >
        {props.label || props.name}
      </label>
      <div class="mt-1">
        <input
          type={props.type}
          name={props.name}
          class="rounded-md border-gray-300 shadow-sm w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder={props.placeholder}
          aria-describedby={props.name + "-description"}
          onChange={handleChange}
        />
      </div>
      <p class="mt-2 text-sm text-gray-500">{props.hint || ""}</p>
    </div>
  );
};
