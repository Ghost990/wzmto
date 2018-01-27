<template>
  <div class="row flight-selector-card">
    <div class="start-place col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <!--<v-select :onChange="firstSelected" v-model="startFlightSelected" label="shortName" :options="airports" ></v-select>-->
      <v-select :onChange="findByIata(startFlightSelected)" v-model="startFlightSelected" label="shortName" :options="airports" ></v-select>
      <!--<p>{{ startFlightSelected.connections }}</p>-->
      <!--<p>{{ isFirstSelected }}</p>-->
    </div>
    <div class="end-place col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <!--<v-select :disabled="!isFirstSelected" v-model="endFlightSelected"  label="availableCities" :options="availableCities" ></v-select>-->
      <v-select label="iata" :options="availableCities" ></v-select>
    </div>
    <br><br>
    <!--<button @click="findByIata">iata</button>-->
    <!--<p>{{ startFlightSelected.connections }}</p>-->
    <p>{{ findIata }}</p>
    <p>{{ availableCities }}</p>
    <!--<p>{{ findIata.shortName }}</p>-->
    <!--<div v-for="airport in airports">{{ airport.connections }}</div>-->
    <div v-for="iata in startFlightSelected.connections">{{ iata.iata }}</div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        airports: [],
        startFlightSelected: [],
        //endFlightSelected: null,
        isFirstSelected: false,
        findIata: []
      }
    },
    computed: {
      availableCities() {
        let availableConnections = this.startFlightSelected.connections;
        var obj = this.airports.find(function (obj) { return obj.iata === 'BUD'; });
        return this.startFlightSelected.connections;
      }
    },
    methods: {
      firstSelected(iata) {
        this.findByIata(iata)
        this.isFirstSelected = true;

      },
      findByIata(selectedCity) {
        for (let iata in selectedCity) {
          return this.findIata = iata.iata;
        }
        // var obj = this.airports.find(function (obj) { return obj.iata === iata; });
        // this.findIata = obj;

      }
    },
    created() {
      axios.get('https://mock-air.herokuapp.com/asset/stations')
        .then(response => {
          const data = response.data;
          let airportsArray = [];
          let connectionsArray = [];
          for (let key in data) {
            const airport = data[key];
            airportsArray.push(airport);
          }
          this.airports = airportsArray;
        })
        .catch(error => console.log(error))

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
