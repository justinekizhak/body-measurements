<template>
  <div class="relative flex flex-col flex-grow">
    <div class="flex flex-col justify-between flex-grow pt-4 lg:pt-18">
      <div>
        <div class="grid grid-cols-2 lg:mb-4">
          <div class="flex items-center font-bold">Version</div>
          <div>{{ version }}</div>
        </div>
        <div class="grid grid-cols-2">
          <div class="flex items-center font-bold">Created by</div>
          <div>
            <a
              class="inline-block italic"
              target="_blank"
              href="https://twitter.com/alka1e"
            >
              Justine Kizhakkinedath
            </a>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center my-12">
        <img class="w-52 lg:w-1/3" src="social.png" />
        <!-- <div class="text-xs italic text-center">Body Measurements</div> -->
      </div>
      <div class="flex flex-col items-center justify-center w-full mb-6">
        <div class="text-xs italic">Body Measurements by</div>
        <img class="h-10 mt-2 lg:h-12" src="justinev2.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { version } from '../project-meta.json'

export default Vue.extend({
  data() {
    return {
      version,
    }
  },
})
</script>
