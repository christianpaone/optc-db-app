<template>
<v-container xs12>
  <v-spacer></v-spacer>
  <div>
      <v-text-field
        class="text-xs-right"
        v-model="search"
        placeholder="Search..."
        single-line
        append-icon="search"
        color="white"
        hide-details
        />
      <v-data-table
      :headers="headers"
      :items="unit_list"
      :search="search"
      :pagination.sync="pagination"
      hide-actions
      class="elevation-4"
      >
      <template slot="items" slot-scope="props">
        <tr @click.stop="
        setDetails(
          props.item.id,
          props.item.name,
          props.item.type,
          props.item.class,
          props.item.hp,
          props.item.atk,
          props.item.rcv,
          props.item.cost)">
          <td>{{ props.item.id }}</td>
          <td><img :src=props.item.image></td>
          <td><h3>{{props.item.name }}</h3></td>
          <td>{{ props.item.type }}</td>
          <td>{{ props.item.class }}</td>
          <td>{{ props.item.hp }}</td>
          <td>{{ props.item.atk }}</td>
          <td>{{ props.item.rcv }}</td>
          <td>{{ props.item.cost }}</td>
          <td>{{ props.item.stars }}</td>
        </tr>
      </template>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages" :total-visible="10"></v-pagination>
      </div>
       <v-dialog
      v-model="dialog"
      max-width="800px"
    >
      <v-card>
        <v-card-title class="headline white--text info">{{selected_details.name}}</v-card-title>
        <v-card-text>
          <v-flex row text-xs-center>
            <img :src=selected_details.image width="350px" height="300px">
          </v-flex>
          <v-flex row>
           Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
          </v-flex>
        </v-card-text>
      </v-card>
    </v-dialog>
    </div>
</v-container>
</template>

<script>
  var units  = require( './../js/units.js')
  var details  = require( './../js/details.js')
  var cooldowns  = require( './../js/cooldowns.js')

  export default {
    data: function() {
      return {
          dialog: false,
          selected_details:{
            image: '',
            id: '',
            type: '',
            clas: '',
            hp: '',
            atk: '',
            rcv: '',
            cost: '',
            slots: '',
            stars: ''
          },
          pagination: {
            rowsPerPage: 10
          },
          selected: [],
          search: '',
          unit_list: this.getUnitTable(),
          unit_details: details,
          headers: [
              {
                text: 'ID',
                value: 'id'
              },
              {
                text:''
              },
              {
                text: 'Name',
                align: 'left',
                value: 'name'          
              },
              { text: 'Type', value: 'type'},
              { text: 'Class', value: 'class' },
              { text: 'HP', value: 'hp' },
              { text: 'ATK', value: 'atk' },
              { text: 'RCV', value: 'rcv' },
              { text: 'Cost', value: 'cost' },  
              { text: 'Stars', value: 'stars' }
            ],
        }
      } ,
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    methods : {
      setDetails:function(id,name,type,clas, hp,atk,rcv,cost,slots,stars){
        this.selected_details.id=parseInt(id)
        this.selected_details.image="https://onepiece-treasurecruise.com/wp-content/uploads/c"+id+".png"
        this.selected_details.name = name
        this.selected_details.type = type
        this.selected_details.clas = clas
        this.selected_details.hp = hp
        this.selected_details.atk = atk
        this.selected_details.rcv = rcv
        this.selected_details.cost = cost
        this.selected_details.slots = slots
        this.selected_details.stars = stars
        this.dialog = !this.dialog
      },
      getUnitTable:function(){
        // [ "Name", "Type", [ "Class1", "Class2" ], Stars, Cost, Combo, Sockets, maxLVL, EXPToMax, lvl1HP, lvl1ATK, lvl1RCV, MAXHP, MAXATK, MAXRCV, Growth Rate ],
        let json = []
        let i = 1;
        window.units.forEach(element => {
          if(element[0] != "" && i < 5000){
            var str = "" + i++
            var pad = "0000"
            var ans = pad.substring(0, pad.length - str.length) + str
            let unit_table = {}
            unit_table["id"] = ans
            unit_table["name"] = element[0]
            let typ = element[1]
            unit_table["type"] = Array.isArray(typ) ? typ[0]+"/"+typ[1] : typ
            let cl = element[2]
            unit_table["class"]=  Array.isArray(cl) ? cl[0] +"/"+cl[1] : cl 
            unit_table["hp"] = element[12]
            unit_table["atk"] =  element[13]
            unit_table["rcv"] =  element[14]
            unit_table["cost"] =  element[4] 
            unit_table["slots"] = element[6]
            unit_table["stars"] =  element[3] 
            unit_table["image"] = "https://onepiece-treasurecruise.com/wp-content/uploads/f"+ans+".png"
            json.push(unit_table)
          }else{
            i++;
          }
        });
        return json
      }
    } 
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


</script>