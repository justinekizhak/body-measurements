<template>
  <div>
    <button class="w-64 h-12 text-black bg-white" @click="googleLogin">
      Login with Google
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    googleLogin() {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      this.$fireModule
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const credential = result.credential
          // This gives you a Google Access Token. You can use it to access the Google API.
          // @ts-ignore
          const token = credential?.accessToken
          // The signed-in user info.
          const user = result?.user
          console.log(token, user)
        })
        .catch((error) => {
          // Handle Errors here.
          // const errorCode = error.code
          // const errorMessage = error.message
          // // The email of the user's account used.
          // const email = error.email
          // // The firebase.auth.AuthCredential type that was used.
          // const credential = error.credential
          console.error(error)
        })
    },
  },
})
</script>
