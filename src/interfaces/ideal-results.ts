import { FormData } from "~/interfaces/core/calculations";

export interface IdealMResultProps {
  ideal: FormData;
  handleReset: (showResult: boolean) => void;
}
