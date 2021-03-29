<template>
  <div class="flex items-center justify-between h-10">
    <div class="text-2xl">{{ title }}</div>
    <div v-show="loading" class="flex items-center h-10 gap-2">
      <div>{{ action }}</div>
      <Spinner class="h-10 scale-50 transform-gpu" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { string, bool } from 'vue-types'

export default Vue.extend({
  props: {
    title: string(),
    action: string(),
    loading: bool().def(false),
  },
})
</script>
