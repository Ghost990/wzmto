<template>
  <div class="flight-selector-card">
    <div class="row">
      <div class="start-place col-12 col-sm-4">
        <h5>Origin</h5>
        <div class="input-group">
          <select id="departureSelect" name="departureSelect" v-model="selected" @change="selectedConnect" class="custom-select">
            <option v-once disabled :selected="selected" :value="selected">{{ selected }}</option>
            <option v-for="select in airports" v-bind:value="select">{{ select.shortName }}</option>
          </select>
        </div>
        <p>{{ selected.shortName }}</p>
      </div>
      <div class="end-place col-12 col-sm-4">
        <h5>Destination</h5>
        <div class="input-group">
          <select v-if="localConnections.length < 1" v-model="selectedDestination" @change="destinationSelect" class="custom-select" :disabled="!isFirstSelected">
            <option v-once disabled :selected="selectedDestination" :value="selectedDestination">{{ selectedDestination }}</option>
            <option v-for="select in selectedConnections" v-bind:value="select">{{ fulls(select.iata).shortName }}</option>
          </select>
          <select v-else-if="localConnections.length > 1 && isLoaded" v-model="selectedDestination" @change="destinationSelect" class="custom-select" :disabled="!isFirstSelected">
            <option v-once disabled :selected="selectedDestination" :value="selectedDestination">{{ selectedDestination }}</option>
            <option v-for="select in selectedConnections" v-bind:value="select">{{ fulls(select.iata).shortName }}</option>
          </select>
        </div>
        <!--<div>-->
          <!--{{ selectedConnections }}-->
        <!--</div>-->
      </div>
      <div class="end-place col-12 col-sm-4">
        <h5>Departure</h5>
        <div class="input-group departure-date-select">
          <flat-pickr
            v-model="departureDate"
            :config="configDeparture"
            class="form-control"
            :placeholder="getToday"
            name="date"
            :disabled="false"
            @on-change="dateChanged"
          >
          </flat-pickr>
        </div>
        <div>
          {{ dateSelected }}
        </div>
        <div>
          {{ returnDate }}
        </div>
        <div v-if="isDepartureSelected">
          <h5>Return</h5>
          <div class="input-group return-date-select">
            <flat-pickr
              v-model="returnDate"
              :config="configReturn"
              class="form-control"
              :placeholder="'Select Return Date'"
              name="date"
              :disabled="false"
              @on-open="getReturnMinDate"
            >
            </flat-pickr>
          </div>
        </div>
        <!--<p>{{ departureDate }}</p>-->
        <div class="select-date-back-wrapper d-flex align-items-center justify-content-center">
          <span class="select-date-back-button">
            Select Return Date
          </span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-6 offset-sm-3">
        <button class="wizz-button wizz-button-primary rounded" @click="getFlightDetails">GET</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';
  import { bus } from '../../main';

  export default {
    data() {
      return {
        selected: 'Please select...',
        selectedConnections: [],
        departureIata: '',
        destinationIata: '',
        selectedDestination: 'Please select...',
        departureDate: moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD'),
        returnDate: '',
        destinationDate: '',
        dateSelected: '',
        airports: [],
        flights: [],
        isFirstSelected: false,
        localConnections: [],
        isLoaded: false,
        isDepartureSelected: false,
        dateSmaller: '',
        date: new Date(),
        // Get more form https://chmln.github.io/flatpickr/options/
        configDeparture: {
          wrap: true, // set wrap to true only when using 'input-group'
          altFormat: 'l, J F Y',
          altInput: true,
          dateFormat: 'Y-m-d',
          defaultDate: moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD'),
          minDate: "today"
        },
        configReturn: {
          wrap: true, // set wrap to true only when using 'input-group'
          altFormat: 'l, J F Y',
          altInput: true,
          dateFormat: 'Y-m-d'
          // disable: [
          //   function(date) {
          //     // return true to disable
          //     return (date.getDate() < this.);
          //
          //   }
          // ]
        },
      }
    },
    watch: {
      departureDate() {
        this.dateChanged();
      }
    },
    computed: {
      getToday() {
        let vm = this;
        let date = new Date();
        return moment(date, 'YYYY-MM-DD').format('dddd, Do MMMM YYYY');
      },

    },
    methods: {
      getReturnMinDate() {
        let vm = this;
        console.log(moment(this.dateSelected, 'D').format('D'));
        return moment(new Date(), 'D').format('D');
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
        vm.departureIata = vm.selected.iata;
      },
      fulls(iata) {
        let vm = this;
        return vm.airports.find(x => x.iata === iata);

      },
      dateChanged() {
        let vm = this;
        vm.destinationIata = vm.selectedDestination.iata;
        vm.departureIata = vm.selected.iata;
        this.isDepartureSelected = true;
        this.dateSelected = moment(this.departureDate, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD'),

        this.configReturn = { minDate: this.dateSelected }
        // let date = vm.departureDate;
        // vm.returnDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
      },
      getFlightDetails(url) {
        url = `https://mock-air.herokuapp.com/search?departureStation=${this.departureIata}&arrivalStation=${this.destinationIata}&date=${this.departureDate}`;
        axios.get(url)
          .then(response => {
            const data = response.data;
            let flightsArray = [];
            for (let key in data) {
              const flight = data[key];
              flightsArray.push(flight);
            }
            this.flights = flightsArray;
            this.$nextTick(() => {
              //this.$emit('selectedflight', flightsArray, this.selected.shortName, this.fulls(this.selectedDestination.iata).shortName, this.departureDate);
              bus.$emit('selectedflight', flightsArray, this.selected.shortName, this.fulls(this.selectedDestination.iata).shortName, this.departureDate, this.departureIata, this.destinationIata);
            });
          })
          .catch(error => console.log(error));

          let value = this.$ls.get('departure');
          let values = [this.selected, this.selectedConnections, this.fulls(this.selectedDestination.iata).shortName, url, this.departureDate, this.departureIata, this.destinationIata];
          this.$ls.set('departure', values, 60 * 60 * 1000);
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

      let value = this.$ls.get('departure');
      let callback = (val, oldVal, uri) => {
        console.log('localStorage change', val);
      };
      this.$ls.on('departure', callback);

      if (value != null) {
        this.selected = value[0].shortName;
        this.selectedConnections = value[1];
        this.localConnections = value[1];
        this.selectedDestination = value[2];
        //this.departureDate = value[4];
        this.isFirstSelected = true;
        let url = value[3];

        setTimeout(() => {
          this.isLoaded = true;
          this.hideFirst = true;
        }, 1000);

        console.log(this.selectedConnections);
        //bus.$emit('selectedflight', flightsArray, this.selected, this.selectedDestination, this.departureDate, this.departureIata, this.destinationIata);

        // axios.get(url)
        //   .then(response => {
        //     const data = response.data;
        //     let flightsArray = [];
        //     for (let key in data) {
        //       const flight = data[key];
        //       flightsArray.push(flight);
        //     }
        //     this.flights = flightsArray;
        //     this.$nextTick(() => {
        //       //this.$emit('selectedflight', flightsArray, this.selected.shortName, this.fulls(this.selectedDestination.iata).shortName, this.departureDate);
        //       bus.$emit('selectedflight', flightsArray, this.selected, this.selectedDestination, this.departureDate, this.departureIata, this.destinationIata);
        //     });
        //   })
        //   .catch(error => console.log(error));

        //this.departureDate = value[3];
        console.log(this.departureDate);
      }
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

  .select-date-back-button {
    color: $pink;
    text-transform: uppercase;
    margin: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
  }

  .departure-date-select {
    margin-bottom: 10px;
  }

  h5 {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
  }



</style>
