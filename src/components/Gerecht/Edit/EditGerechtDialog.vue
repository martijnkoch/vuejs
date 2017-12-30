<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                       <v-card-title>Edit gerecht</v-card-title> 
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field 
                              name="title"
                              label="Naam van gerecht"
                              id="title"
                              v-model="editedTitle"
                              required>
                            </v-text-field>
                            <v-text-field 
                              name="description"
                              label="Verhaal achter gerecht"
                              id="description"  
                              v-model="editedDescription"
                              multi-line
                              required>
                            </v-text-field>
                            <v-text-field 
                              name="ingredienten"
                              label="ingredienten van gerecht"
                              v-model="editedIngredienten"
                              id="ingredienten"            
                              multi-line
                              required>
                            </v-text-field>
                            <v-text-field 
                              name="bereiding"
                              label="Bereiding voor gerecht"
                              id="bereiding" 
                              v-model="editedBereiding"
                              multi-line
                              required>
                            </v-text-field>
                            <v-text-field 
                              name="video"
                              label="video van gerecht"
                              v-model="editedVideo"
                              id="video"            
                              required>
                            </v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-actions>
                                <v-btn flat class="blue--text darken-1" @click="editDialog = false">Annuleren</v-btn>
                                <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Bevestigen</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
            </v-container>    
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
      // gerecht laden
      props: ['gerecht'],
      data () {
        return {
          editDialog: false,
          editedTitle: this.gerecht.title,
          editedDescription: this.gerecht.description,
          editedIngredienten: this.gerecht.ingredienten,
          editedBereiding: this.gerecht.bereiding,
          editedVideo: this.gerecht.video
        }
      },
      methods: {
        // haal gewijzigde data op en stuur naar store
        onSaveChanges () {
          if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '' || this.editedIngredienten.trim() === '' || this.editedBereiding.trim() === '' || this.editedVideo.trim() === '') {
            return
          }
          this.editDialog = false
          this.$store.dispatch('updateGerechtData', {
            id: this.gerecht.id,
            title: this.editedTitle,
            description: this.editedDescription,
            ingredienten: this.editedIngredienten,
            bereiding: this.editedBereiding,
            video: this.editedVideo
          })
        }
      }
    }
</script>
