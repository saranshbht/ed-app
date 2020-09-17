import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import SearchPage from './components/SearchPage.vue';
import SignIn from './components/SignIn.vue';
import SignUpForm from './components/SignUpForm.vue';
import ProfilePage from './components/ProfilePage.vue';


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
  vuetify,
  render: h => h(App)
}).$mount('#app')
