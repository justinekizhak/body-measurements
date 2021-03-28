<template>
  <div class="flex items-center justify-between gap-8 lg:justify-end">
    <base-button v-if="loggedIn" class="flex items-center gap-2">
      <span> Dashboard </span>
      <img :src="photoURL" class="w-6 h-6 rounded-full" />
    </base-button>
    <base-button v-if="!loggedIn" class="ml-auto" @click="login"
      >Login</base-button
    >
    <base-button v-else @click="logout">Logout</base-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { get } from 'lodash'

export default Vue.extend({
  data() {
    return {
      loggedIn: false,
    }
  },
  computed: {
    currentUser(): any {
      const d = this.$fireModule.auth()
      return get(d, 'currentUser', {})
    },
    displayName(): string {
      return this.currentUser.displayName
    },
    photoURL(): string {
      return this.currentUser.photoURL
    },
  },
  mounted() {
    this.listenForAuthState()
  },
  methods: {
    listenForAuthState() {
      this.$fireModule.auth().onAuthStateChanged((user) => {
        if (user) {
          this.loggedIn = true
        } else {
          this.loggedIn = false
        }
      })
    },
    logout() {
      this.$fireModule.auth().signOut()
      this.$toast('Logged out')
    },
    login() {
      this.$router.push('/login')
    },
  },
})
</script>
