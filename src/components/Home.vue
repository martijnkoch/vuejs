<template>
  <v-container>
    <v-layout>
      <v-flex xs 12 class="text-xs-center">
         <v-progress-circular indeterminate color="primary" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
            v-for="gerecht in gerechten"
            :src="gerecht.imageUrl"
            :key="gerecht.id"
            @click="onLoadGerecht(gerecht.id)">
            <div class="title">
              {{ gerecht.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
	<v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/gerechten" class="info">Bekijk gerechten</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/gerecht/new" class="info">Voeg gerecht toe</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      gerechten () {
        return this.$store.getters.featuredGerechten
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadGerecht (id) {
        this.$router.push('/gerechten/' + id)
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
