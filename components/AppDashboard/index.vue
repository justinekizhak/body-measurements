<template>
  <div class="mt-4">
    <PageHeader title="Dashboard" action="Loading" :loading="loadingData" />
    <div class="divide-y">
      <AppDashboardChart
        v-if="upperBody.length > 0"
        title="Upper Body"
        :series="upperBody"
        :xaxis="xaxis"
        :yaxis-unit="distanceUnit"
      />
      <AppDashboardChart
        v-if="lowerBody.length > 0"
        title="Lower Body"
        :series="lowerBody"
        :xaxis="xaxis"
        :yaxis-unit="distanceUnit"
      />
      <AppDashboardChart
        v-if="limbs.length > 0"
        title="Arms"
        :series="limbs"
        :xaxis="xaxis"
        :yaxis-unit="distanceUnit"
      />
    </div>
    <div class="py-8 border-t">
      <h2 class="mb-4 text-xl">Latest Progress</h2>
      <BaseTable :data="tableData" />
    </div>
    <div class="py-8 border-t">
      <h2 class="mb-4 text-xl">Full Table</h2>
      <BaseTable
        :data="table2Data"
        :button-col="buttonCol"
        @cell-click="handleCellClick"
      />
    </div>
    <base-modal :open="open" title="Delete?" @toggle-modal="toggleModal">
      <div class="flex justify-between mt-4">
        <base-button color="blue" no-border @click="handleModal('no')"
          >No</base-button
        >
        <base-button color="red" no-border @click="handleModal('yes')"
          >Yes</base-button
        >
      </div>
    </base-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  delay,
  Measurement,
  generateGraphSeries,
  GraphSeries,
  upperKeys,
  limbKeys,
  lowerKeys,
  Table,
  generateTable,
  displayMaleKeys,
  calculationKeys,
  generateTable2Data,
  getTime,
  TableCellClick,
} from '@/core'
import { last, indexOf } from 'lodash'

const buttonKey = 'Delete'

export default Vue.extend({
  data() {
    const measurements: Measurement[] = []
    const deleteCell: TableCellClick | null = {}
    return {
      loadingData: false,
      measurements,
      uid: '',
      distanceUnit: 'cm',
      open: false,
      deleteCell,
    }
  },
  computed: {
    xaxis(): string[] {
      const d = []
      for (const i of this.measurements) {
        d.push(getTime(i.timestamp))
      }
      return d
    },
    upperBody(): GraphSeries[] {
      return generateGraphSeries(this.measurements, upperKeys)
    },
    lowerBody(): GraphSeries[] {
      return generateGraphSeries(this.measurements, lowerKeys)
    },
    limbs(): GraphSeries[] {
      return generateGraphSeries(this.measurements, limbKeys)
    },
    tableData(): Table {
      const ideal = last(this.measurements)?.ideal
      const current = last(this.measurements)?.current
      const change = last(this.measurements)?.change
      const displayKeys =
        current?.Sex === 'Female' ? calculationKeys('Female') : displayMaleKeys
      return generateTable(ideal, current, change, displayKeys)
    },
    table2Data(): Table {
      return generateTable2Data(this.measurements)
    },
    buttonCol(): number[] {
      const head = this.table2Data[0] || []
      const d = []
      for (const i of head) {
        if (typeof i === 'object' && i.name === buttonKey) {
          d.push(indexOf(head, i))
        }
      }
      return d
    },
  },
  mounted() {
    this.checkUser()
  },
  methods: {
    handleCellClick(event: TableCellClick) {
      this.deleteCell = event
      this.toggleModal()
    },
    checkUser() {
      this.$fireModule.auth().onAuthStateChanged((user) => {
        if (user) {
          this.uid = user.uid
          this.getUserData()
        } else {
          this.$router.push('/')
        }
      })
    },
    async getUserData() {
      try {
        // const firestore = this.$fireModule.firestore
        const db = this.$fireModule.firestore()
        this.loadingData = true
        const docRef = db.collection('users').doc(this.uid)
        const docSnapshot = await docRef.get()
        if (docSnapshot.exists) {
          this.measurements = docSnapshot.data()?.measurements as Measurement[]
        } else {
          this.$toast.error('No data available')
        }
      } catch (error) {
        this.$sentry.captureException(error)
        this.$toast.error('Something went wrong in loading the data')
      } finally {
        await delay(1000)
        this.loadingData = false
      }
    },
    toggleModal() {
      this.open = !this.open
    },
    handleModal(key: string) {
      if (key === 'yes') {
        if (this.deleteCell?.rowIndex) {
          this.measurements.splice(this.deleteCell.rowIndex - 1, 1)
        }
      } else if (key === 'no') {
        this.deleteCell = null
      }
      this.toggleModal()
    },
  },
})
</script>
