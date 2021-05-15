<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <navigation-drawer :items="menuItems"></navigation-drawer>
    </v-navigation-drawer>
    <v-app-bar app class="primary white--text">
      <v-app-bar-nav-icon
        dark
        @click.stop="drawer = !drawer"
        class="hidden-sm-and-up"
      ></v-app-bar-nav-icon>
      <v-spacer />

      <v-toolbar-title>
        <router-link to="/" custom v-slot="{ href, navigate }">
          <span class="header" :href="href" @click="navigate">
            {{ appName }}
          </span>
        </router-link>
      </v-toolbar-title>

      <v-spacer />
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          dark
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn text dark v-if="isAuthenticated" @click="onSignout">
          <v-icon left dark>exit_to_app</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from "@/components/NavigationDrawer";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    NavigationDrawer,
  },
  data() {
    return {
      appName: "Ed App",
      drawer: false,
      // showSnackbar: false
    };
  },
  computed: {
    ...mapGetters(["user", "isAuthenticated"]),
    menuItems() {
      let menuItems = [
        // { icon: "mdi-home", title: "Home", link: "/" },
        { icon: "mdi-account-plus", title: "Sign Up", link: "/signup" },
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        {
          icon: "mdi-bookmark-multiple",
          title: "All Courses",
          link: "/search",
        },
      ];
      if (this.isAuthenticated) {
        menuItems = [
          // { icon: "mdi-home", title: "Home", link: "/" },
          { icon: "mdi-account", title: "Profile", link: "/profile" },
          {
            icon: "mdi-bookmark",
            title: "My Courses",
            link: "/courses",
          },
          {
            icon: "mdi-bookmark-multiple",
            title: "All Courses",
            link: "/search",
          },
        ];
      }
      return menuItems;
    },
  },
  methods: {
    onSignout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap");
.header {
  font-family: "Sigmar One", cursive;
  font-weight: 900;
  font-size: 3rem;
  word-break: break-word;
  cursor: pointer;
}
</style>
