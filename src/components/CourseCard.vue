<template>
  <v-card flat class="pa-2">
    <v-row justify="center" no-gutters>
      <v-col cols="4">
        <router-link :to="'/course/' + course.id">
          <img
            :src="imageUrl"
            height="400"
            width="100%"
            style="object-fit:contain;"
          />
        </router-link>
      </v-col>

      <v-col cols="8">
        <v-card height="100%" class="d-flex flex-column justify-center" flat>
          <v-card-title>{{ course.title }}</v-card-title>
          <v-card-text>
            <div>
              {{
                course.description.length > 300
                  ? course.description.slice(0, 300) + "..."
                  : course.description
              }}
            </div>
            <v-rating
              :value="course.rating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            >
            </v-rating>

            <div class="grey--text">
              {{ course.rating }} ({{ course.raters }}) |
              {{ course.students }} students enrolled
            </div>
          </v-card-text>

          <v-card-actions
            ><v-btn
              v-if="isAuthenticated"
              color="deep-purple lighten-2"
              @click="onClick"
            >
              <v-icon large v-if="isSubscribed">mdi-bookmark-remove</v-icon>
              <v-icon large v-else>mdi-bookmark-check</v-icon>
              {{ isSubscribed ? "Unsubscribe" : "Subscribe" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { cloneDeep } from "lodash";
export default {
  props: ["course"],
  computed: {
    ...mapGetters(["user", "isAuthenticated"]),
    isSubscribed() {
      return (this.user.subscribedCourses || []).some(
        (id) => id === this.course.id
      );
    },
    imageUrl() {
      return this.course.imageUrl + "/200x300";
    },
  },
  methods: {
    onClick() {
      let userData = cloneDeep(this.user);
      if (!userData.subscribedCourses) {
        userData.subscribedCourses = [];
      }
      // console.log(this.isSubscribed);

      // remove course if already subscribed, otherwise add to user's subscribed courses
      if (this.isSubscribed) {
        userData.subscribedCourses = (this.user.subscribedCourses || []).filter(
          (id) => id !== this.course.id
        );
      } else {
        userData.subscribedCourses.push(this.course.id);
      }
      this.$store.dispatch("updateUser", { userData: userData });
    },
  },
};
</script>

<style scoped>
* {
  word-break: break-word;
}
</style>
