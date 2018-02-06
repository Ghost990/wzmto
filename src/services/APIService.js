import axios from 'axios';
import { bus } from "../main";

export const APIService = {
  methods: {
    getFlightDetails(url) {
      url = `https://mock-air.herokuapp.com/search?departureStation=${this.departureIata}&arrivalStation=${this.destinationIata}&date=${this.departureDate}`;
      console.log(url);
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
            bus.$emit('selectedflight', flightsArray, this.selected.shortName, this.fulls(this.selectedDestination.iata).shortName, this.departureDate, this.departureIata, this.destinationIata, this.isReturnNeeded);
            bus.$emit('returnselecteddate', this.departureDate);
          });
          let values = [this.selected, this.selectedConnections, this.fulls(this.selectedDestination.iata).shortName, url, this.departureDate, this.departureIata, this.destinationIata, this.selected.shortName, flightsArray, this.isReturnNeeded];
          this.$ls.set('departure', values, 60 * 60 * 1000);
        })
        .catch(error => console.log(error));



      if (this.isReturnNeeded) {
        url = `https://mock-air.herokuapp.com/search?departureStation=${this.destinationIata}&arrivalStation=${this.departureIata}&date=${this.returnDate}`;
        console.log(url);
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
              //this.$emit('selectedflight', flightsArray, this.selected.shortName, this.fulls(this.selectedDestination.iata).shortName, this.departureDate);
              bus.$emit('returnselectedflight', returnFlightsArray, this.selected.shortName, this.fulls(this.selectedDestination.iata).shortName, this.returnDate, this.departureIata, this.destinationIata, this.isReturnNeeded);
            });
            this.$ls.clear();
            let values = [this.selected, this.selectedConnections, this.fulls(this.selectedDestination.iata).shortName, url, this.departureDate, this.departureIata, this.destinationIata, this.selected.shortName, this.flights, this.isReturnNeeded, this.returnFlights, this.returnDate];
            this.$ls.set('departure', values, 60 * 60 * 1000);
          })
          .catch(error => console.log(error));

      }
    },
    loadLocalData() {
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
          this.hideFirst = true;
        }, 1000);


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

        let url = `https://mock-air.herokuapp.com/search?departureStation=${this.destinationIata}&arrivalStation=${this.departureIata}&date=${this.returnDate}`;
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
              bus.$emit('returnselectedflight', flightsArray, this.selected.shortName, this.fulls(this.selectedDestination.iata).shortName, this.returnDate, this.departureIata, this.destinationIata, this.isReturnNeeded);
            });
          })
          .catch(error => console.log(error));
      });
    }
  }
};

