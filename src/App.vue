<template>
  <v-app>
    <!-- mobile nav -->
    <v-navigation-drawer temporary fixed v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list-tile 
          v-if="userIsAuthenticated" 
          @click="onLogout">
          <v-list-tile-action>
            <v-icon left>exit_to_app</v-icon>
          </v-list-tile-action>
        <v-list-tile-content>Logout</v-list-tile-content>
      </v-list-tile>
    </v-navigation-drawer>
    <!-- normale nav -->
    <v-toolbar class="primary">
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up "></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">History cooking</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          v-if="userIsAuthenticated"     
          flat
          @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        // icons als user niet is ingelogd
        let menuItems = [
          { icon: 'cake', title: 'Gerechten', link: '/gerechten' },
          { icon: 'face', title: 'Aanmelden', link: '/signup' },
          { icon: 'lock_open', title: 'Inloggen', link: '/signin' }
        ]
        // icons als user is ingelogd
        if (this.userIsAuthenticated) {
          menuItems = [
              { icon: 'cake', title: 'Gerechten', link: '/gerechten' },
              { icon: 'add_circle', title: 'Voeg gerecht toe', link: '/gerecht/new' },
              { icon: 'person', title: 'Account', link: '/profile' }
          ]
        }
        return menuItems
      },
      // kijk of user in ingelogd
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
