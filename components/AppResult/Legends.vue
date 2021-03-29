<template>
  <div>
    <div class="mt-8 mb-8">
      <div class="mb-4 text-lg font-bold">Legends</div>
      <div class="flex flex-col gap-4 text-gray-300 lg:ml-8">
        <div class="text-blue-400">
          <div class="inline-block w-2 h-2 mr-2 bg-blue-400 rounded-full"></div>
          Blue: Current measurement is within margin
        </div>
        <div class="text-red-500">
          <div class="inline-block w-2 h-2 mr-2 bg-red-500 rounded-full"></div>
          Red: Current measurement is not within margin
        </div>
        <div>
          <span class="mr-2 font-bold text-white">-</span> Negative means you
          need to decrease to achive ideal
        </div>
        <div>
          <span class="mr-2 font-bold text-white">+</span> Positive means you
          need to increase to achive ideal
        </div>
      </div>
    </div>
    <div class="mb-8">
      <a
        href="https://blog.iafstore.com/en/calculate-the-ideal-body-measurements-a238"
        class="text-gray-300 border-b border-gray-300 hover:text-white hover:border-white"
        >Source</a
      >
    </div>
  </div>
</template>
