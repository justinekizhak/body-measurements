import { createContext, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { set } from "lodash-es";
import {
  StoreProvider,
  StoreHandlerUpdateState,
  StoreHandler,
} from "~/interfaces/store";

const commonContext = createContext();

export function providerFactory(
  stateStructure: object = {},
  StoreContext = commonContext
) {
  const Provider: StoreProvider = (props) => {
    const [globalState, setGlobalState] = createStore({
      state: props.initialData || stateStructure,
    });

    const updateState: StoreHandlerUpdateState = (path, value) => {
      setGlobalState(
        "state",
        produce((data: object) => {
          set(data, path, value);
        })
      );
    };

    const store = [
      globalState.state,
      {
        updateState,
      },
    ];
    return (
      <StoreContext.Provider value={store}>
        {props.children}
      </StoreContext.Provider>
    );
  };

  const handler = (() => {
    return useContext(StoreContext);
  }) as StoreHandler;

  return { Provider, handler };
}
