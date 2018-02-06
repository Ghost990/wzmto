<template>
  <div class="row select-back-date-row">
    <div class="col-12 backdate-card">
      <div class="row">
        <div class="col-12 col-sm-8 select-text">
          <h3>Would You like to buy ticket for return?</h3>
          <p>Select a return date from the date selecor.</p>
        </div>
        <div class="col-12 col-sm-4 select-button">
          <button v-if="!isShowingDateselect" class="select-dates-trigger" @click="selectReturnDate">
            Select date
          </button>
          <div class="input-group return-date-select" v-animate-css="'fadeIn'" v-if="isShowingDateselect">
            <flat-pickr
              v-model="returnDate"
              :config="configReturn"
              class="form-control"
              :placeholder="'Select Return Date'"
              name="date"
              :disabled="false"
              @on-change="dateChanged"
            >
            </flat-pickr>
          </div>
        </div>
      </div>
      <div class="row" v-if="isReturnNeeded" v-animate-css="animation">
        <div class="col-12 col-sm-6 offset-sm-3">
          <button class="wizz-button wizz-button-primary rounded show-flights" @click="getReturnFlights">
            Show Flights
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { bus } from '../../main';

  export default {
    data() {
      return {
        returnDate: '',
        departureDateSelected: '',
        isReturnNeeded: false,
        isShowingDateselect: false,
        configReturn: {
          wrap: true, // set wrap to true only when using 'input-group'
          altFormat: 'l, J F Y',
          altInput: true,
          dateFormat: 'Y-m-d'
        },
        animation: {
          classes: 'fadeIn'
        }
      }
    },
    methods: {
      selectReturnDate() {
        this.isShowingDateselect = true;
        this.returnDate = moment(this.departureDateSelected, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
        this.configReturn = { minDate: this.returnDate };
      },
      getReturnFlights(url) {
        bus.$emit('selectbackdate', this.departureDateSelected);
      },
      dateChanged() {
        this.isReturnNeeded = true;
      }
    },
    created() {
      bus.$on('returnselecteddate', (event) => {
        this.departureDateSelected = event;
      });
    },
    beforeDestroy() {
      this.animation = {
        classes: 'fadeOut'
      }
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
