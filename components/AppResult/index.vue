<template>
  <div class="mt-4">
    <PageHeader title="Results" action="Saving" :loading="savingData" />

    <BaseTable :data="tableData" />
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

    <AppResultLegends />

    <ResultActions class="mb-8" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { get, isEmpty, isNil, isNaN } from 'lodash'
import {
  round,
  delay,
  Measurement,
  FormData,
  dataKeys,
  formulas,
  Table,
  generateTable,
  getChange,
} from '@/core'

interface Dict {
  [key: string]: string
}

export default Vue.extend({
  data() {
    return {
      dataKeys,
      margin: 5,
      savingData: false,
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
      const getChangeValue = (value: number): string => {
        if (isNaN(value)) {
          return 'N/A'
        }
        return `${value < 0 ? '' : '+'}${value} ${this.distanceUnit}`
        // return `${Math.abs(value)}`
      }
      const data: Dict = {}
      for (const key of dataKeys) {
        data[key] = getChangeValue(this.getChange(key))
      }
      return data as FormData
    },
    tableData(): Table {
      return generateTable(
        this.idealMeasurements,
        this.currentMeasurements,
        this.changes,
        this.margin
      )
    },
  },
  mounted() {
    if (isEmpty(this.currentMeasurements)) {
      // this.$router.push('/')
    } else {
      // this.$store.commit('setResult', {
      //   current: this.currentMeasurements,
      //   ideal: this.idealMeasurements,
      //   change: this.changes,
      // })
      this.saveData()
    }
  },
  methods: {
    getChange(key: string): number {
      return getChange(this.idealMeasurements, this.currentMeasurements, key)
    },
    async saveData() {
      try {
        const skip = this.currentMeasurements['Jump the gun?'] === 'Yes'
        if (skip) {
          return
        }

        const firestore = this.$fireModule.firestore
        const uid = this.$fireModule.auth()?.currentUser?.uid
        if (!uid) {
          return
        }
        this.savingData = true
        const db = this.$fireModule.firestore()
        const docRef = db.collection('users').doc(uid)
        const docSnapshot = await docRef.get()
        const data: Measurement = {
          timestamp: firestore.Timestamp.now(),
          current: this.currentMeasurements,
          ideal: this.idealMeasurements,
          change: this.changes,
        }
        const payload = {
          measurements: firestore.FieldValue.arrayUnion(data),
        }
        if (docSnapshot.exists) {
          docRef.update(payload)
        } else {
          docRef.set(payload)
        }
      } catch (error) {
        this.$toast.error('Something went wrong in saving the data')
      } finally {
        await delay(1000)
        this.savingData = false
      }
    },
  },
})
</script>