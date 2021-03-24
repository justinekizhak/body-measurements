<template>
  <div class="grid h-screen p-8">
    <div class="text-3xl font-bold break-words lg:text-5xl">
      Body Measurements
    </div>
    <div ref="form" class="row-span-8 lg:row-span-4"></div>
    <div class="flex items-end">
      <a
        href="https://justine.kizhak.com"
        target="_blank"
        class="border-b-2 border-black"
      >
        <span> Created by </span>
        <span class="ml-1 font-bold"> JustineKizhakkinedath </span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  head() {
    return {
      script: [
        {
          src: 'https://unpkg.com/tripetto-runner-foundation',
        },
        {
          src: 'https://unpkg.com/tripetto-runner-autoscroll',
        },
        {
          src: 'https://unpkg.com/tripetto-services',
        },
      ],
    }
  },
  mounted() {
    this.runTripetto()
  },
  methods: {
    runTripetto() {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      const tripetto = TripettoServices.init({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMkFpUGR2Tm81dUM2REhaSEdqNHVTT1lzUndJam4vVXJmVTREd2M3cFZyQT0iLCJkZWZpbml0aW9uIjoiSnpHTEFXOGt2eGFNYzJ5VGFQMXY2K0JIaEhoNXUvOENqRERlZEEzbmpRbz0iLCJ0eXBlIjoiY29sbGVjdCJ9.dW6Q-zYb8jyyi8qfWpZ2f0CI82RyyAY01yUuGX_bC7I',
      })

      const element = this.$refs.form

      // @ts-ignore
      // eslint-disable-next-line no-undef
      TripettoAutoscroll.run({
        element,
        definition: tripetto.definition,
        styles: tripetto.styles,
        l10n: tripetto.l10n,
        locale: tripetto.locale,
        translations: tripetto.translations,
        attachments: tripetto.attachments,
        onSubmit: tripetto.onSubmit,
        persistent: true,
      })
    },
  },
})
</script>

<style>
iframe {
  height: 100% !important;
}
</style>
