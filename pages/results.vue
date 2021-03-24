<template>
  <div>
    <div class="text-2xl">Results</div>
    <div class="m-8 border-t border-b border-gray-500 divide-y divide-gray-500">
      <div v-for="i in dataKeys" :key="i" class="flex py-4 hover:bg-gray-700">
        <div class="w-1/2">
          {{ i }}
        </div>
        <div>
          {{ currentMeasurements[i] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { get, isEmpty } from 'lodash'

// const defaultData = {
//   'Distance unit': 'cm',
//   'Weight unit': 'kg',
//   Height: '0',
//   Wrist: '12',
//   Ankle: '12',
//   Weight: '12',
//   Chest: '12',
//   Neck: '22',
//   Biceps: '12',
//   Forearm: '12',
//   Hips: '12',
//   Waist: '12',
//   Thigh: '12',
//   Calf: '12',
// }

const dataKeys = [
  'Height',
  'Weight',
  'Wrist',
  'Ankle',
  'Chest',
  'Neck',
  'Biceps',
  'Forearm',
  'Hips',
  'Waist',
  'Thigh',
  'Calf',
]

export default Vue.extend({
  data() {
    return {
      dataKeys,
    }
  },
  computed: {
    currentMeasurements() {
      return get(this, '$store.state.currentMeasurements.data', {})
    },
  },
  mounted() {
    if (isEmpty(this.currentMeasurements)) {
      this.$router.push('/')
    }
  },
})
</script>
