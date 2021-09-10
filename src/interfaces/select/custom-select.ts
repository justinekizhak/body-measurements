import { DistanceUnit } from "../conversion";

export interface UnitDropdownHandler {
  oldUnit: DistanceUnit;
  newUnit: DistanceUnit;
}

export interface LengthDropdown {
  onChange: (event: UnitDropdownHandler) => void;
  default?: DistanceUnit;
}
