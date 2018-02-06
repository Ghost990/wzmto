import axios from 'axios';
import { bus } from "../main";

export const APIService = {
  methods: {
    /**
     * Getting the flight details based on the FlightSelector's selected values.
     */
    getFlightDetails(url) {
      url = `/search?departureStation=${this.departureIata}&arrivalStation=${this.destinationIata}&date=${this.departureDate}`;
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
            /**
             * Emitting the data from the selected API calls with EventBus.
             */
            bus.$emit('selectedflight', flightsArray, this.selected.shortName, this.getFullNames(this.selectedDestination.iata).shortName, this.departureDate, this.departureIata, this.destinationIata, this.isReturnNeeded);
            bus.$emit('returnselecteddate', this.departureDate);
          });
          /**
           * Clear the localStorage and store the new values based on the selected API call.
           */
          this.$ls.clear();
          let values = [this.selected, this.selectedConnections, this.getFullNames(this.selectedDestination.iata).shortName, url, this.departureDate, this.departureIata, this.destinationIata, this.selected.shortName, this.flights, this.isReturnNeeded, this.returnFlights, this.returnDate];
          this.$ls.set('departure', values, 24 * 60 * 60 * 1000);
        })
        .catch(error => console.log(error));

      /**
       * Getting and storing the return data if return date is selected.
       */
      if (this.isReturnNeeded) {
        url = `/search?departureStation=${this.destinationIata}&arrivalStation=${this.departureIata}&date=${this.returnDate}`;
        axios.get(url)
          .then(response => {
            const data = response.data;
            let returnFlightsArray = [];
            for (let key in data) {
              const flight = data[key];
              returnFlightsArray.push(flight);
            }
            this.returnFlights = returnFlightsArray;
            this.$nextTick(() => {
              bus.$emit('returnselectedflight', returnFlightsArray, this.selected.shortName, this.getFullNames(this.selectedDestination.iata).shortName, this.returnDate, this.departureIata, this.destinationIata, this.isReturnNeeded);
              this.$ls.clear();
              let values = [this.selected, this.selectedConnections, this.getFullNames(this.selectedDestination.iata).shortName, url, this.departureDate, this.departureIata, this.destinationIata, this.selected.shortName, this.flights, this.isReturnNeeded, this.returnFlights, this.returnDate];
              this.$ls.set('departure', values, 24 * 60 * 60 * 1000);
            });

          })
          .catch(error => console.log(error));

      }
    },
    /**
     * Getting the values from localStorage if have values and load the data's for the ticket's list.
     */
    loadLocalData() {
      axios.get('/asset/stations')
        .then(response => {
          const data = response.data;
          let airportsArray = [];
          for (let key in data) {
            const airport = data[key];
            airportsArray.push(airport);
          }
          this.airports = airportsArray;

        })
        .catch(error => console.log(error));

      let value = this.$ls.get('departure');
      if (value != null) {

        this.localConnections = value[1];
        this.selectedDestination = value[2];
        this.isFirstSelected = true;
        this.secondSelected = true;
        this.departureDate = value[4];
        this.departureIata = value[5];
        this.destinationIata = value[6];
        this.isReturnNeeded = value[9];

        /**
         * Timing out the destination select value to have data and not run without initialization.
         */
        setTimeout(() => {
          this.isLoaded = true;
        }, 1500);


        axios.get(value[3])
          .then(response => {
            const data = response.data;
            let flightsArray = [];
            for (let key in data) {
              const flight = data[key];
              flightsArray.push(flight);
            }
            this.flights = flightsArray;
          })
          .catch(error => console.log(error));
      }

      if (this.isReturnNeeded) {
        let url = value[3];
        this.departureDate = value[4];
        this.departureIata = value[6];
        this.destinationIata = value[5];

        /**
         * Loading the data from localStorage if have value and the return date is selected.
         */
        axios.get(value[3])
          .then(response => {
            const data = response.data;
            let flightsArray = [];
            for (let key in data) {
              const flight = data[key];
              flightsArray.push(flight);
            }
            this.returnFlights = flightsArray;
          })
          .catch(error => console.log(error));
      }
      /**
       * Listening initial datas.
       */
      bus.$on('selectbackdate', (event) => {
        this.returnDate = event;
        this.isReturnNeeded = true;
        this.isBackSelected = true;

        let url = `/search?departureStation=${this.destinationIata}&arrivalStation=${this.departureIata}&date=${this.returnDate}`;
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
              bus.$emit('returnselectedflight', flightsArray, this.selected.shortName, this.getFullNames(this.selectedDestination.iata).shortName, this.returnDate, this.departureIata, this.destinationIata, this.isReturnNeeded);
            });
          })
          .catch(error => console.log(error));
      });
    }
  }
};

