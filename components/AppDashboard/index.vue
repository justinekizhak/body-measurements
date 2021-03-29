<template>
  <div class="mt-4">
    <PageHeader title="Dashboard" action="Loading" :loading="loadingData" />
    <AppDashboardChart
      v-if="upperBody.length > 0"
      title="Upper Body"
      :series="upperBody"
      :xaxis="xaxis"
    />
    <AppDashboardChart
      v-if="lowerBody.length > 0"
      title="Lower Body"
      :series="lowerBody"
      :xaxis="xaxis"
    />
    <AppDashboardChart
      v-if="limbs.length > 0"
      title="Arms"
      :series="limbs"
      :xaxis="xaxis"
    />
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
} from '@/core'

export default Vue.extend({
  data() {
    const measurements: Measurement[] = []
    return {
      loadingData: false,
      measurements,
      uid: '',
    }
  },
  computed: {
    xaxis(): string[] {
      const d = []
      const options = {
        year: 'numeric',
        month: 'long',
        weekday: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }
      for (const i of this.measurements) {
        const t = i.timestamp.toDate()
        // @ts-ignore
        const t2 = t.toLocaleString(undefined, options)
        d.push(t2)
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
  },
  mounted() {
    this.checkUser()
  },
  methods: {
    checkUser() {
      this.$fireModule.auth().onAuthStateChanged((user) => {
        if (user) {
          this.uid = user.uid
          this.getUserData()
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
        this.$toast.error('Something went wrong in saving the data')
      } finally {
        await delay(1000)
        this.loadingData = false
      }
    },
  },
})
</script>
