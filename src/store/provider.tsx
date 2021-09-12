import { createContext, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { set } from "lodash-es";
import {
  StoreProvider,
  StoreHandlerUpdateState,
  StoreHandler,
} from "~/interfaces/store";

const commonContext = createContext();

/**
 * providerFactory will help is scaffolding various Store context easily.
 * @param stateStructure Optional. This will help document what the actual
 * shape of the store will look like. Passing this argument just affects the
 * initial data. The execution flow will not be affected.
 * @param StoreContext Optional. We can pass in custom context and use the
 * factory to scaffold the store
 * @returns The store provider and its handler. Use the provider as a normal
 * context provider.
 * And use the handler as your normal useContext handler
 */
export function providerFactory(
  stateStructure: object = {},
  StoreContext = commonContext
) {
  /**
   *
   * @param props Optional. Pass in the `initialData` if you don't like the initial
   * data set by the factory. This is useful if you are using the same context but
   * different isolated providers. The `initialData` will override it.
   * @returns The JSX context provider
   */
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

  /**
   * This handler is use to get the store and its actions. By default it comes with
   * `updateState` function which you can use to directly set the value of a path.
   * The path itself can be deep nested and event supports array index.
   */
  const handler = (() => {
    return useContext(StoreContext);
  }) as StoreHandler;

  return { Provider, handler };
}
