<template>
  <div class="w-full lg:w-auto">
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
      <transition name="fade">
        <div v-if="menuOpen">
          <div class="fixed inset-0 bg-gray-800 opacity-90"></div>
          <div class="fixed inset-0 pt-6" style="padding-right: 34px">
            <AppHeaderMenuButtons
              v-click-outside="toggleMenu"
              class="flex flex-col items-end gap-4"
              @close="toggleMenu"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ClickOutside from 'vue-click-outside'

export default Vue.extend({
  directives: {
    ClickOutside,
  },
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
