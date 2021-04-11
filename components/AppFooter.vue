<template>
  <div
    class="flex justify-center pt-4 text-sm text-center text-gray-300 border-t font-display lg:text-left"
  >
    <div class="flex justify-between w-full lg:flex-row">
      <div class="w-1/2 lg:w-auto">
        <span class="inline-block font-display"> Copyright © 2021 </span>
        <span>Justine Kizhakkinedath </span>
      </div>
      <div class="grid grid-cols-1 gap-4 my-4 lg:my-0 lg:grid-cols-3">
        <nuxt-link to="/privacy">Privacy Policy</nuxt-link>
        <nuxt-link to="/disclaimer">Disclaimer</nuxt-link>
        <nuxt-link to="/terms-of-service">Terms of Service</nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  @apply border-gray-300 hover:border-b  hover:text-gray-400 hover:border-gray-400 transition duration-500 ease-in-out inline-block;
}
</style>
