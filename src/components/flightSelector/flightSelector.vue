<template>
  <div class="row flight-selector-card">
    <div class="start-place col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">

      <div class="input-group">
        <select v-model="selected" @change="selectedConnect" class="custom-select">
          <option v-once disabled :selected="selected" :value="selected">{{ selected }}</option>
          <option v-for="select in airports" v-bind:value="select">{{ select.shortName }}</option>
        </select>
      </div>
      <!--<p>{{ selected }}</p>-->
      <p>{{ departureIata }}</p>
      <flat-pickr
        v-model="departureDate"
        :config="config"
        class="form-control"
        :placeholder="getToday"
        name="date"
        >
      </flat-pickr>
      <p>{{ departureDate }}</p>

    </div>
    <div class="end-place col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">

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
    <!--<div>-->
      <!--{{ flights }}-->
    <!--</div>-->
    <div v-for="flight in flights">
      {{ flight.flightNumber }}
    </div>
    <br><br>
    <button @click="getFlightDetails">GET</button>
    <button @click="getSelectedFlights">SEND</button>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';

  export default {
    data() {
      return {
        selected: 'Please select...',
        selectedConnections: [],
        departureIata: '',
        destinationIata: '',
        selectedDestination: 'Please select...',
        departureDate: moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD'),
        destinationDate: '',
        longList: [],
        airports: [],
        startFlightSelected: {},
        flights: [],
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
        ],
        date: new Date(),
        // Get more form https://chmln.github.io/flatpickr/options/
        config: {
          wrap: true, // set wrap to true only when using 'input-group'
          altFormat: 'l, J F Y',
          altInput: true,
          dateFormat: 'Y-m-d',
          defaultDate: moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD')
        },
      }
    },
    computed: {
      getToday() {
        let vm = this;
        let date = new Date();
        return moment(date, 'YYYY-MM-DD').format('dddd, Do MMMM YYYY');
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
      getSelectedFlights() {
        this.$emit('selectedflight', this.flights);
      },
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
      },
      getFlightDetails() {
        axios.get(`https://mock-air.herokuapp.com/search?departureStation=${this.departureIata}&arrivalStation=${this.destinationIata}&date=${this.departureDate}`)
          .then(response => {
            const data = response.data;
            let flightsArray = [];
            for (let key in data) {
              const flight = data[key];
              flightsArray.push(flight);
            }
            this.flights = flightsArray;
            this.$nextTick(() => {
              this.$emit('selectedflight', flightsArray);
            });
          })
          .catch(error => console.log(error));

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
