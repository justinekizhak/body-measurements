import { round } from "lodash-es";
import {
  Formulas,
  Sex,
  FormData,
  CalculateInput,
} from "~/interfaces/core/calculations";

const GOLDEN_RATIO = 1.618;

export function formulas(sex: Sex = "Male"): Formulas {
  const isFemale = sex !== "Male";
  return {
    chest(data) {
      return data?.wrist * 6.5;
    },
    neck(data) {
      return data?.chest * 0.37;
    },
    biceps(data) {
      return data?.chest * 0.36;
    },
    forearm(data) {
      return data?.chest * 0.29;
    },
    hips(data) {
      if (isFemale) {
        return data?.waist * 1.42;
      }
      return data?.chest * 0.85;
    },
    waist(data) {
      if (isFemale) {
        return data?.height * 0.382;
      }
      return data?.chest * 0.7;
    },
    thigh(data) {
      return data?.chest * 0.53;
    },
    calf(data) {
      return data?.chest * 0.34;
    },
    shoulders(data) {
      if (isFemale) {
        return data?.waist * GOLDEN_RATIO;
      }
      return data?.waist * GOLDEN_RATIO;
    },
  };
}

export const calculateIdealMeasurement = (rawData: CalculateInput) => {
  const dataKeys = [
    "chest",
    "waist",
    "shoulders",
    // 'Neck',
    "biceps",
    "forearm",
    "hips",
    "thigh",
    "calf",
  ];
  console.log("raw data: ", rawData);
  const output: FormData = { ...rawData };
  const formulaSlice = formulas(rawData.sex);
  for (const bodyPart of dataKeys) {
    const formulaForBodyPart = formulaSlice[bodyPart];
    const value = round(parseFloat(formulaForBodyPart(output) + ""), 2);
    if (value) {
      output[bodyPart] = value;
    }
  }
  return output;
};
