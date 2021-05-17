import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Profile from "../views/Profile";
import Search from "../views/Search";
import firebase from "firebase/app";
import CourseHome from "../views/CourseHome";
import SubscribedCourses from "../views/SubscribedCourses";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/course/:id",
    props: true,
    name: "CourseHome",
    component: CourseHome,
  },
  {
    path: "/courses",
    name: "SubscribedCourses",
    component: SubscribedCourses,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    name: "Invalid Path",
    component: Home,
    redirect: { name: "Home" },
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    // redirect to signin if a page requiring auth is accessed without login
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!user) {
        next({ name: "SignIn" });
      } else {
        next();
      }
    }
    // redirect to home (/) if user attempts to access /signin, /signup after logging in
    else if (to.matched.some((record) => record.meta.requiresVisitor)) {
      if (user) {
        next({ name: "Home" });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
