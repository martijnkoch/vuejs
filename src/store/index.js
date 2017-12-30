import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedGerechten: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedGerechten (state, payload) {
      state.loadedGerechten = payload
    },
    createGerecht (state, payload) {
      state.loadedGerechten.push(payload)
    },
    updateGerecht (state, payload) {
      const gerecht = state.loadedGerechten.find(gerecht => {
        return gerecht.id === payload.id
      })
      if (payload.title) {
        gerecht.title = payload.title
      }
      if (payload.description) {
        gerecht.description = payload.description
      }
      if (payload.ingredienten) {
        gerecht.ingredienten = payload.ingredienten
      }
      if (payload.bereiding) {
        gerecht.bereiding = payload.bereiding
      }
      if (payload.video) {
        gerecht.video = payload.video
      }
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state, payload) {
      state.error = null
    }
  },
  actions: {
    // fetch gerechten uit firebase
    loadGerechten ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('gerechten').once('value')
        .then((data) => {
          const gerechten = []
          const obj = data.val()
          for (let key in obj) {
            gerechten.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              ingredienten: obj[key].ingredienten,
              bereiding: obj[key].bereiding,
              video: obj[key].video,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoading', false)
          commit('setLoadedGerechten', gerechten)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', true)
          }
        )
    },
    // haal nieuw gerecht op van creategerecht pagina
    createGerecht ({commit, getters}, payload) {
      const gerecht = {
        title: payload.title,
        creatorId: getters.user.id,
        description: payload.description,
        ingredienten: payload.ingredienten,
        video: payload.video,
        bereiding: payload.bereiding
      }
      // connectie naar Firebase
      let imageUrl
      let key
      firebase.database().ref('gerechten').push(gerecht)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('gerechten/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('gerechten').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createGerecht', {
            ...gerecht,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // gerecht aanpassen
    updateGerechtData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.ingredienten) {
        updateObj.ingredienten = payload.ingredienten
      }
      if (payload.bereiding) {
        updateObj.bereiding = payload.bereiding
      }
      if (payload.video) {
        updateObj.video = payload.video
      }
      firebase.database().ref('gerechten').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateGerecht', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    // user later registreren
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredGerechten: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    // user laten inloggen
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredGerechten: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    // auto login
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredGerechten: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearerror')
    }
  },
  getters: {
    // alle gerechten laden in overzicht
    loadedGerechten (state) {
      return state.loadedGerechten.sort((gerechtA, gerechtB) => {
        return gerechtA.date > gerechtB.date
      })
    },
    // 5 gerechten laden voor op homepage caroussel
    featuredGerechten (state, getters) {
      return getters.loadedGerechten.slice(0, 5)
    },
    // individueel gerecht laden aan de hand van gerechtID
    loadedGerecht (state) {
      return (gerechtId) => {
        return state.loadedGerechten.find((gerecht) => {
          return gerecht.id === gerechtId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
