import { Switch, Match } from "solid-js";
import MainForm from "~/components/MainForm";
import { useGlobalStore } from "~/store";
import ShowResults from "../ShowResults";
import { get } from "lodash-es";

export default () => {
  const [globalStore] = useGlobalStore();
  const showResults = () => get(globalStore, "showResults", false);
  return (
    <div>
      <Switch>
        <Match when={!showResults()}>
          <MainForm />
        </Match>
        <Match when={showResults()}>
          <ShowResults />
        </Match>
      </Switch>
    </div>
  );
};
