<template>
  <div
    v-if="!hide"
    ref="form"
    class="flex items-center justify-center h-full custom-form"
  >
    <Spinner />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

function stringToArray(data: string): string[] {
  return data.substring(1, data.length - 1).split(`","`)
}

export default Vue.extend({
  data() {
    return {
      hide: false,
    }
  },
  mounted() {
    this.runTripetto()
  },
  methods: {
    runTripetto() {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      const tripRunner = TripettoRunner
      // @ts-ignore
      // eslint-disable-next-line no-undef
      const tripService = TripettoServices
      // @ts-ignore
      // eslint-disable-next-line no-undef
      const tripAutoScroll = TripettoAutoscroll

      const tripetto = tripService.init({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMkFpUGR2Tm81dUM2REhaSEdqNHVTT1lzUndJam4vVXJmVTREd2M3cFZyQT0iLCJkZWZpbml0aW9uIjoiSnpHTEFXOGt2eGFNYzJ5VGFQMXY2K0JIaEhoNXUvOENqRERlZEEzbmpRbz0iLCJ0eXBlIjoiY29sbGVjdCJ9.dW6Q-zYb8jyyi8qfWpZ2f0CI82RyyAY01yUuGX_bC7I',
      })

      const element = this.$refs.form

      tripAutoScroll.run({
        element,
        definition: tripetto.definition,
        styles: tripetto.styles,
        l10n: tripetto.l10n,
        locale: tripetto.locale,
        translations: tripetto.translations,
        attachments: tripetto.attachments,
        onSubmit: (instance: any) => {
          const d = tripRunner.Export.CSV(instance)
          const fields = stringToArray(d.fields)
          const values = stringToArray(d.record)
          const data: {
            [key: string]: string
          } = {}
          for (let i = 0; i < fields.length; i++) {
            data[fields[i]] = values[i]
          }
          const payload = {
            data,
            fingerprint: d.fingerprint,
          }
          this.$store.commit('setCurrentMeasurements', payload)
          this.hide = true
          this.$router.push('/results')
        },
        // persistent: true,
      })
    },
  },
})
</script>

<style>
.custom-form iframe {
  height: 100% !important;
}
</style>
