<template>
  <v-container fluid fill-height>
    <v-row
      ><v-col xs="12" md="6" offset-md="3">
        <v-card :loading="loading" class="mx-auto my-5" flat>
          <v-img max-height="500" :src="course.imageUrl"
            ><template v-slot:placeholder> <Loading /> </template
          ></v-img>
          <v-card-actions>
            <v-btn
              v-if="isAuthenticated"
              color="deep-purple lighten-2"
              @click="onSubscribe"
            >
              <v-icon large v-if="isSubscribed">mdi-bookmark-remove</v-icon>
              <v-icon large v-else>mdi-bookmark-check</v-icon>
              {{ isSubscribed ? "Unsubscribe" : "Subscribe" }}
            </v-btn>
          </v-card-actions>

          <v-card-title>{{ course.title }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="course.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">
                {{ course.rating }} ({{ course.raters }}) |
                {{ course.students }} students enrolled
              </div>
            </v-row>

            <div class="my-4 subtitle-1">
              {{ course.author }}
            </div>

            <div>
              {{ course.description }}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Playlist</v-card-title>

          <v-card-text>
            <VideoCarousel :items="course.playlist" />
          </v-card-text>
        </v-card> </v-col
    ></v-row>
  </v-container>
</template>

<script>
import VideoCarousel from "@/components/VideoCarousel";
import Loading from "@/components/Loading";
import { mapGetters } from "vuex";
import { cloneDeep } from "lodash";

export default {
  components: {
    VideoCarousel,
    Loading,
  },
  props: ["id"],
  watch: {
    $route: "this.course",
  },
  computed: {
    ...mapGetters(["user", "isAuthenticated"]),
    allCourses() {
      return this.$store.getters.courses;
    },
    loading() {
      return this.$store.getters.loading;
    },
    course() {
      return (
        (this.allCourses || []).filter((obj) => obj["id"] == this.id)[0] || {}
      );
    },
    isSubscribed() {
      return (this.user.subscribedCourses || []).some(
        (id) => id === this.course.id
      );
    },
  },
  methods: {
    onSubscribe() {
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
