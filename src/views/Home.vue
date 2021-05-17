<template>
  <v-container class="px-0 py-0" fluid>
    <v-card color="primary" tile>
      <v-card-title>
        <v-text-field
          v-model="search"
          hide-details
          label="Search"
          prepend-inner-icon="search"
          solo
          @keydown.enter="onUpdate()"
        />
      </v-card-title>
    </v-card>

    <v-card>
      <v-card-title>Featured Topics</v-card-title>
      <v-card-text>
        <v-chip-group column>
          <v-chip
            v-for="(topic, i) in featuredTopics"
            :to="'/search?q=' + topic"
            :key="i"
          >
            {{ topic }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>

    <v-divider></v-divider>

    <v-row no-gutters justify="space-around">
      <v-col cols="12" sm="6" md="4">
        <v-card flat>
          <v-card-title class="font-weight-bold text-h4"
            >Featured Courses</v-card-title
          >
          <v-card-text>
            <VideoCarousel :items="featuredCourses" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card flat>
          <v-card-title class="font-weight-bold text-h4">
            Live Learning</v-card-title
          >
          <v-card-text>
            <VideoCarousel :items="liveCourses" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoCarousel from "@/components/VideoCarousel";
export default {
  components: {
    VideoCarousel,
  },
  data() {
    return {
      drawer: false,
      search: "",
    };
  },
  computed: {
    // needs to be fetched from an external source
    featuredCourses() {
      return [
        {
          id: "1",
          content: `<iframe width="100%"
              height="100%"
              src="https://www.youtube.com/embed/XljsGqsZyL4"
              title="YouTube video player" frameborder="0"
              allowfullscreen></iframe>`,
        },
        {
          id: "2",
          content: `<iframe width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/PKRXbLnfXXk" 
              title="YouTube video player" frameborder="0" 
              allowfullscreen></iframe>`,
        },
        {
          id: "3",
          content: `<iframe width="100%"
              height="100%"
              src="https://www.youtube.com/embed/4deVCNJq3qc"
              title="YouTube video player" frameborder="0"
              allowfullscreen></iframe>`,
        },
        {
          id: "4",
          content: `<iframe width="100%"
              height="100%"
              src="https://www.youtube.com/embed/y_UUjPkxlZ0"
              title="YouTube video player" frameborder="0"
              allowfullscreen></iframe>`,
        },
        {
          id: "5",
          content: `<iframe width="100%"
              height="100%"
              src="https://www.youtube.com/embed/lYWYWyX04JI"
              title="YouTube video player" frameborder="0"
              allowfullscreen></iframe>`,
        },
      ];
    },
    // needs to be fetched from an external source
    liveCourses() {
      return [
        {
          id: "1",
          content: `<iframe width="100%"
              height="100%%"
              src="https://www.youtube.com/embed/PKRXbLnfXXk"
              title="YouTube video player" frameborder="0"
              allowfullscreen></iframe>`,
        },
        {
          id: "2",
          content: `<iframe width="100%"
              height="100%%"
              src="https://www.youtube.com/embed/XljsGqsZyL4"
              title="YouTube video player" frameborder="0"
              allowfullscreen></iframe>`,
        },
        {
          id: "3",
          content: `<iframe width="100%"
              height="100%%"
              src="https://www.youtube.com/embed/r2ga-iXS5i4"
              title="YouTube video player" frameborder="0"
              allowfullscreen></iframe>`,
        },
        {
          id: "4",
          src: "https://source.unsplash.com/random",
        },
        {
          id: "5",
          text: "This is a slide which has no purpose in life",
        },
      ];
    },
    // needs to be fetched from an external source
    featuredTopics() {
      return [
        "c",
        "python",
        "javascript",
        "machine learning",
        "data mining",
        "competitive programming",
        "economics",
        "extrapolatory data analysis",
      ];
    },
  },
  methods: {
    onUpdate() {
      this.$router.push({ name: "Search", query: { q: this.search } });
    },
  },
};
</script>
