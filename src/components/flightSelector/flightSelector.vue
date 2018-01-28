<template>
  <div class="row flight-selector-card">
    <div class="start-place col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <!--<v-select :onChange="firstSelected" v-model="startFlightSelected" label="shortName" :options="airports" ></v-select>-->
      <!--<v-select ref="firstSelect" :onChange="findByIata" v-model="startFlightSelected" label="shortName" :options="airports" ></v-select>-->
      <v-select :onChange="selectedConnect" :options="airports" label="shortName" v-model="selected">
        <template slot="option" slot-scope="option">
          <span class="fa" :class="option.icon"></span>
          {{ option.shortName }}
        </template>
      </v-select>
      <!--<p>{{ startFlightSelected.connections }}</p>-->
      <!--<p>{{ isFirstSelected }}</p>-->
    </div>
    <div class="end-place col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <!--<v-select :disabled="!isFirstSelected" v-model="endFlightSelected"  label="availableCities" :options="availableCities" ></v-select>-->
      <!--<v-select label="shortName" :options="dict" ></v-select>-->
      <v-select :options="selectedConnections" label="iata">
        <template slot="option" slot-scope="option">
          <span class="fa" :class="option.icon"></span>
          {{ option.iata }}
        </template>
      </v-select>
    </div>
    <br><br>
    <!--<button @click="findByIata">iata</button>-->
    <!--<p>{{ startFlightSelected.connections }}</p>-->

    <!--<p>{{ selectedConnections }}</p>-->
    <div v-for="select in selectedConnections">
      <p>{{ fulls(select.iata).shortName }}</p>
    </div>

    <!--<p>{{ dict }}</p>-->
    <!--<p>{{ findIata.shortName }}</p>-->
    <!--<div v-for="airport in airports">{{ airport.connections }}</div>-->
    <div>
      <p>{{ findIata }}</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        selected: {},
        selectedConnections: [],
        longList: [],
        airports: [],
        startFlightSelected: {},
        //endFlightSelected: null,
        isFirstSelected: false,
        findIata: [],
        savedInIatas: [],
        dict: [],
        objectArr: [],
        selectedIata: [],
        inSaved: [],
        objs: [
          {iata: 'BUD', shortName: 'Budapest'},
          {iata: 'LON', shortName: 'London'}
        ]
      }
    },
    computed: {
      selectedConnect() {
        let vm = this;
        vm.selectedConnections = vm.selected.connections;

      },
      getIata() {

      },
      change() {
        let vm = this;
        let str = JSON.stringify(vm.startFlightSelected.connections)
        console.log(str);

      },
      availableCities() {
        let availableConnections = this.startFlightSelected.connections;
        //var obj = this.dict.find(function (obj) { return obj.iata === 'BUD'; });
        let objArr = [];

        for (let object in availableConnections) {
          var obj = this.dict.find(function (obj) { return obj.iata === object.iata; });
          objArr.push(obj)
        }

        this.objectArr = objArr;

        return this.startFlightSelected.connections;
      },
      longName() {
        let vm = this;
        let selI = [];
        let savedIad = [];
        // for (let iata in this.startFlightSelected.connections) {
        //     let iataData = iata.iata;
        //     selI.push(iataData);
        //     for (let sel in selI) {
        //       let found = vm.airports.find(x => x.iata === sel);
        //       savedIad.push(found);
        //       console.log(found)
        //     }
        // }

        var found = vm.dict.find(function(element) {
          return element.iata === 'BUD';
        });




        return found.shortName;
      }
    },
    methods: {
      fulls(iata) {
        let vm = this;
        return vm.airports.find(x => x.iata === iata);


        // let found = vm.airports.find(x => x.iata === 'BUD');

      },
      firstSelected(iata) {
        this.findByIata(iata)
        this.isFirstSelected = true;

      },
      findByIata() {
        console.log(this.$refs.firstSelect.options);
      }
    },
    created() {
      axios.get('https://mock-air.herokuapp.com/asset/stations')
        .then(response => {
          const data = response.data;
          let airportsArray = [];
          let dictArray = [];
          let connectionsArray = [];
          for (let key in data) {
            const airport = data[key];
            airportsArray.push(airport);
            let locDict = {
              iata: airport.iata,
              shortName: airport.shortName
            };
            dictArray.push(locDict);
          }
          this.airports = airportsArray;
          this.dict = dictArray;

        })
        .catch(error => console.log(error));
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/partials/variables";
  @import "../../styles/bootstrap/bootstrap";


  .flight-selector-card {
    border-radius: 3px;
    background: white;
    box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
  }

</style>
