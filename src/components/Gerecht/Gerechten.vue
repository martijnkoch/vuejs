<template>
    <v-container>
    <v-layout v-for="gerecht in gerechten" :key="gerecht.id" class="mb-4">
      <v-flex lg10 xs12 sm12 offset-sm1>
        <v-card>
          <v-card-media :src="gerecht.imageUrl" height="500px" :to="/gerechten/ + gerecht.id" class="cursor: pointer;">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h4 class="blue--text">{{ gerecht.title }}</h4>
              <div>{{ gerecht.description }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" :to="/gerechten/ + gerecht.id">
                <v-icon left>arrow_forward</v-icon>Leer meer</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
</template>
<script>
    export default {
      computed: {
        gerechten () {
          return this.$store.getters.loadedGerechten
        }
      }
    }
</script>
