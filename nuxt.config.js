// const ENV = process.env.NODE_ENV

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Body Measurements | Justine Kizhakkinedath',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
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
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      Raleway: true,
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
  ],
  firebase: {
    config: {
      apiKey: 'AIzaSyCu-Fy-GNmXyCYyHmU-MTFP4dwk2ZEjOJo',
      authDomain: 'body-measurement-e610c.firebaseapp.com',
      projectId: 'body-measurement-e610c',
      storageBucket: 'body-measurement-e610c.appspot.com',
      messagingSenderId: '873632977425',
      appId: '1:873632977425:web:1a8dc9c0d5918abf8817b0',
      measurementId: 'G-4BKW5SP6VD',
    },
    services: {
      auth: {
        // emulatorPort: ENV === 'development' ? 9099 : undefined,
      },
    },
  },

  tailwindcss: {
    jit: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  buildDir: 'dist',
}
