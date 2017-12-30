<template>
    <v-container>
        <v-layout row wrap v-if="loading">
          <v-flex xs 12 class="text-xs-center">
             <v-progress-circular indeterminate color="primary" :width="7" :size="70" v-if="loading"></v-progress-circular>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-else>
            <v-flex xs12 sm12 md6 offset-sm3>
                <v-card xs12 sm12 md6 offset-sm3>
                    <v-card-title>
                       <h3 class="blue--text">{{ gerecht.title }}</h3>
                        <template v-if="userIsCreator">
                            <v-spacer></v-spacer>
                            <app-edit-gerecht-dialog :gerecht="gerecht"></app-edit-gerecht-dialog>
                        </template>
                    </v-card-title>
                        <v-card-media :src="gerecht.imageUrl" height="400px">
                        </v-card-media>
                        <v-card-text>
                            <div class="mb-4">{{ gerecht.date }}</div>
                            <h6 class="blue--text">Verhaal achter het gerecht</h6>
                            <div class="mb-4">{{ gerecht.description }}</div>
                            <h6 class="blue--text">Ingrediënten </h6>
                            <div class="mb-4"> {{ gerecht.ingredienten }}</div>
                            <h6 class="blue--text">Bereiding</h6>
                            <div class="mb-4">{{ gerecht.bereiding }}</div>
                            <h6 class="blue--text">Video</h6>
                            <div class="videoWrapper">
                                <video controls loop>
                                    <source :src="gerecht.video" type="video/mp4">
                                    <p>
                                    Your browser doesn't support HTML5 video.
                                    </p>
                                  </video>
                            </div>
                        </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
      data () {
        return {
        }
      },
      props: ['id'],
      computed: {
        gerecht () {
          return this.$store.getters.loadedGerecht(this.id)
        },
        userIsAuthenticated () {
          return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userIsCreator () {
          if (!this.userIsAuthenticated) {
            return false
          }
          return this.$store.getters.user.id === this.gerecht.creatorId
        },
        loading () {
          return this.$store.getters.loading
        }
      }
    }
</script>
