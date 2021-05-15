<template>
  <v-container v-if="!loading" class="px-0 py-0" fluid>
    <v-card fill-height flat tile class="mx-0">
      <v-card-title class="primary lighten-1">
        <v-text-field
          flat
          hide-details
          label="Search"
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          solo
          @keydown.enter="onSearch()"
        >
        </v-text-field>
      </v-card-title>

      <v-navigation-drawer v-model="drawer" temporary app>
        <v-list>
          <v-list-item-group multiple>
            <div class="title py-2 px-3">Topics</div>
            <v-list-item v-for="(topic, i) in filter_topics" :key="i">
              <v-list-item-action>
                <v-checkbox
                  v-model="selected['topics'][i]"
                  :value="topic"
                  @click="applyFilter"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-title>
                {{ topic }}
              </v-list-item-title>
            </v-list-item>
            <!-- <v-chip class="mx-2 my-2 subtitle-1">
              More
              <v-icon right>mdi-chevron-double-down</v-icon>
            </v-chip> -->
            <v-divider></v-divider>
          </v-list-item-group>
          <v-list-item-group multiple>
            <div class="title py-2 px-3">Levels</div>
            <v-list-item v-for="(level, i) in filter_levels" :key="i">
              <v-list-item-action>
                <v-checkbox
                  v-model="selected['levels'][i]"
                  :value="level"
                  @click="applyFilter"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-title>
                {{ level }}
              </v-list-item-title>
            </v-list-item>
            <!-- <v-chip class="mx-2 my-2 subtitle-1">
              More
              <v-icon right>mdi-chevron-double-down</v-icon>
            </v-chip> -->
            <v-divider></v-divider>
          </v-list-item-group>
          <v-list-item-group multiple>
            <div class="title py-2 px-3">Languages</div>
            <v-list-item v-for="(language, i) in filter_languages" :key="i">
              <v-list-item-action>
                <v-checkbox
                  v-model="selected['languages'][i]"
                  :value="language"
                  @click="applyFilter"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-title>
                {{ language }}
              </v-list-item-title>
            </v-list-item>
            <!-- <v-chip class="mx-2 my-2 subtitle-1">
              More
              <v-icon right>mdi-chevron-double-down</v-icon>
            </v-chip> -->
            <v-divider></v-divider>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-card-text>
        <div class="text-h4">Top Searches</div>
        <v-chip-group column>
          <v-chip
            v-for="(term, i) in topSearches"
            :key="i"
            :to="'/search?q=' + term"
          >
            {{ term }}
          </v-chip>
        </v-chip-group>

        <v-divider></v-divider>

        <v-row>
          <v-col align-self="center" cols="6">
            <div class="text-center">
              <v-btn large primary @click="drawer = true">
                <v-icon left>mdi-filter</v-icon>
                Filter
              </v-btn>
            </div>
          </v-col>

          <v-col>
            <v-select
              label="Sort By"
              prepend-icon="mdi-sort"
              :items="sortParameters"
            >
            </v-select>
          </v-col>
        </v-row>

        <div v-if="!courses || !courses.length" class="text-center">
          No courses available
        </div>
        <course-card
          v-else
          v-for="course in courses"
          :key="course.id"
          :course="course"
        ></course-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import CourseCard from "@/components/CourseCard";
import { cloneDeep } from "lodash";

export default {
  components: { CourseCard },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },

    courses() {
      // console.log(this.filteredCourses);
      if (this.filteredCourses) {
        return this.filteredCourses;
      }
      return this.allCourses;
    },

    allCourses() {
      return cloneDeep(this.$store.getters.courses);
    },

    // needs to be fetched from an external source
    topSearches() {
      return ["c", "python", "javascript", "machine learning", "data mining"];
    },

    // needs to be fetched from an external source
    sortParameters() {
      return ["Top Rated", "Newest Added", "Duration", "Students Enrolled"];
    },

    // needs to be fetched from an external source
    filter_topics() {
      return ["C", "Python", "Machine Learning"];
    },

    // needs to be fetched from an external source
    filter_languages() {
      return ["English", "Hindi", "Spanish"];
    },

    // needs to be fetched from an external source
    filter_levels() {
      return ["Beginner", "Intermediate", "Expert"];
    },
  },

  data: () => ({
    filteredCourses: null,
    drawer: false,
    search: "",
    selected: {
      topics: [],
      levels: [],
      languages: [],
    },
  }),

  methods: {
    applyFilter() {
      let filters = {};
      // console.log(this.selected);
      for (let filter in this.selected) {
        let filter_string = this.selected[filter].filter((x) => x).join();
        if (filter_string) {
          filters[filter] = filter_string;
        }
      }

      // console.log(filters);
      // filter courses based on filters applied by user
      this.filteredCourses = cloneDeep(this.allCourses);
      for (let filter in filters) {
        this.filteredCourses = this.filteredCourses.filter(
          (obj) => obj[filter] == filters[filter]
        );
      }
      // console.log(this.filteredCourses);
    },
    onSearch() {
      if (this.$route.query.q !== this.search) {
        // console.log("searched:", this.search);
        this.$router.push({ query: { q: this.search } });
      }
    },
  },
  async created() {
    this.search = this.$route.query.q || "";
    while (!this.allCourses) await new Promise((r) => setTimeout(r, 50));
    this.filteredCourses = cloneDeep(this.allCourses);
    // filter courses based on query/search string
    this.filteredCourses = this.filteredCourses.filter(
      (obj) =>
        (obj["title"] || "")
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        (obj["description"] || "")
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        (obj["topics"] || "").toLowerCase().includes(this.search.toLowerCase())
    );
    // console.log(this.filteredCourses);
  },
};
</script>
<style scoped>
.v-card__title {
  word-break: break-word;
}
</style>
