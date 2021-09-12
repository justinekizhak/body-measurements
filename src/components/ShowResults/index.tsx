import Button from "~/components/library/Button";
import { useGlobalStore } from "~/store";

export default () => {
  const [globalStore, { updateState }] = useGlobalStore();

  const handleReset = () => {
    if (updateState) {
      updateState("formData", {});
      updateState("showResults", false);
      updateState("results", {});
    }
  };
  return (
    <div class="max-w-7xl mx-8 lg:mx-auto lg:px-8">
      <h1 class="mt-8 text-lg">Results</h1>
      <div class=" bg-gray-300 p-4">
        <code class="break-all">{JSON.stringify(globalStore["results"])}</code>
      </div>
      <Button onClick={handleReset} class="mt-8">
        Reset
      </Button>
    </div>
  );
};
