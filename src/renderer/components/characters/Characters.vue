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
        <tr @click.stop="selected_details=getUnitDetails(props.item.id)">
          <td>{{ props.item.id }}</td>
          <td><v-avatar size="70px" tile="true"><img :src=props.item.image></v-avatar></td>
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
        max-width="800px" fullscreen hide-overlay transition="dialog-bottom-transition"
        >
      <v-card>
        <v-toolbar dark class="white--text primary" >
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{selected_details.name}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div>
            <v-flex text-xs-center>
              <img :src=selected_details.image width="350px" height="300px">
            </v-flex>
            <v-flex text-xs-center text-sm-center text-md-left text-lg-left><h1>Details</h1></v-flex>
            <v-divider></v-divider>
            <v-flex row>
              <v-list three-line subheader>
                  <v-list-tile avatar>
                    <v-list-tile-content>
                      <v-list-tile-title><h2>Class</h2></v-list-tile-title>
                      <v-list-tile-sub-title><h3>{{selected_details.class}}</h3></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-content>
                      <v-list-tile-title><h2>Type</h2></v-list-tile-title>
                      <v-list-tile-sub-title><h3>{{selected_details.type}}</h3></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-content>
                      <v-list-tile-title><h2>Stars</h2></v-list-tile-title>
                      <v-list-tile-sub-title><h3>{{selected_details.stars}}</h3></v-list-tile-sub-title>
                    </v-list-tile-content>                    
                    <v-list-tile-content>
                      <v-list-tile-title><h2>Cost</h2></v-list-tile-title>
                      <v-list-tile-sub-title><h3>{{selected_details.cost}}</h3></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile avatar>
                  </v-list-tile>
                </v-list>
            </v-flex>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    </div>
</v-container>
</template>

<script>
  import UnitsModule from './../../assets/js/UnitsModule'
  export default {
    data: function() {
      return {
          dialog: false,
          selected_details:'',
          pagination: {
            rowsPerPage: 10
          },
          selected: [],
          search: '',
          unit_list: UnitsModule.getUnits(),
          headers: [
              {
                text: 'ID',
                value: 'id'
              },
              {
                text:'',
                value:'image'
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
      getUnitDetails:function(id){
        this.dialog = !this.dialog
        return UnitsModule.getUnitDetails(id)
      }
    } 
  }



</script>

<style scoped>
  .STR   { background: salmon; }
.QCK   { background: lightskyblue; }
.DEX   { background: lightgreen; }
.PSY   { background: gold; }
.INT   { background: orchid; }
.RCV   { background: darkgoldenrod; }
.TND   { background: peru; }
.BLOCK { background: darkslateblue; }
.BOMB  { background: maroon; }
.RAINBOW { background: linear-gradient(90deg,#fa8072,#ffd700,#90ee90,#87cefa, #da70d6); }
.G     { background: orange; }
.EMPTY { background: #777; }

</style>
