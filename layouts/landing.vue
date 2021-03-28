<template>
  <div
    class="relative flex flex-col h-screen p-8 text-white bg-gray-800 font-display"
  >
    <AppHeader class="absolute top-0 left-0 z-10 w-full p-8 pb-4 bg-gray-800" />
    <div class="absolute top-0 bottom-0 inset-x-8">
      <Nuxt />
    </div>
    <div class="absolute bottom-0 left-0 w-full p-8 pt-4 bg-gray-800">
      <AppFooter />
    </div>
  </div>
</template>
