import { IdealMResultProps } from "~/interfaces/ideal-results";
import Button from "../library/Button";

export default (props: IdealMResultProps) => {
  const handleReset = () => {
    props.handleReset && props.handleReset(false);
  };
  return (
    <div class="max-w-7xl mx-8 lg:mx-auto lg:px-8">
      <h1 class="mt-8 text-lg">Results</h1>
      <div class=" bg-gray-300 p-4">
        <code class="break-all">{JSON.stringify(props.ideal)}</code>
      </div>
      <Button onClick={handleReset} class="mt-8">
        Reset
      </Button>
    </div>
  );
};
