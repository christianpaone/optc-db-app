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
  async function download() {
    var https = require('https');
    var fs   = require('fs');
    var app  = require('electron').remote
    var files_names = ["units.js","details.js","units.js","cooldowns.js"]

    files_names.forEach(file_name => {
        var file = fs.createWriteStream("src/renderer/components/js/"+file_name);
      https.get("https://raw.githubusercontent.com/optc-db/optc-db.github.io/master/common/data/"+file_name, function(response) {
        response.pipe(file);
      });
    });
  }

  download();
</script>
