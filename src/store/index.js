import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null,
        error: null,
        loading: true,
        courses: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        loadCourses(state, payload) {
            state.courses = payload
        }
        
    },
    actions: {
        loadCourses({commit}) {
            commit('setLoading', true)
            firebase.database().ref('courses').once('value')
            .then(
                data => {
                    commit('loadCourses', data.val())
                    console.log(data.val())
                    commit('setLoading', false)
                }
            )
            .catch(
                error=> {
                    commit('setLoading', false)
                    console.log(error)
                }
            )
        },
        updateUser({commit}, payload) {

            firebase.database().ref('users/' + payload.id).update(payload)
            .then(
                () => {
                    console.log('update successful')
                    commit('setUser', payload)
                }
            )
        },
        signUserUp({commit}, payload) {
            
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    const newUser = {
                        id: user.user.uid,
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        email: payload.email,
                        password: payload.password,
                        gender: payload.gender,
                        mobile: '',
                        about: 'About me'
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
            commit('setLoading', true)
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(
                (user) => {
                    firebase.database().ref('users/' + user.user.uid).once('value').
                    then(
                        data => {
                            
                            commit('setUser', data.val())
                            commit('setLoading', false)
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
            commit('setLoading', true)
            firebase.database().ref('users/' + payload.uid).once('value').
            then(
                data => {
                    
                    commit('setUser', data.val())
                    commit('setLoading', false)
                }
            )
            .catch(
                error=> {
                    console.log(error)
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
        },
        loading(state) {
            return state.loading
        },
        courses(state) {
            return state.courses
        }
    }
})