import { DistanceUnit } from "~/interfaces/conversion";
import { round } from "lodash-es";

/**
 * Using Millimeter as the base unit
 */
const conversionFactorTable = {
  mm: 1,
  cm: 10,
  m: 1000,
  inch: 25.4,
  feet: 304.8,
};

export const convertDistance = (
  value: number,
  oldUnit: DistanceUnit,
  newUnit: DistanceUnit
) => {
  const conversionFactor =
    conversionFactorTable[oldUnit] / conversionFactorTable[newUnit];
  const output = round(value * conversionFactor, 2);
  return output;
};
