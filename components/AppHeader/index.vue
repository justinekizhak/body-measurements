<template>
  <div
    class="z-10 flex flex-col items-center justify-between gap-4 lg:gap-0 lg:flex-row ribbon"
  >
    <div
      class="text-3xl font-bold tracking-widest uppercase break-words cursor-pointer lg:text-5xl font-anurati"
      @click="$router.push('/')"
    >
      Body Measurements
    </div>
    <AppHeaderMenu />
  </div>
</template>

<style scoped>
.ribbon::after {
  content: 'alpha';
  width: 80px;
  height: 25px;
  top: 7px;
  right: -20px;
  @apply bg-red-700 fixed  font-display uppercase font-bold transform-gpu rotate-45 text-xs leading-none flex justify-center items-center;
}
@font-face {
  font-family: anurati;
  src: url('/fonts/Anurati-Regular.otf');
}

.font-anurati {
  font-family: anurati, sans-serif;
}
</style>
