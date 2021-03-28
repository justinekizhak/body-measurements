<template>
  <div class="flex items-center justify-center flex-grow">
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import 'firebaseui/dist/firebaseui.css'

export default Vue.extend({
  mounted() {
    this.$fireModule.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/')
      } else {
        this.setupFirebaseUi()
      }
    })
  },
  methods: {
    setupFirebaseUi() {
      if (process.client) {
        const firebaseui = require('firebaseui')
        const firebase = this.$fireModule

        const uiConfig = {
          signInSuccessUrl: '',
          signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            {
              provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              clientId: `873632977425-m2holihkq2cuh06j6vhukgjbis3ifmdf.apps.googleusercontent.com`,
            },
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            // firebase.auth.EmailAuthProvider.PROVIDER_ID,
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
          ],
          credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
          tosUrl: 'terms-of-service',
          privacyPolicyUrl: 'privacy',
        }

        const ui =
          firebaseui.auth.AuthUI.getInstance() ||
          new firebaseui.auth.AuthUI(firebase.auth())
        // if (ui.isPendingRedirect()) {
        ui.start('#firebaseui-auth-container', uiConfig)
        // }
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
