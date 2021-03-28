<template>
  <div class="flex items-center justify-center flex-grow">
    <GoogleButton @click="googleLogin" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    this.$fireModule.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/')
      }
    })
  },
  methods: {
    async googleLogin() {
      try {
        const provider = new this.$fireModule.auth.GoogleAuthProvider()
        await this.$fireModule.auth().signInWithPopup(provider)
        // const credential = result.credential
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // // @ts-ignore
        // const token = credential?.accessToken
        // // The signed-in user info.
        // const user = result?.user
        // console.log(token, user)

        this.$router.push('/')
        this.$toast.success('Login success')
      } catch (error) {
        console.error(error.code, error.message, error.email, error.credential)
        this.$toast.error('Login failed')
      }
    },
    // addData() {
    //   const db = this.$fireModule.firestore()
    //   db.collection('test')
    //     .add({
    //       first: 'justine',
    //       last: 'kizhak',
    //     })
    //     .then((docRef) => {
    //       console.log('success: ', docRef.id)
    //     })
    //     .catch((error) => {
    //       console.error('fail: ', error)
    //     })
    // },
  },
})
</script>
