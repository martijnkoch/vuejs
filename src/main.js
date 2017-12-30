import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import AlertCmp from './components/shared/Alert.vue'
import EditGerechtDialog from './components/Gerecht/Edit/EditGerechtDialog'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-gerecht-dialog', EditGerechtDialog)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  // firebase connectie toevoegen
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyA_Nh29PRplUw5bumWboeI9G9Oke7LrR2U',
      authDomain: 'kookwebsite-e83ce.firebaseapp.com',
      databaseURL: 'https://kookwebsite-e83ce.firebaseio.com',
      projectId: 'kookwebsite-e83ce',
      storageBucket: 'gs://kookwebsite-e83ce.appspot.com/'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadGerechten')
  }
})
