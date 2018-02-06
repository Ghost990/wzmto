<template>
  <div class="row flight-selector-card" v-animate-css="{classes: 'fadeIn', duration: 2000}">
    <div class="col-12">
      <div class="row">
        <div class="start-place col-12 col-sm-4" v-animate-css="{classes: 'fadeInDown', duration: 1000, delay: 500}">
          <h5>Origin</h5>
          <div class="input-group">
          <select id="departureSelect" name="departureSelect" v-model="selected" @change="selectedConnect" class="custom-select">
            <option v-once disabled :selected="selected" :value="selected">{{secondSelected ? selected.shortName : selected }}</option>
            <option v-for="select in airports" v-bind:value="select">{{ select.shortName }}</option>
          </select>
        </div>
      </div>
      <div class="end-place col-12 col-sm-4" v-animate-css="{classes: 'fadeInDown', duration: 1000, delay: 500}">
        <h5>Destination</h5>
        <div class="input-group">
          <select v-if="localConnections.length < 1" v-model="selectedDestination" @change="destinationSelect" class="custom-select" :disabled="!isFirstSelected">
            <option v-once disabled :selected="selectedDestination" :value="selectedDestination">{{ selectedDestination }}</option>
            <option v-for="select in selectedConnections" v-bind:value="select">{{ getFullNames(select.iata).shortName
              }}</option>
          </select>
          <select v-else-if="localConnections.length > 1 && isLoaded" v-model="selectedDestination" @change="destinationSelect" class="custom-select" :disabled="!isFirstSelected">
            <option v-once disabled :selected="selectedDestination" :value="selectedDestination">{{ selectedDestination }}</option>
            <option v-for="select in selectedConnections" v-bind:value="select">{{ getFullNames(select.iata).shortName
              }}</option>
          </select>
        </div>
      </div>
      <div class="end-place col-12 col-sm-4" v-animate-css="{classes: 'fadeInDown', duration: 1000, delay: 500}">
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
        <div v-if="isReturnNeeded" v-animate-css="'fadeIn'">
          <h5>Return</h5>
          <div class="input-group return-date-select">
            <flat-pickr
              v-model="returnDate"
              :config="configReturn"
              class="form-control"
              :placeholder="'Select Return Date'"
              name="date"
              :disabled="false"
            >
            </flat-pickr>
          </div>
        </div>
        <div class="select-date-back-wrapper d-flex align-items-center justify-content-center">
          <span class="select-date-back-button" @click="selectReturnClicked">
            Select Return Date
          </span>
        </div>
      </div>
    </div>
    <div class="row" v-animate-css="{classes: 'fadeInDown', duration: 1000, delay: 500}">
      <div class="col-12 col-sm-6 offset-sm-3">
        <button class="wizz-button wizz-button-primary rounded" @click="getFlightDetails">GET</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { APIService } from "../../services/APIService";

  export default {
    mixins: [APIService],
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
        secondSelected: false,
        airports: [],
        flights: [],
        returnFlights: [],
        isFirstSelected: false,
        localConnections: [],
        isLoaded: false,
        isDepartureSelected: false,
        isReturnNeeded: false,
        isBackSelected: false,
        date: new Date(),
        configDeparture: {
          wrap: true,
          altFormat: 'l, J F Y',
          altInput: true,
          dateFormat: 'Y-m-d',
          minDate: "today"
        },
        configReturn: {
          wrap: true,
          altFormat: 'l, J F Y',
          altInput: true,
          dateFormat: 'Y-m-d'
        },
      }
    },
    watch: {
      departureDate() {
        this.dateChanged();
      },

    },
    computed: {
      getToday() {
        let date = new Date();
        return moment(date, 'YYYY-MM-DD').format('dddd, Do MMMM YYYY');
      },
    },
    methods: {
      selectReturnClicked() {
        this.isReturnNeeded = true;
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
        let value = this.$ls.get('departure');

      },
      getFullNames(iata) {
        let vm = this;
        return vm.airports.find(x => x.iata === iata);

      },
      dateChanged() {
        let vm = this;
        vm.destinationIata = vm.selectedDestination.iata;
        vm.departureIata = vm.selected.iata;
        this.isDepartureSelected = true;
        this.returnDate = moment(this.departureDate, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD'),
        this.configReturn = { minDate: this.returnDate }
      },

    },
    created() {
      let value = this.$ls.get('departure');
      if (value != null) {
        this.selected = value[0];
        this.selectedConnections = value[1];
      }
      this.loadLocalData();
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
