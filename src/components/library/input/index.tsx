import { InputProps } from "~/interfaces/form-elements";

export default (props: InputProps) => {
  return (
    <div>
      <label
        for="email"
        class="font-medium text-sm text-gray-700 block capitalize"
      >
        {props.name}
      </label>
      <div class="mt-1">
        <input
          type={props.type}
          name={props.name}
          class="rounded-md border-gray-300 shadow-sm w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder={props.placeholder}
          aria-describedby={props.name + "-description"}
        />
      </div>
      <p class="mt-2 text-sm text-gray-500">{props.hint || ""}</p>
    </div>
  );
};
