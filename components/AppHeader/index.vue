<template>
  <div class="z-10 flex flex-col justify-between gap-4 lg:gap-0 lg:flex-row">
    <div
      class="text-3xl font-bold break-words lg:text-5xl"
      @click="$router.push('/')"
    >
      Body Measurements
    </div>
    <AppHeaderMenu />
  </div>
</template>
