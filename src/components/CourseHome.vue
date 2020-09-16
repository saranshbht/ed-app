<template>
<v-container fluid fill-height>
  <v-card
    :loading="loading"
    class="mx-auto my-5"
  >
    <v-img
      height="50vh"
      src="https://source.unsplash.com/klMii3cR9iI"
    ></v-img>
    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        @click="reserve"
      >
        Subscribe
      </v-btn>
    </v-card-actions>

    <v-card-title>Introduction to Javascript</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">4.5 (4130) | 12K students enrolled</div>
      </v-row>

      <div class="my-4 subtitle-1">
        John Doe
        <div class="subtitle-2">Author</div>
      </div>

      <div>In this course, we'll look at the JavaScript language, and how it supports the Object-Oriented pattern, with a focus on the unique aspect of how JavaScript approaches OO. We'll explore a brief introduction to the jQuery library, which is widely used to do in-browser manipulation of the Document Object Model (DOM) and event handling.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Playlist</v-card-title>

    <v-card-text>
      <VideoCarousel />
    </v-card-text>


  </v-card>
</v-container>
</template>


<script>
  import VideoCarousel from './VideoCarousel';

  export default {
    components: {
      // HelloWorld,
      VideoCarousel
    },

    data: () => ({
      loading: false,
      selection: 1,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>
