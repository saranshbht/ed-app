<template>
  <v-list class="d-flex flex-column" height="100%">
    <v-list-item v-if="isAuthenticated">
      <v-list-item-avatar>
        <v-avatar color="orange" size="96">
          <span class="white--text headline">X</span>
        </v-avatar>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{
          user.firstName + " " + user.lastName
        }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <template v-for="item in items">
      <v-list-item :to="item.link" :key="item.title">
        <v-list-item-action>
          <v-icon light> {{ item.icon }} </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title> {{ item.title }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-list-item v-if="isAuthenticated" @click="onSignout">
      <v-list-item-action>
        <v-icon light> exit_to_app </v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title> Sign Out </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["items"],
  computed: mapGetters(["user", "isAuthenticated"]),
  methods: {
    onSignout() {
      this.$store.dispatch.logout();
    },
  },
};
</script>

<style scoped>
.v-list-item {
  flex: 0;
}
</style>
