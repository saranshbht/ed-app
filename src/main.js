import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import SearchPage from './components/SearchPage.vue';
import SignIn from './components/SignIn.vue';
import SignUpForm from './components/SignUpForm.vue';
import ProfilePage from './components/ProfilePage.vue';
import * as firebase from 'firebase'
import {store} from './store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/search',
    component: SearchPage
  },
  {
    path: '/signup',
    component: SignUpForm
  },
  {
    path: '/signin',
    component: SignIn
  },
  {
    path: '/profile',
    component: ProfilePage
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCvMkVJPYyP9XYhVwxKc0SVa-Blv7Ju958",
    authDomain: "ed-app-19213.firebaseapp.com",
    databaseURL: "https://ed-app-19213.firebaseio.com",
    projectId: "ed-app-19213",
    storageBucket: "ed-app-19213.appspot.com",
    messagingSenderId: "432025095703",
    appId: "1:432025095703:web:2b4480787a2bfd19cf1652",
    measurementId: "G-BFLRB4Z0F1"
    })

    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          this.$store.dispatch('autoSignIn', user)
        }
      }
    )
    this.$store.dispatch('loadCourses')
  }
}).$mount('#app')
