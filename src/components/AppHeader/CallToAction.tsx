export default () => {
  return (
    <div class="flex justify-between p-4 pt-0 lg:p-0">
      <button
        type="button"
        class="border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium inline-flex items-center mr-4 px-4 py-2 relative rounded-md shadow-sm text-sm"
      >
        <span>Sign In</span>
      </button>
      <button
        type="button"
        class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span>Create a free account</span>
      </button>
    </div>
  );
};
