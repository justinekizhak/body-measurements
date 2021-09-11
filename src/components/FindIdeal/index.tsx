import { createSignal, Show } from "solid-js";
import { createStore } from "solid-js/store";
import MainForm from "~/components/MainForm";
import { FormData } from "~/interfaces/core/calculations";
import ShowResults from "../ShowResults";

export default () => {
  const [showResults, setShowResults] = createSignal(false);
  const [store, setStore] = createStore({
    ideal: {},
  });

  const handleResults = (show: boolean, data: FormData) => {
    setShowResults(show);
    setStore("ideal", data);
  };

  const handleReset = (show: boolean) => {
    setShowResults(show);
  };
  return (
    <div>
      <Show
        when={showResults()}
        fallback={<MainForm handleResults={handleResults} />}
      >
        <ShowResults
          ideal={store.ideal as FormData}
          handleReset={handleReset}
        />
      </Show>
    </div>
  );
};
