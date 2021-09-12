import { providerFactory } from "./provider";

// Store structure
const storeStructure = {
  formData: {},
  results: {},
  userData: {},
  showResults: false,
};

export const { Provider: GlobalStoreProvider, handler: useGlobalStore } =
  providerFactory(storeStructure);
