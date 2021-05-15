<template>
  <v-container
    ><div v-if="!subscribedCourses.length" class="text-center">
      Subscribe <v-icon color="deep-purple" large>mdi-bookmark-check</v-icon> to
      some courses
    </div>
    <course-card
      v-else
      v-for="course in subscribedCourses"
      :key="course.id"
      :course="course"
    ></course-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import CourseCard from "@/components/CourseCard";
export default {
  components: {
    CourseCard,
  },
  computed: {
    ...mapGetters(["user", "isAuthenticated", "courses"]),
    subscribedCourses() {
      // console.log(this.courses, this.user.subscribedCourses);

      return (this.courses || []).filter((obj) =>
        (this.user.subscribedCourses || []).includes(obj["id"])
      );
    },
  },
};
</script>

<style></style>
