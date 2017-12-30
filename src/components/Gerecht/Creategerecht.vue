<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="lighten-4--text lighten-4">Voeg een nieuw gerecht toe</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <form @submit.prevent="onCreateGerecht">
          <!-- titel -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field 
              name="title"
              label="Naam van gerecht"
              id="title"
              v-model="title"
              required></v-text-field>
            </v-flex>
          </v-layout>
          <!-- image -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <p>Foto van het gerecht</p>
              <v-btn raised clas="primary" @click="onPickImage">Upload image</v-btn>
              <input 
              type="file" 
              v-show="false" 
              ref="imageInput" 
              accept="image/*"
              @change="onFilePicked">
            </v-flex>
          </v-layout>
          <!-- image preview -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" alt="" width="100%">
            </v-flex>
          </v-layout>
          <!-- description -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field 
              name="description"
              label="Verhaal achter gerecht"
              id="description"
              v-model="description"              
              multi-line
              required></v-text-field>
            </v-flex>
          </v-layout>
          <!-- bereiding -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field 
              name="bereiding"
              label="Bereiding voor gerecht"
              id="bereiding"
              v-model="bereiding"              
              multi-line
              required></v-text-field>
            </v-flex>
          </v-layout>
          <!-- ingredienten -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field 
              name="ingredienten"
              label="ingredienten van gerecht"
              id="ingredienten"
              v-model="ingredienten"              
              multi-line
              required></v-text-field>
            </v-flex>
          </v-layout>
          <!-- video URL -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field 
              name="video"
              label="URL van video"
              id="video"
              v-model="video"              
              required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn :disabled="!formIsValid" type="submit">Voeg gerecht toe</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        description: '',
        imageUrl: '',
        ingredienten: '',
        bereiding: '',
        image: null,
        video: ''
      }
    },
    computed: {
      // kijken of alles is ingevuld op het form
      formIsValid () {
        return this.title !== '' &&
        this.description !== '' &&
        this.imageUrl !== '' &&
        this.ingredienten !== '' &&
        this.bereiding !== ''
      }
    },
    methods: {
      onCreateGerecht () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        // values uit het form
        const gerechtData = {
          title: this.title,
          description: this.description,
          ingredienten: this.ingredienten,
          bereiding: this.bereiding,
          data: this.sibmittedDataTime,
          image: this.image,
          video: this.video
        }
        // post de data
        this.$store.dispatch('createGerecht', gerechtData)
        // ga daarna naar gerechten pagina
        this.$router.push('/gerechten')
      },
      onPickImage () {
        this.$refs.imageInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Voeg een valide bestand toe!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>
