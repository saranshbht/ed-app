<template>
	<v-container v-if="!loading" class="px-0 py-0" fluid>
		<v-card fill-height tile class="mx-0">
			<v-app-bar color="primary" dark>
				<v-text-field
					flat
					hide-details
					label="Search"
					prepend-inner-icon="mdi-magnify"
					solo-inverted
					value="javascript"
				>
				</v-text-field>
			</v-app-bar>
				<v-navigation-drawer
					v-model="drawer"
					temporary
					app>
					<v-list>
						<v-list-item-group multiple>
							<div class="title py-2 px-3">
								Topics
							</div>
							<v-list-item
								v-for="(item, i) in topics"
								:key="i">
								<v-list-item-action>
									<v-checkbox @click="applyFilter('topic', item)"></v-checkbox>
								</v-list-item-action>
								<v-list-item-title>
									{{ item }}
								</v-list-item-title>
							</v-list-item>
							<v-chip class="mx-2 my-2 subtitle-1">
								More
								<v-icon right>mdi-chevron-double-down</v-icon>
							</v-chip>
							<v-divider></v-divider>
						</v-list-item-group>
						<v-list-item-group multiple>
							<div class="title py-2 px-3">
								Levels
							</div>
							<v-list-item
								v-for="(item, i) in levels"
								:key="i">
								<v-list-item-action>
									<v-checkbox @click="applyFilter('level', item)"></v-checkbox>
								</v-list-item-action>
								<v-list-item-title>
									{{ item }}
								</v-list-item-title>
							</v-list-item>
							<v-chip class="mx-2 my-2 subtitle-1">
								More
								<v-icon right>mdi-chevron-double-down</v-icon>
							</v-chip>
							<v-divider></v-divider>
						</v-list-item-group>
						<v-list-item-group multiple>
							<div class="title py-2 px-3">
								Languages
							</div>
							<v-list-item
								v-for="(item, i) in languages"
								:key="i">
								<v-list-item-action>
									<v-checkbox @click="applyFilter('language', item)"></v-checkbox>
								</v-list-item-action>
								<v-list-item-title>
									{{ item }}
								</v-list-item-title>
							</v-list-item>
							<v-chip class="mx-2 my-2 subtitle-1">
								More
								<v-icon right>mdi-chevron-double-down</v-icon>
							</v-chip>
							<v-divider></v-divider>
						</v-list-item-group>
					</v-list>
				</v-navigation-drawer>
			<v-card-title>
				Top Searches
			</v-card-title>
			<v-card-text>
				<v-chip-group column>
					<v-chip>c++</v-chip>
					<v-chip>python</v-chip>
					<v-chip>javascript</v-chip>
					<v-chip>machine learning</v-chip>
					<v-chip>data mining</v-chip>
				</v-chip-group>
				<v-divider></v-divider>
			<v-row>
				<v-col>
					<v-card-title>
						<v-btn primary @click="drawer = true">
							<v-icon left>mdi-filter</v-icon>
							Filter
						</v-btn>
					</v-card-title>
				</v-col>
				<v-col>
					<v-select
						label="Sort By"
						prepend-icon="mdi-sort"
						:items="sort_items">
					</v-select>
				</v-col>
			</v-row>
			<v-card
				v-for="course in courses"
				:key = "course.id"
			>
				<v-row align="center">
					<v-col class="col-4">
						<v-img
							:src="course.imageUrl"
							height="200"
							cover>
						</v-img>
					</v-col>
					<v-col class="col-8 px-0">
						<v-card-title>{{course.title}}</v-card-title>
						<v-card-text>
							{{course.description}}
						<v-rating
							:value="course.rating"
							color="amber"
							dense
							half-increments
							readonly
							size="14">
						</v-rating>
						{{course.rating}} ({{course.raters}}) | {{course.students}} students enrolled
						</v-card-text>
					</v-col>
				</v-row>
			</v-card>

			<!-- <v-card>
				<v-row align="center">
					<v-col class="col-4">
						<v-img
							src="https://source.unsplash.com/i25aqE_YUZs"
							height="200"
							cover>
						</v-img>
					</v-col>
					<v-col class="col-8 px-0">
						<v-card-title>Web Design for Everybody</v-card-title>
						<v-card-text>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua.
						<v-rating
							:value="3.9"
							color="amber"
							dense
							half-increments
							readonly
							size="14">
						</v-rating>
						3.9 (14130) | 20K students enrolled
						</v-card-text>
					</v-col>
				</v-row>
			</v-card> -->
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>

  export default {
	computed: {
		loading() {
			return this.$store.getters.loading
		},
		courses() {
			console.log('hello')
			if (Object.keys(this.filteredCourses).length !== 0) {
				return this.filteredCourses
			}
			return this.allCourses
		},
		allCourses() {
			return this.$store.getters.courses
		}
	},
    data: () => ({
		filteredCourses: {},
      sort_items: ['Top Rated', 'Newest Added', 'Duration', 'Students Enrolled'],
      filters: {},
      topics: ['C++', 'Python', 'Machine Learning'],
      languages: ['English','Hindi', 'Spanish'],
      levels: ['Beginner', 'Intermediate', 'Expert'],
      drawer: false,
      // value: ['foo', 'bar', 'fizz', 'buzz'],
	}),
	
	methods: {
		applyFilter(filter, value) {
			
			this.filters[filter] = value
		
			// const filteredCourses = {}
			for (let course in this.allCourses) {
				let flag = true
				
				
				for (let key in this.filters) {
					if (this.allCourses[course][key] !== this.filters[key]) {
						flag = false
						break
					}
					console.log(flag)
					if (flag) {
						console.log('updated')
						this.filteredCourses[course] = this.allCourses[course][key]
					}
				}
			}
			// this.courses = filteredCourses
		
		}
	}
  }
</script>
<style scoped>
  .v-card__title {
    word-break: break-word
  }
</style>
