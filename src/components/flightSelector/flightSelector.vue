<template>
  <div class="row flight-selector-card">
    <div class="start-place col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <!--<v-select :onChange="firstSelected" v-model="startFlightSelected" label="shortName" :options="airports" ></v-select>-->
      <!--<v-select ref="firstSelect" :onChange="findByIata" v-model="startFlightSelected" label="shortName" :options="airports" ></v-select>-->
      <!--<v-select :onChange="selectedConnect" :options="airports" label="shortName" v-model="selected">-->
        <!--<template slot="option" slot-scope="option">-->
          <!--<span class="fa" :class="option.icon"></span>-->
          <!--{{ option.shortName }}-->
        <!--</template>-->
      <!--</v-select>-->

      <!--<b-form-select v-on:change="selectedConnect" v-model="selected" class="mb-3">-->
        <!--<option :value="null">Please select an option</option>-->
        <!--<option v-for="select in airports" value="">{{ fulls(select.iata).shortName }}</option>-->
      <!--</b-form-select>-->
      <!--<div>Selected: <strong>{{ selected }}</strong></div>-->

      <!--<select v-model="selected" name="" id="">-->
        <!--<option v-for="select in airports" value="">{{ fulls(select.iata).shortName }}</option>-->
      <!--</select>-->
      <!--<p>{{ selected }}</p>-->

      <!--<p>{{ startFlightSelected.connections }}</p>-->
      <!--<p>{{ isFirstSelected }}</p>-->

      <div class="input-group">
        <select v-model="selected" @change="selectedConnect" class="custom-select">
          <!-- inline object literal -->
          <!--<option :selected="true" :value="'selectpls'">Please select an option</option>-->
          <option v-once disabled :selected="selected" :value="selected">{{ selected }}</option>
          <option v-for="select in airports" v-bind:value="select">{{ select.shortName }}</option>
        </select>
      </div>
      <!--<p>{{ selected }}</p>-->
      <p>{{ departureIata }}</p>

      <!--<div class="input-group">-->
        <!--<select class="custom-select" id="inputGroupSelect04">-->
          <!--<option selected>Choose...</option>-->
          <!--<option value="1">One</option>-->
          <!--<option value="2">Two</option>-->
          <!--<option value="3">Three</option>-->
        <!--</select>-->
        <!--<div class="input-group-append">-->
          <!--<button class="btn btn-outline-secondary" type="button">Button</button>-->
        <!--</div>-->
      <!--</div>-->



      <!--<v-select :onChange="selectedConnect" v-model="selected">-->
        <!--<span slot="select" v-for="select in objs">-->
          <!--{{ select }}-->
        <!--</span>-->
      <!--</v-select>-->

    </div>
    <div class="end-place col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <!--<v-select :disabled="!isFirstSelected" v-model="endFlightSelected"  label="availableCities" :options="availableCities" ></v-select>-->
      <!--<v-select label="shortName" :options="dict" ></v-select>-->
      <!--<v-select :options="selectedConnections">-->
        <!--<template>-->

        <!--</template>-->
      <!--</v-select>-->

      <div class="input-group">
        <select name="" id="" v-model="selectedDestination" @change="destinationSelect" class="custom-select" :disabled="!isFirstSelected">
          <option v-once disabled :selected="selectedDestination" :value="selectedDestination">{{ selectedDestination }}</option>
          <option v-for="select in selectedConnections" v-bind:value="select">{{ fulls(select.iata).shortName }}</option>
        </select>
      </div>
      <div>
        {{ destinationIata }}
      </div>
    </div>
    <br><br>
    <!--<button @click="findByIata">iata</button>-->
    <!--<p>{{ startFlightSelected.connections }}</p>-->

    <!--<p>{{ selectedConnections }}</p>-->
    <!--<div v-for="select in selectedConnections">-->
      <!--<p>{{ fulls(select.iata).shortName }}</p>-->
    <!--</div>-->

    <!--<select v-model="selected" v-on:change="selectedConnect">-->
      <!--<option v-for="airport in airports" value="">{{ airport.shortName }}</option>-->
    <!--</select>-->
    <!--<p>{{ selected }}</p>-->



    <!--<p>{{ dict }}</p>-->
    <!--<p>{{ findIata.shortName }}</p>-->
    <!--<div v-for="airport in airports">{{ airport.connections }}</div>-->
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        selected: 'Please select...',
        selectedConnections: [],
        departureIata: '',
        destinationIata: '',
        selectedDestination: 'Please select...',
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
      selectedConnect() {
        let vm = this;
        vm.selectedConnections = vm.selected.connections;
        vm.departureIata = vm.selected.iata;
        vm.isFirstSelected = true;
      },
      destinationSelect() {
        let vm = this;
        vm.destinationIata = vm.selectedDestination.iata;
      },
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

    },
    // mounted() {
    //   $(document).ready(function() {
    //     $('select').select2({
    //       placeholder: 'select',
    //       change: alert('changed')
    //     });
    //   });
    // }
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

  select {
    -webkit-appearance: none;
  }

  .custom-select {
    border: 2px solid $pink;
    &:focus {
      outline: none !important;
      border-color: $pink;
    }
  }

</style>
