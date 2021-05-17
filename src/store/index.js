import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    loading: false,
    courses: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setCourses(state, payload) {
      state.courses = payload;
    },
  },
  actions: {
    loadCourses({ commit }) {
      //   commit("setLoading", true);
      firebase
        .database()
        .ref("courses")
        .once("value")
        .then((data) => {
          let courses = data.val();
          // store courses in state as an array of course objects
          let courses_array = [];
          for (let course in courses) {
            courses_array.push(courses[course]);
          }
          commit("setCourses", courses_array);
          // console.log(courses_array);
          //   commit("setLoading", false);
        })
        .catch(() => {
          //   commit("setLoading", false);
          // console.log(error);
        });
    },

    updateUser({ commit }, { userData, message = "" }) {
      commit("setLoading", true);
      commit("setError", null);
      firebase
        .database()
        .ref("/users/" + userData.id)
        .update(userData)
        .then(() => {
          // console.log("update successful");
          commit("setUser", userData);
          commit("setError", { message: message });
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setError", error);
          commit("setLoading", false);
          // console.log(error);
        });
    },

    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("setError", null);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.user.uid,
            firstName: payload.firstName,
            lastName: payload.lastName,
            gender: payload.gender,
          };
          // console.log(newUser);
          commit("setUser", newUser);
          firebase
            .database()
            .ref("/users/" + newUser.id)
            .update(newUser)
            .then(() => {
              commit("setLoading", false);
              // console.log("successful");
            })
            .catch((error) => {
              // console.log(error);
              commit("setError", error);
              commit("setLoading", false);
            });
        })
        .catch((error) => {
          // console.log(error);
          commit("setError", error);
          commit("setLoading", false);
        });
    },

    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("setError", null);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          firebase
            .database()
            .ref("/users/" + user.user.uid)
            .once("value")
            .then((data) => {
              commit("setUser", data.val());
              commit("setLoading", false);
              // console.log(data.val());
            });
        })
        .catch((error) => {
          // console.log(error);
          commit("setError", error);
          commit("setLoading", false);
        });
    },

    autoSignIn({ commit }, payload) {
      // commit("setUser", { id: payload.id });
      firebase
        .database()
        .ref("/users/" + payload.uid)
        .once("value")
        .then((data) => {
          commit("setUser", data.val());
          // console.log(payload.uid);
        })
        .catch(() => {
          // console.log(error);
          // console.log("error");
        });
    },

    logout({ commit }) {
      commit("setLoading", true);
      commit("setError", null);
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setUser", null);
          commit("setLoading", false);
          // router.push({ name: "Home" }).catch(() => router.go());
        })
        .catch((error) => {
          // console.log(error);
          commit("setError", error);
          commit("setLoading", false);
        });
    },

    clearError({ commit }) {
      commit("setError", null);
    },
  },
  getters: {
    error(state) {
      return state.error;
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    courses(state) {
      return state.courses;
    },
    isAuthenticated(state) {
      return state.user !== null && state.user != undefined;
    },
  },
});
