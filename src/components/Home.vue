<template>
  <v-container class="px-0 py-0" fluid>
    <v-card
      fill-height
      tile
    >
      <v-app-bar
        color="primary"
        dark
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <!-- <v-toolbar-title>Home</v-toolbar-title> -->
        <!-- <v-spacer></v-spacer>
        <v-btn text icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar> -->
        <v-text-field
          flat
          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
          solo-inverted

        >
        </v-text-field>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :color="primary"
        app
      >
        <v-list
          nav
          class="py-0"
        >
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <router-link to = "/profile">
              <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/men/81.jpg">
              </v-list-item-avatar>
            </router-link>

            <v-list-item-content>
              <v-list-item-title>John Doe</v-list-item-title>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-card>
        <v-card-title>Featured Topics</v-card-title>
        <v-card-text>
          <v-chip-group
            active-class="blue white--text"
            column>
            <v-chip>c++</v-chip>
            <v-chip>python</v-chip>
            <v-chip>javascript</v-chip>
            <v-chip>machine learning</v-chip>
            <v-chip>data mining</v-chip>
            <v-chip>economics</v-chip>
            <v-chip>competitive programming</v-chip>
            <v-chip>extrapolatory analysis</v-chip>
          </v-chip-group>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card>
        <v-card-title>Featured Courses</v-card-title>
        <v-card-text>
          <VideoCarousel />
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card>
        <v-card-title>Live Learning</v-card-title>
        <v-card-text>
          <VideoCarousel />
        </v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>


<script>
  import VideoCarousel from './VideoCarousel';
  export default {
    components: {
      VideoCarousel
    },
    data () {
      return {
        drawer: false,
        items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'My Courses', icon: 'mdi-video'},
          { title: 'Settings', icon: 'mdi-cog'},
          { title: 'About', icon: 'mdi-help-box' },
        ],
        colors: [
          'primary',
          'secondary',
          'yellow darken-2',
          'red',
          'orange',
        ],
      }
    },
  }
</script>
