<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <transition name="modal">
    <div
      v-if="open"
      class="fixed inset-0 z-20 overflow-y-auto font-display"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-center justify-center min-h-screen text-center sm:block"
      >
        <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
          @click="toggle"
        ></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
        <div
          name="modal-content"
          class="z-30 inline-block w-full mx-8 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg"
        >
          <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="w-full text-center sm:mt-0 sm:text-left">
                <h3
                  v-if="title"
                  id="modal-title"
                  class="mb-2 text-lg leading-6 text-gray-900"
                >
                  {{ title }}
                </h3>
                <div name="body">
                  <slot>
                    <div class="text-black">Test</div>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { string, bool } from 'vue-types'

export default Vue.extend({
  props: {
    title: string(),
    open: bool().def(false),
  },
  methods: {
    toggle() {
      this.$emit('toggle-modal')
    },
  },
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  /* transition: opacity 0.5s; */
  @apply transform-gpu transition duration-500 overflow-hidden;
}
.modal-enter {
  @apply opacity-0;
}
.modal-leave-active {
  opacity: 0;
}
</style>
