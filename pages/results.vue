<template>
  <div>
    <div class="text-2xl">Results</div>
    <div
      class="my-8 overflow-auto border-t border-b border-gray-500 divide-y divide-gray-500"
    >
      <div class="flex py-4 font-bold bg-warmGray-700 hover:bg-gray-700">
        <div class="w-1/3 text-center">Body Part</div>
        <div class="w-1/3 text-center">Ideal Measurement</div>
        <div class="w-1/3 text-center">Change</div>
      </div>
      <div v-for="i in dataKeys" :key="i" class="flex py-4 hover:bg-gray-700">
        <div class="w-1/3 text-center">
          {{ i }}
        </div>
        <div class="w-1/3 text-center">
          {{ getValue(idealMeasurements, i) }}
        </div>
        <div
          class="w-1/3 text-center"
          :class="{
            'text-red-500': getChange(i) > 0,
            'text-blue-400': getChange(i) < 0,
          }"
        >
          {{ getChangeValue(getChange(i)) }}
        </div>
      </div>
    </div>
    <div class="mb-8">
      <div class="mb-4 text-red-500">
        <div class="inline-block w-2 h-2 mr-2 bg-red-500 rounded-full"></div>
        Red: You need to increase your measurements
      </div>
      <div class="text-blue-400">
        <div class="inline-block w-2 h-2 mr-2 bg-blue-400 rounded-full"></div>
        Blue: You need to decrease your measurements
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { get, isEmpty, isNil, isNaN } from 'lodash'

interface FormData {
  'Distance unit': string
  'Weight unit': string
  Height: string
  Wrist: string
  Ankle: string
  Weight: string
  Chest: string
  Neck: string
  Biceps: string
  Forearm: string
  Hips: string
  Waist: string
  Thigh: string
  Calf: string
  Sex: string
  [key: string]: string
}
// const _defaultData = {
//   'Distance unit': 'cm',
//   'Weight unit': 'kg',
//   Height: '172',
//   Wrist: '17',
//   Ankle: '',
//   Weight: '71',
//   Chest: '101',
//   Neck: '38',
//   Biceps: '32',
//   Forearm: '28',
//   Hips: '100',
//   Waist: '84',
//   Thigh: '60',
//   Calf: '38',
//   Sex: 'Male',
// }

const dataKeys = [
  'Waist',
  'Chest',
  'Shoulders',
  'Neck',
  'Biceps',
  'Forearm',
  'Hips',
  'Thigh',
  'Calf',
]

// const urls = [
//   'https://www.ironbuiltfitness.com/the-perfect-male-body',
//   'https://blog.iafstore.com/en/calculate-the-ideal-body-measurements-a238#:~:text=Method%20for%20calculating%20ideal%20body%20measurements&text=chest%20%3D%20wrist%20x%206.5,forearm%20%3D%20chest%20x%200%3A29',
// ]

const GOLDEN_RATIO = 1.618

const formulas: {
  [key: string]: (data: FormData) => number
} = {
  Chest(data) {
    return parseFloat(data.Wrist) * 6.5
  },
  Neck(data) {
    return parseFloat(data?.Chest) * 0.37
  },
  Biceps(data) {
    return parseFloat(data?.Chest) * 0.36
  },
  Forearm(data) {
    return parseFloat(data?.Chest) * 0.29
  },
  Hips(data) {
    return parseFloat(data?.Chest) * 0.85
  },
  Waist(data) {
    return parseFloat(data?.Chest) * 0.7
  },
  Thigh(data) {
    return parseFloat(data?.Chest) * 0.53
  },
  Calf(data) {
    return parseFloat(data?.Chest) * 0.34
  },
  Shoulders(data) {
    return GOLDEN_RATIO * parseFloat(data.Waist) || 0
  },
}

function round(value: number) {
  return Math.round(value * 100) / 100
}

export default Vue.extend({
  layout: 'fullScreen',
  data() {
    return {
      dataKeys,
    }
  },
  computed: {
    currentMeasurements(): FormData {
      // return _defaultData
      return get(this, '$store.state.currentMeasurements.data', {})
    },
    idealMeasurements(): FormData {
      const data: FormData = { ...this.currentMeasurements }
      for (const key of dataKeys) {
        const value = formulas[key] ? formulas[key](data) : 0
        if (!isNil(value)) {
          data[key] = `${round(value)}`
        }
      }
      return data
    },
  },
  mounted() {
    if (isEmpty(this.currentMeasurements)) {
      this.$router.push('/')
    }
  },
  methods: {
    getValue(data: FormData, key: string): string {
      if (isNaN(data[key]) || data[key] === 'NaN') {
        return '-'
      }
      return data[key] && data[key] !== '0'
        ? `${data[key]} ${data['Distance unit']}`
        : '-'
    },
    getChange(key: string): number {
      const d =
        parseFloat(this.currentMeasurements[key]) -
        parseFloat(this.idealMeasurements[key])

      return round(d)
    },
    getChangeValue(value: number): string {
      if (isNaN(value)) {
        return 'N/A'
      }
      return `${value}`
    },
  },
})
</script>
