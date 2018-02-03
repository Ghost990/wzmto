<template>
  <div class="row select-back-date-row">
    <div class="col-12 backdate-card">
      <div class="row">
        <div class="col-12 col-sm-8 select-text">
          <h3>Would You like to buy ticket for return?</h3>
          <p>Select a return date from the date selecor.</p>
          <p>retdate:{{ departureDateSelected }}</p>
        </div>
        <div class="col-12 col-sm-4 select-button">
          <button v-if="!isShowingDateselect" class="select-dates-trigger" @click="selectReturnDate">
            Select date
          </button>
          <div class="input-group return-date-select" v-if="isShowingDateselect">
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
      </div>
      <div class="row">
        <div class="col-12 col-sm-6 offset-sm-3">
          <button class="wizz-button wizz-button-primary" @click="getReturnFlights">
            Get
          </button>
        </div>
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
        returnDate: '',
        departureDateSelected: '',
        isTicketsShow: false,
        isReturnNeeded: false,
        isShowingDateselect: false,
        returnActualFlight: [],
        returnDepartureCity: '',
        returnDestinationCity: '',
        returnSelectedDate: '',
        returnDepartureIata: '',
        returnDestinationIata: '',
        returnSelectedTicket: '',
        configReturn: {
          wrap: true, // set wrap to true only when using 'input-group'
          altFormat: 'l, J F Y',
          altInput: true,
          dateFormat: 'Y-m-d'
        }
      }
    },
    watch: {
      departureDate() {
        this.selectReturnDate();
      }
    },
    methods: {
      selectReturnDate() {
        this.isShowingDateselect = true;
        this.returnDate = moment(this.departureDateSelected, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
        this.configReturn = { minDate: this.returnDate };
        this.isReturnNeeded = true;
      },
      getReturnFlights(url) {
        bus.$emit('selectbackdate', this.departureDateSelected);
      },
    },
    created() {
      bus.$on('returnselecteddate', (event) => {
        this.departureDateSelected = event;
      });

      console.log(this.departureDateSelected);

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/partials/variables";
  @import "../../styles/bootstrap/bootstrap";

  h3 {
    font-size: 18px;
    text-transform: uppercase;
  }

  .select-back-date-row {
    margin-bottom: 30px;
    .backdate-card {
      border-radius: 3px;
      background: white;
      box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.1);
      padding: 0 20px;
      position: relative;
      padding: 25px;
      .select-text {
        p {
          font-size: 16px;
          opacity: .6;
        }
      }
      .select-dates-trigger {
        text-transform: uppercase;
        color: $pink;
        border: 2px solid $pink;
        border-radius: 3px;
        width: 100%;
        height: 45px;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
        @include transition(transition, 0.5s);
        &:hover {
          background: $pink;
          color: white;
        }
      }
      .discounts {
        margin: 0 30px;
        .discount {
          color: #343434;
          display: block;
        }
      }
      .read-more {
        text-transform: uppercase;
        font-weight: bold;
        color: $pink;
        position: absolute;
        right: 20px;
        a {
          color: $pink;
          border-bottom: 1px solid $pink;
          &:hover {
            text-decoration: none;
          }
        }
      }
    }
  }
</style>
