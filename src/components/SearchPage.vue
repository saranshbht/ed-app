<template>
	<v-container class="px-0 py-0" fluid>
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
					:color="primary"
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
									<v-checkbox></v-checkbox>
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
									<v-checkbox></v-checkbox>
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
									<v-checkbox></v-checkbox>
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
			<v-card>
				<v-row align="center">
					<v-col class="col-4">
						<v-img
							src="https://source.unsplash.com/klMii3cR9iI"
							height="200"
							cover>
						</v-img>
					</v-col>
					<v-col class="col-8 px-0">
						<v-card-title>Introduction to Javascript</v-card-title>
						<v-card-text>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua.
						<v-rating
							:value="4.5"
							color="amber"
							dense
							half-increments
							readonly
							size="14">
						</v-rating>
						4.5 (4130) | 12K students enrolled
						</v-card-text>
					</v-col>
				</v-row>
			</v-card>

			<v-card>
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
			</v-card>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>

  export default {
    data: () => ({
      sort_items: ['Top Rated', 'Newest Added', 'Duration', 'Students Enrolled'],
      selection: [],
      topics: ['C++', 'Python', 'Machine Learning'],
      languages: ['English','Hindi', 'Spanish'],
      levels: ['Beginner', 'Intermediate', 'Expert'],
      drawer: false
      // value: ['foo', 'bar', 'fizz', 'buzz'],
    }),
  }
</script>
<style scoped>
  .v-card__title {
    word-break: break-word
  }
</style>
