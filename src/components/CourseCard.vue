<template>
  <v-card flat>
    <v-row justify="center" no-gutters>
      <v-col class="col-4" align-self="center">
        <router-link :to="'/course/' + course.id">
          <v-img :src="course.imageUrl" max-height="400" cover>
            <template v-slot:placeholder> <Loading /> </template
          ></v-img>
        </router-link>
      </v-col>

      <v-col class="col-8 px-0">
        <v-card
          height="100%"
          class="d-flex flex-column justify-space-around"
          flat
        >
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

          <div>
            <v-card-actions
              ><v-btn
                v-if="isAuthenticated"
                right
                absolute
                color="deep-purple lighten-2"
                @click="onClick"
              >
                <v-icon large v-if="isSubscribed">mdi-bookmark-remove</v-icon>
                <v-icon large v-else>mdi-bookmark-check</v-icon>
                {{ isSubscribed ? "Unsubscribe" : "Subscribe" }}
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Loading from "@/components/Loading";
import { mapGetters } from "vuex";
import { cloneDeep } from "lodash";
export default {
  components: {
    Loading,
  },
  props: ["course"],
  computed: {
    ...mapGetters(["user", "isAuthenticated"]),
    isSubscribed() {
      return (this.user.subscribedCourses || []).some(
        (id) => id === this.course.id
      );
    },
  },
  methods: {
    onClick() {
      let userData = cloneDeep(this.user);
      if (!userData.subscribedCourses) {
        userData.subscribedCourses = [];
      }
      console.log(this.isSubscribed);
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
