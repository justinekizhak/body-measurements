<template>
  <div
    class="fixed top-0 left-0 z-10 flex items-center justify-between w-full gap-4 px-8 py-4 bg-gray-800 lg:py-8 ribbon"
  >
    <div
      class="text-3xl font-bold tracking-widest uppercase break-all cursor-pointer font-anurati"
      @click="$router.push('/')"
    >
      <span class="lg:hidden">BM</span>
      <span class="hidden lg:inline">Body Measurements</span>
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
