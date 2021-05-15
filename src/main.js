import Vue from "vue";
import App from "./App";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@/firebase/";
import firebase from "firebase/app";
import Alert from "@/components/Alert";

Vue.component("app-alert", Alert);
Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch("autoSignIn", user);
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    store.dispatch("loadCourses");
  },
}).$mount("#app");
