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
      :items="Units"
      :search="search"
      :pagination.sync="pagination"
      hide-actions
      class="elevation-4 hidden-md-and-down"
      >
      <template slot="items" slot-scope="props">
        <tr @click.stop="selected_details=getUnitDetails(props.item.id)">
          <td>{{ props.item.id }}</td>
          <td><v-avatar size="70px" tile><img :src=props.item.image></v-avatar></td>
          <td><h3>{{props.item.name }}</h3></td>
          <td><b>{{ props.item.type }}</b></td>
          <td><b>{{ props.item.class }}</b></td>
          <td><b>{{ props.item.hp }}</b></td>
          <td><b>{{ props.item.atk }}</b></td>
          <td><b>{{ props.item.rcv }}</b></td>
          <td><b>{{ props.item.cost }}</b></td>
          <td><b>{{ props.item.stars }}</b></td>
        </tr>
      </template>
    </v-data-table>
    <v-data-table
      :headers="headersMini"
      :items="Units"
      :search="search"
      :pagination.sync="pagination"
      hide-actions
      disable-initial-sort
      class="elevation-4 hidden-lg-and-up" 
      >
      <template slot="items" slot-scope="props">
        <tr @click.stop="selected_details=getUnitDetails(props.item.id)" >
              <v-flex xs12>
                <v-card>
                  <v-container fluid grid-list-lg>
                    <v-layout row>
                      <v-flex xs4>
                        <v-card-media
                          :src="props.item.image"
                          height="150px"
                          contain
                        ></v-card-media>
                      </v-flex>
                      <v-flex xs8>
                        <div>
                          <div class="headline">{{props.item.name}}</div>
                          <v-divider></v-divider>
                          <div>
                            <v-spacer></v-spacer>
                            <v-layout row>
                              <v-flex xs4>
                                <h2>HP</h2>
                              </v-flex>
                              <v-flex xs8>
                                <h2>{{props.item.hp}}</h2>
                              </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-layout row>
                              <v-flex xs4>
                                <h2>ATK</h2>
                              </v-flex>
                              <v-flex xs8>
                                <h2>{{props.item.atk}}</h2>
                              </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-layout row>
                              <v-flex xs4>
                                <h2>RCV</h2>
                              </v-flex>
                              <v-flex xs8>
                                <h2>{{props.item.rcv}}</h2>
                              </v-flex>
                            </v-layout>
                          </div>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
          </tr>
      </template>
    </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages" :total-visible="8"></v-pagination>
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
export default {
  mounted: function() {
    this.activateDrawer();
    this.$store.commit("LOAD_UNITS");
  },
  data: function() {
    return {
      dialog: false,
      selected_details: "",
      pagination: {
        rowsPerPage: 10,
        page: 1
      },
      search: "",
      selected: [],
      headersMini: [
        {
          text: "Character",
          align: "center",
          value: "name"
        }
      ],
      headers: [
        {
          text: "ID",
          value: "id"
        },
        {
          text: "",
          value: "image"
        },
        {
          text: "Name",
          align: "left",
          value: "name"
        },
        { text: "Type", value: "type" },
        { text: "Class", value: "class" },
        { text: "HP", value: "hp" },
        { text: "ATK", value: "atk" },
        { text: "RCV", value: "rcv" },
        { text: "Cost", value: "cost" },
        { text: "Stars", value: "stars" }
      ]
    };
  },
  computed: {
    Units() {
      return this.$store.getters.getUnits;
    },
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;
      return Math.ceil(this.Units.length / this.pagination.rowsPerPage);
    },
    limitedItems() {
      return this.unit_list.slice(
        (this.pagination.page - 1) * this.pagination.rowsPerPage,
        this.pagination.page * this.pagination.rowsPerPage
      );
    }
  },
  methods: {
    getUnitDetails: function(id) {
      this.dialog = !this.dialog;
      return UnitsModule.getUnitDetails(id);
    },
    activateDrawer: function() {
      this.$store.commit("SET_BLOCK_DRAWER", false);
      this.$store.commit("SET_CHARACTER_DRAWER", true);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
@import url("./../../assets/css/custom.css");
</style>
