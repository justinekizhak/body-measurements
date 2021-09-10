export type Sex = "Male" | "Female";

export interface Formulas {
  [key: string]: (data: FormData) => number;
}

export interface CalculateInput {
  sex: Sex;
  height: number;
  wrist?: number;
  preciseEstimate: boolean;
}

export interface FormData {
  sex: Sex;
  height: number;
  wrist?: number;
  waist?: number;
  shoulders?: number;
  hips?: number;
  biceps?: number;
  forearm?: number;
  thigh?: number;
  calf?: number;
  chest?: number;
}

export interface CalculatedData {
  [key: string]: number;
}
