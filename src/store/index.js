import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null,
        error: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setError(state, payload) {
            state.error = payload
        }
        
    },
    actions: {
        signUserUp({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    const newUser = {
                        id: user.user.uid,
                        name: payload.name
                    }
                    firebase.database().ref('users/' + newUser.id).set(newUser)
                    .then(
                        () => {
                            console.log('successful')
                        }
                    )
                    .catch(
                        error => {
                            console.log(error)
                        }
                    )
                   commit('setUser', newUser) 
                }
            )
            .catch(
                error => {
                    commit('setError', error)
                }
            )

           

        },

        signUserIn({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(
                (user) => {
                    firebase.database().ref('users/' + user.user.uid).once('value').
                    then(
                        data => {
                            commit('setUser', data.val())
                            console.log(data.val())
                        }
                    )
                }
            )
            .catch(
                error=> {
                    console.log(error)
                    commit('setError', error)
                }
            )

            
        },
        autoSignIn({commit}, payload) {
            firebase.database().ref('users/' + payload.uid).once('value').
            then(
                data => {
                    commit('setUser', data.val())
                    console.log(data.val())
                }
            )
        },
        logout({commit}) {
            firebase.auth().signOut()
            .then(
                () =>{
                    console.log('logout')
                }
            )
            .catch(
                error=> {
                    console.log(error)
                }
            )
            commit('setUser', null)
        }
    },
    getters: {
        error(state) {
            return state.error
        },
        user(state) {
            return state.user
        }
    }
})