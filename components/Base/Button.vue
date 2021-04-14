<template>
  <button
    class="px-4 py-2 transition duration-300 ease-in-out rounded-lg focus:outline-none focus:ring ring-offset-2 ring-gray-700"
    :class="buttonSyle"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { oneOf, bool } from 'vue-types'

export default Vue.extend({
  props: {
    color: oneOf(['blue', 'orange', 'white', 'green', 'red']).def('white'),
    noBorder: bool().def(false),
  },
  computed: {
    buttonSyle() {
      return {
        'border-2 border-gray-800  hover:border-gray-500': !this.noBorder,
        'text-white ': this.color !== 'white',
        'bg-white hover:bg-gray-200 text-black': this.color === 'white',
        'bg-blue-700 hover:bg-blue-800': this.color === 'blue',
        'bg-orange-700': this.color === 'orange',
        'bg-red-600 hover:bg-red-700': this.color === 'red',
        'bg-green-700 hover:bg-green-800': this.color === 'green',
      }
    },
  },
})
</script>
