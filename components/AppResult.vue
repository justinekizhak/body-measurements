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
          {{ getValue(i) }}
        </div>
        <div
          class="w-1/3 text-center"
          :class="{
            'text-red-500': !withinMargin(i),
            'text-blue-400': withinMargin(i),
          }"
        >
          {{ changes[i] }}
        </div>
      </div>
    </div>
    <div v-if="isEstimate" class="mt-16">
      Based on the estimated Wrist circumference:
      {{ `${currentMeasurements.Wrist} ${distanceUnit}` }}
    </div>
    <div class="mt-8">
      <span class="mr-4"> Margin Percentage</span>
      <input
        v-model="margin"
        type="number"
        min="0"
        max="5"
        class="text-white bg-gray-700"
      />
    </div>
    <div class="mt-8 mb-8">
      <div class="mb-4 text-lg font-bold">Legends</div>
      <div class="flex flex-col gap-4 text-gray-300 lg:ml-8">
        <div class="text-blue-400">
          <div class="inline-block w-2 h-2 mr-2 bg-blue-400 rounded-full"></div>
          Blue: Current measurement is within margin
        </div>
        <div class="text-red-500">
          <div class="inline-block w-2 h-2 mr-2 bg-red-500 rounded-full"></div>
          Red: Current measurement is not within margin
        </div>
        <div>
          <span class="mr-2 font-bold text-white">-</span> Negative means you
          need to decrease to achive ideal
        </div>
        <div>
          <span class="mr-2 font-bold text-white">+</span> Positive means you
          need to increase to achive ideal
        </div>
      </div>
    </div>
    <div class="mb-8">
      <a
        href="https://blog.iafstore.com/en/calculate-the-ideal-body-measurements-a238"
        class="text-gray-300 border-b border-gray-300 hover:text-white hover:border-white"
        >Source</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { get, isEmpty, isNil, isNaN } from 'lodash'

interface FormData {
  'Distance unit': string
  'Weight unit': string
  Wrist: string
  Sex: string
  Height: string
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
  [key: string]: string
}

interface Dict {
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
  'Chest',
  'Waist',
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
    return parseFloat(data?.Wrist) * 6.5
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
    return parseFloat(data?.Waist) * GOLDEN_RATIO
  },
}

function round(value: number) {
  return Math.round(value * 100) / 100
}

export default Vue.extend({
  data() {
    return {
      dataKeys,
      margin: 5,
    }
  },
  computed: {
    currentMeasurements(): FormData {
      // return _defaultData
      return get(this, '$store.state.currentMeasurements.data', {})
    },
    idealMeasurements(): FormData {
      const data: Dict = { Wrist: this.currentMeasurements.Wrist }
      for (const key of dataKeys) {
        const value = formulas[key] ? formulas[key](data as FormData) : 0
        if (!isNil(value)) {
          data[key] = `${round(value)}`
        }
      }
      return data as FormData
    },
    distanceUnit(): string {
      return this.currentMeasurements['Distance unit']
    },
    isEstimate(): boolean {
      return this.currentMeasurements['Rough estimate?'] === 'Yes'
    },
    changes(): FormData {
      const data: Dict = {}
      for (const key of dataKeys) {
        data[key] = this.getChangeValue(this.getChange(key))
      }
      return data as FormData
    },
  },
  mounted() {
    if (isEmpty(this.currentMeasurements)) {
      this.$router.push('/')
    }
  },
  methods: {
    getValue(key: string): string {
      const data = this.idealMeasurements
      if (isNaN(data[key]) || data[key] === 'NaN') {
        return '-'
      }
      return data[key] && data[key] !== '0'
        ? `${data[key]} ${this.distanceUnit}`
        : '-'
    },
    getChange(key: string): number {
      const d =
        parseFloat(this.idealMeasurements[key]) -
        parseFloat(this.currentMeasurements[key])

      return round(d)
    },
    getChangeValue(value: number): string {
      if (isNaN(value)) {
        return 'N/A'
      }
      return `${value}`
      // return `${Math.abs(value)}`
    },
    withinMargin(key: string): boolean {
      const value = this.getChange(key)
      if (isNaN(value)) {
        return true
      }
      const d = Math.abs(value)
      const idealV = this.idealMeasurements[key]
      const margin = (this.margin / 100) * parseFloat(idealV)
      if (d > margin) {
        return false
      }
      return true
    },
  },
})
</script>
