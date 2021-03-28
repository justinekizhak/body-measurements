<template>
  <div
    class="relative flex flex-col h-screen p-8 text-white bg-gray-800 font-display"
  >
    <AppHeader />
    <div class="absolute inset-x-8 bottom-24 top-24">
      <Nuxt />
    </div>
    <div class="absolute bottom-0 mb-8">
      <AppFooter />
    </div>
  </div>
</template>
