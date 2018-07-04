<template>
  <v-container>
  <v-flex xs4 offset-xs4>
    <v-btn 
      router 
      :to="section.to"
      :key="i"
      v-for="(section, i) in sections"
      large 
      v-text="section.title"
      v-bind:style="section.style"
      class="white--text">
    </v-btn>
  </v-flex>
  </v-container>
</template>
<script>
  export default {
    data:() => ({
      sections:[
        { style: { backgroundColor: 'green', width: '100%' }, title: 'Character Table', to: '/characters' },
        { style: { backgroundColor: 'blue', width: '100%'}, title: 'Damage Calculator', to: '/' },
        { style: { backgroundColor: 'orange', width: '100%'}, title: 'Drop Table', to: '/' },
        { style: { backgroundColor: 'red', width: '100%'}, title: 'Evolution Helper', to: '/' },
        { style: { backgroundColor: 'purple', width: '100%'}, title: 'Slot Planner', to: '/' }
      ]
    })
  }
</script>
