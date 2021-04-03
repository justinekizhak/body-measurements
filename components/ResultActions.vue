<template>
  <div class="flex gap-4">
    <base-button color="blue" @click="share">Share</base-button>
    <base-button color="green" @click="download">Download</base-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    share() {
      this.$fireModule.analytics().logEvent('share')
    },
    download() {
      this.$fireModule.analytics().logEvent('download')
    },
  },
})
</script>
