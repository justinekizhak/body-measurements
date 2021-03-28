<template>
  <button
    class="px-4 py-2 transition duration-300 ease-in-out border-2 border-gray-800 rounded-lg hover:border-gray-500"
    :class="buttonSyle"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { oneOf } from 'vue-types'

export default Vue.extend({
  props: {
    color: oneOf(['blue', 'orange', 'white', 'green']).def('white'),
  },
  computed: {
    buttonSyle() {
      return {
        'bg-white text-black': this.color === 'white',
        'bg-blue-700 text-white': this.color === 'blue',
        'bg-orange-700 text-white': this.color === 'orange',
        'bg-green-700 text-white': this.color === 'green',
      }
    },
  },
})
</script>
