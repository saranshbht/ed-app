<template>
  <v-row class="justify-center">
    <v-col xs="12" sm="6">
      <v-carousel>
        <v-carousel-item v-for="(item, i) in items" :key="item.id">
          <v-row class="fill-height no-gutters" align="center" justify="center">
            <v-img v-if="item.src" :src="item.src" height="100%" width="100%">
              <template v-slot:placeholder> <Loading /> </template
            ></v-img>
            <div
              v-else-if="item.content"
              class="video-element"
              v-html="item.content"
            ></div>
            <v-sheet
              v-else
              :color="colors[i]"
              height="100%"
              width="100%"
              class="d-flex align-center justify-center"
              tile
            >
              <div class="text-h2 text-center" v-html="item.text"></div>
            </v-sheet>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script>
import Loading from "@/components/Loading";
export default {
  components: {
    Loading,
  },
  props: ["items"],
  data() {
    return {
      colors: ["secondary", "yellow darken-2", "red", "orange", "primary"],
    };
  },
};
</script>

<style scoped>
.video-element {
  height: 100%;
  width: 100%;
}
</style>
