<template>
  <div class="mt-4">
    <PageHeader title="Dashboard" action="Loading" :loading="loadingData" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { delay, Measurement } from '@/core'

export default Vue.extend({
  data() {
    const measurements: Measurement[] = []
    return {
      loadingData: false,
      measurements,
    }
  },
  computed: {
    uid(): string {
      return this.$fireModule.auth()?.currentUser?.uid || ''
    },
  },
  mounted() {
    if (!this.uid) {
      this.$router.push('/')
    } else {
      this.getUserData()
    }
  },
  methods: {
    async getUserData() {
      try {
        // const firestore = this.$fireModule.firestore
        const db = this.$fireModule.firestore()
        this.loadingData = true
        const docRef = db.collection('users').doc(this.uid)
        const docSnapshot = await docRef.get()
        if (docSnapshot.exists) {
          this.measurements = docSnapshot.data() as Measurement[]
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
