<template>
  <div>
    <AppHeaderMenuButtons
      class="items-center justify-between hidden gap-4 lg:flex lg:justify-end"
    />
    <div class="flex justify-end lg:hidden">
      <base-button class="flex items-center gap-2" @click="toggleMenu">
        <span> Menu </span>
        <span class="flex flex-col justify-between h-3">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </span>
      </base-button>
      <div v-if="menuOpen">
        <div class="fixed inset-0 bg-gray-800 opacity-90"></div>
        <div class="fixed inset-0 p-8">
          <AppHeaderMenuButtons
            class="flex flex-col items-end gap-4"
            @close="toggleMenu"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      menuOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
  },
})
</script>

<style scoped>
.bar {
  height: 2px;
  @apply w-4 bg-black;
}
</style>
