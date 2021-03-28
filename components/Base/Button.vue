<template>
  <button
    class="px-4 py-2 text-black transition duration-300 ease-in-out bg-white border-2 border-gray-800 rounded-lg hover:border-gray-500"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>
