<template>
    <v-card fill-height tile>
        <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>ED-APP</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
        temporary
        v-model="drawer"
        
        app
      >
        <v-list
          nav
          class="py-0"
        >
          <v-list-item v-if="userIsAuthenticated" two-line to = "/profile">
            
              <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/men/81.jpg">
              </v-list-item-avatar>
            

            <v-list-item-content >
              <v-list-item-title>{{user.firstName}}</v-list-item-title>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to = "item.link"
            link
          >

            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="userIsAuthenticated" @click="onLogout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
</template>

<script>
export default {
    data () {
      return {
        drawer: false,
        // items: [
        //   { title: 'Home', icon: 'mdi-home-city' },
        //   { title: 'My Account', icon: 'mdi-account' },
        //   { title: 'My Courses', icon: 'mdi-video'},
        //   { title: 'Settings', icon: 'mdi-cog'},
        //   { title: 'About', icon: 'mdi-help-box' },
        // ]
      
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      },
      userIsAuthenticated() {
        return this.$store.getters.user !== null &&
              this.$store.getters.user !== undefined
      },
      items() {
        let items = [
          {
            title: 'Home',
            icon: 'mdi-home-city',
            link: '/'
          },
          {
            title: 'Sign in',
            icon: 'mdi-home',
            link: '/signin'
          },
          {
            title: 'Sign up',
            icon: 'mdi-home',
            link: '/signup'
          },
          {
            title: 'About',
            icon: 'mdi-help-box',
            link: '/'
          }
        ]

        if (this.userIsAuthenticated) {
          items = [
            {
            title: 'Home',
            icon: 'mdi-home-city',
            link: '/'
          },
          {
            title: 'My Account',
            icon: 'mdi-account',
            link: '/profile'
          },
          {
            title: 'My courses',
            icon: 'mdi-video',
            link: '/'
          },
          {
            title: 'Settings',
            icon: 'mdi-cog',
            link: '/'
          },
          {
            title: 'About',
            icon: 'mdi-help-box',
            link: '/'
          }
          ]
        }
        return items
      }
    },
    methods: {
      
      onLogout() {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
}
</script>