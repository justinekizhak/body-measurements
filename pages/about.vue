<template>
  <div class="flex flex-col flex-grow">
    <div class="pt-8 lg:pt-16">
      <div class="grid grid-cols-2 mb-4">
        <div class="flex items-center font-bold">Version</div>
        <div>{{ version }}</div>
      </div>
      <div class="grid grid-cols-2 mb-4">
        <div class="flex items-center pb-4 font-bold">Created by</div>
        <a class="" target="_blank" href="https://justine.kizhak.com">
          <img class="max-h-16" src="justinev2.png" />
        </a>
      </div>
      <div class="flex flex-col items-center mt-16">
        <img class="w-52 lg:w-1/3" src="social.png" />
        <div class="text-xs italic text-center">
          Body Measurements <br />
          by Justine Kizhakkinedath
        </div>
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
