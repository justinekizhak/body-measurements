import { createSignal } from "solid-js";
import { LengthDropdown } from "~/interfaces/select/custom-select";
import { get } from "lodash-es";
import { DistanceUnit } from "~/interfaces/conversion";

export default (props: LengthDropdown) => {
  const [currentUnit, setCurrentUnit] = createSignal("cm");
  const handleChange = (event) => {
    const oldUnit = currentUnit() as DistanceUnit;
    const newUnit = get(event, "target.value") as DistanceUnit;
    props.onChange && props.onChange({ oldUnit, newUnit });
    setCurrentUnit(newUnit);
  };
  return (
    <div class="absolute inset-y-0 right-0 flex items-center">
      <label for="distance" class="sr-only">
        Distance
      </label>
      <select
        name="distance"
        class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
        onChange={handleChange}
      >
        <option>cm</option>
        <option>m</option>
        <option>inch</option>
        <option>feet</option>
      </select>
    </div>
  );
};
