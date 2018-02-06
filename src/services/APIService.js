import axios from 'axios';
import { bus } from "../main";

export const APIService = {
  methods: {
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
            bus.$emit('selectedflight', flightsArray, this.selected.shortName, this.getFullNames(this.selectedDestination.iata).shortName, this.departureDate, this.departureIata, this.destinationIata, this.isReturnNeeded);
            bus.$emit('returnselecteddate', this.departureDate);
          });
          let values = [this.selected, this.selectedConnections, this.getFullNames(this.selectedDestination.iata).shortName, url, this.departureDate, this.departureIata, this.destinationIata, this.selected.shortName, this.flights, this.isReturnNeeded, this.returnFlights, this.returnDate];
          this.$ls.set('departure', values, 60 * 60 * 1000);
        })
        .catch(error => console.log(error));

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
            });

          })
          .catch(error => console.log(error));

      }
    },
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
      let callback = (val, oldVal, uri) => {
        console.log('localStorage change', val);
      };
      this.$ls.on('departure', callback);

      if (value != null) {

        this.localConnections = value[1];
        this.selectedDestination = value[2];
        //this.departureDate = value[4];
        this.isFirstSelected = true;
        this.secondSelected = true;
        let url = value[3];
        this.departureDate = value[4];
        this.departureIata = value[5];
        this.destinationIata = value[6];
        this.isReturnNeeded = value[9];

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

