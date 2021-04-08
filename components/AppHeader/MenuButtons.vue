<template>
  <div>
    <base-button class="lg:hidden" @click="$emit('close')">X</base-button>
    <base-button v-if="showFormButton" @click="goTo('/')"> Home </base-button>
    <base-button @click="goTo('/about')"> About </base-button>
    <base-button
      v-if="showDashboardButton"
      class="flex items-center gap-2"
      @click="goTo('/dashboard')"
    >
      <span> Dashboard </span>
      <img
        v-if="photoURL"
        :src="photoURL"
        alt="profile photo"
        class="w-6 h-6 rounded-full"
      />
    </base-button>
    <base-button v-if="showLoginButton" class="ml-auto" @click="login"
      >SignIn / SignUp</base-button
    >
    <base-button v-if="loggedIn" @click="logout">Logout</base-button>
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
    showDashboardButton(): boolean {
      return this.loggedIn && this.$route.path !== '/dashboard'
    },
    showLoginButton(): boolean {
      return !this.loggedIn && this.$route.path !== '/login'
    },
    showFormButton(): boolean {
      return this.$route.path !== '/'
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
      this.$fireModule.analytics().logEvent('login')
      this.$router.push('/login')
    },
    goTo(path: string) {
      this.$router.push(path)
    },
  },
})
</script>
