import { Button } from "~/interfaces/button";

export default (props: Button) => {
  const handleClick = () => {
    props.onClick && props.onClick({ name: props.name });
  };
  const buttonSizes = {
    xs: "px-2.5 py-1.5 text-xs",
    sm: "px-3 py-2 text-sm leading-4",
    md: "px-4 py-2 text-sm",
    lg: "px-4 py-2 text-base",
    xl: "px-6 py-3 text-base",
  };
  return (
    <button
      type={props.type}
      class="inline-flex items-center  border border-transparent  font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      className={buttonSizes[props.size || "md"] + " " + props.class}
      onClick={handleClick}
    >
      {props.children || props.label}
    </button>
  );
};
