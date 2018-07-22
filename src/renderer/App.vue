<template>
<div id="app">
  <v-app :dark="theme">
    <v-navigation-drawer 
      v-model="drawer"
      v-show="characterDrawer"
      fixed
      temporary
      app>
        <CharacterFilters></CharacterFilters>
      </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawer=!drawer" v-show="!blockDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>OPTC-DB App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn 
          flat
          router-link :to="homeRoute">
        <v-icon left>home</v-icon>
        Home
        </v-btn>
        <v-btn
          flat
          @click.native="changeTheme">
          <v-icon>wb_sunny</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content >
    <v-slide-y-transition>
      <router-view></router-view>
    </v-slide-y-transition>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</div>
</template>

<script>
  import CharacterDrawer from './components/CharacterDrawer.vue'

  export default {
    name: 'optc-db-app',
    components:{
      "CharacterFilters":CharacterDrawer
    },
    data: function() {
      return {
        title: 'OPTC-DB App',
        homeRoute: '/',
        drawer: false
      }
    },
    computed:{
      theme(){
        return this.$store.getters.getTheme;
      },
      blockDrawer(){
        return this.$store.getters.getBlockDrawer;
      },
      characterDrawer(){
        return this.$store.getters.getCharacterDrawer;
      }
    },
    methods:{
      changeTheme:function(){
        this.$store.commit('CHANGE_THEME_MODE')
      },
      toggleDrawer:function(){
        this.$store.commit('TOGGLE_DRAWER')
      }
    }
  }
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
</style>
