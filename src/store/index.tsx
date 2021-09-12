import { providerFactory } from "./provider";

const storeStructure = {
  formData: {},
  results: {},
  userData: {},
};

export const { Provider: GlobalStoreProvider, handler: useGlobalStore } =
  providerFactory(storeStructure);
