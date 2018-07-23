import units from './../../assets/js/UnitsModule'
var _ = require('underscore')._

 const state = {
    units: [],
    character_filters: {
        types: [
            {
                selected:false, 
                filter:'QCK',
                width:'width-4',
                active:''
            },
            {
                selected:false, 
                filter:'STR',
                width:'width-4',
                active:''
            },
            {
                selected:false, 
                filter:'DEX',
                width:'width-4',
                active:''
            },
            {
                selected:false, 
                filter:'PSY',
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'INT',
                width:'width-6',
                active:''
            }
        ],
        classes: [
            {
                selected:false, 
                filter:'Fighter',
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'Shooter',
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'Slasher',
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'Striker',
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'Free Spirit',
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'Powerhouse',
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'Cerebral',
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'Driven',
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'Evolver',
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'Booster',
                width:'width-6',
                active:''
            }
        ],
        stars:[
            {
                selected:false, 
                filter:'1',
                value:1,
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'2',
                value:2,
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'3',
                value:3,
                width:'width-6',
                active:''
            },
                {
                selected:false, 
                filter:'4',
                value:4,
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'5',
                value:5,
                width:'width-6',
                active:''
            },            
            {
                selected:false, 
                filter:'6',
                value:6,
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'5+',
                value:5,
                width:'width-6',
                active:''
            },
            {
                selected:false, 
                filter:'6+',
                value:6,
                width:'width-6',
                active:''
            }
        ]
    }
}
  
  const mutations = {
    CLEAR_FILTERS(state){
        _.forEach(state.character_filters, function(filters){
            for(let i=0; i<filters.length;i++){
                filters[i].selected=false;
                filters[i].active='';
            } 
        })
        this.commit('LOAD_UNITS')
    },
    ACTIVE_FILTER(state,payload){
        if ( payload.filter === "type"){
            state.character_filters.types[payload.index].selected = !state.character_filters.types[payload.index].selected;
            state.character_filters.types[payload.index].active = state.character_filters.types[payload.index].active ==='' ? 'active':'';
        }else if ( payload.filter === "class"){
            state.character_filters.classes[payload.index].selected = !state.character_filters.classes[payload.index].selected;
            state.character_filters.classes[payload.index].active = state.character_filters.classes[payload.index].active ==='' ? 'active':'';
        }else if ( payload.filter === "stars"){
            state.character_filters.stars[payload.index].selected = !state.character_filters.stars[payload.index].selected;
            state.character_filters.stars[payload.index].active = state.character_filters.stars[payload.index].active ==='' ? 'active':'';
        }
        //Filter throught units
        this.commit('LOAD_UNITS')
    },
    LOAD_UNITS(state){
        let filter = state.character_filters;

        state.units = _.filter(units.getUnits() , function(unit){
            let filtered = true;
            //Filter
            Object.keys(filter).forEach(function(key){
                for(let i=0; i<filter[key].length;i++){
                    if ( filter[key][i].selected === true){
                        switch(key){
                            case "types":
                                filtered = filtered && filter[key][i].filter === unit["type"]
                                break;
                            case "classes":
                                if ( unit["class"].split('/').length > 1 ){
                                    filtered = filtered && (filter[key][i].filter === unit["class"].split('/')[0] || 
                                                    filter[key][i].filter === unit["class"].split('/')[1]);
                                }else{
                                    filtered = filtered && filter[key][i].filter === unit["class"];
                                }
                                break;
                            case "stars":
                                if ( isNaN(unit["stars"]) ) 
                                    filtered = filtered && filter[key][i].filter === unit["stars"];
                                else 
                                    filtered = filtered && filter[key][i].value === unit["stars"];
                                break;
                        }
                    }
                } 
            })
        return filtered;
        });
    }
  }

 const getters = {
    getCharacterFilter(state){
        return state.character_filters
    },
    getUnits(state){
        return state.units
    }
} 

  export default {
    state,
    mutations,
    getters
  }