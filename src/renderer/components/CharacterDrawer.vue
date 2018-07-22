<template>
      <v-list class="nomargin">
        <v-list-tile class="clearFilters" @click="clearFilters">
          <v-list-tile-content>
            <v-list-tile-title  class="text-xs-center">CLEAR FILTERS</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
          <v-list-tile class="filterHeader" >
            <v-list-tile-title class="text-xs-center">Type Filters</v-list-tile-title>
          </v-list-tile>
            <v-flex
               v-for="(item,i) in Types"
               :key="i+'-type'"
               :class="item.width"
               @click="setTypeFilter(i)"
            >
                <v-list-tile class="filter" v-bind:class="item.filter+' '+item.active">    
                <v-list-tile-content>
                  <v-list-tile-title class="text-xs-center" v-text="item.filter"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
            </v-flex>
          <v-divider></v-divider>
           <v-list-tile class="filterHeader">
            <v-list-tile-title class="text-xs-center">Class Filters</v-list-tile-title>
          </v-list-tile>
          <v-flex
               v-for="(item,i) in Classes"
               :key="i+'-class'"
               :class="item.width"
               @click="setClassFilter(i)"
            >
                <v-list-tile class="filter classType" v-bind:class="item.filter+' '+item.active">    
                <v-list-tile-content>
                  <v-list-tile-title class="text-xs-center" v-text="item.filter"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
            </v-flex>
            <vue-stars 
              name="demo" 
              active-color="#ffdd00" 
              inactive-color="#999999" 
              shadow-color="#ffff00" 
              hover-color="#dddd00" 
              :max="5" :value="3" 
              :readonly="true" 
              :char="★" 
              :inactive-char="" 
              :class="" />
      </v-list>
</template>


<script>
export default {
    data:function(){
      return{
        name:'CharacterDrawer'
      }
    },
    computed:{
      Types:{
        get(){
          return this.$store.getters.getCharacterFilter.types;
        },
        set(i){
          this.$store.commit('ACTIVE_FILTER', {filter:"type",index:i});
        }
      },
      Classes:{
        get(){
          return this.$store.getters.getCharacterFilter.classes;
        },
        set(i){
          this.$store.commit('ACTIVE_FILTER', {filter:"class",index:i});
        }
      }
    },
    methods:{
      clearFilters:function(){
        this.$store.commit('CLEAR_FILTERS');
      },    
      setTypeFilter:function(i){
        this.Types = i;
      },
      setClassFilter:function(i){
        this.Classes = i;
      }
    }
}
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  @import url("./../assets/css/custom.css");
</style>
