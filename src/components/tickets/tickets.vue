<template>
  <section class="col-xl-9 col-lg-9 col-md-9 col-12">

    <wizz-flight-selector></wizz-flight-selector>

    <wizz-discounts v-show="isTicketsShow" v-animate-css="'fadeIn'"></wizz-discounts>
    <div class="row tickets-row" v-show="isTicketsShow" v-animate-css="'fadeIn'">
      <div class="col-12">
        <div class="row tickets-header align-items-center">
          <div class="col-12">
            <div class="outbound">
              Outbound
            </div>
            <div class="ticket-route text-center">
              {{ departureCity }}
              <span class="arrow"></span>
              {{ destinationCity }}
            </div>
          </div>
        </div>
        <div class="row tickets-dates align-items-center">
          <div class="col-12 col-sm-3 d-none d-md-block">
            <span class="arrow arrow-left"></span>
            <span class="date date-left">
                {{ moment(selectedDate, 'YYYY-MM-DD').subtract(1, 'day').format('ddd D MMMM') }}
            </span>
          </div>
          <div class="col-12 col-sm-6 actual-date">
            {{ moment(selectedDate, 'YYYY-MM-DD').format('dddd, Do MMMM YYYY') }}
          </div>
          <div class="col-12 col-sm-3 d-none d-md-block">
            <span class="arrow arrow-right"></span>
            <span class="date date-right">
                {{ moment(selectedDate, 'YYYY-MM-DD').add(1, 'day').format('ddd D MMMM') }}
            </span>
          </div>
        </div>

        <div class="row white-bg">
          <div class="col">
            <div class="row ticket-categories align-items-center">
              <div class="col-xl-9 col-lg-9 col-md-9 col-12 offset-xl-3 offset-lg-3 offset-md-3">
                <div class="row">
                  <div class="col-4 text-center ticket-category-header">
                    Basic
                  </div>
                  <div class="col-4 text-center ticket-category-header grey-bg">
                    Standard
                  </div>
                  <div class="col-4 text-center ticket-category-header">
                    Plus
                  </div>
                </div>
              </div>
            </div>

            <wizz-tickets-row :flights="actualFlight"></wizz-tickets-row>

            <wizz-tickets-descriptions></wizz-tickets-descriptions>

            <wizz-tickets-moredates></wizz-tickets-moredates>
          </div>
        </div>
      </div>
    </div>

    <div class="row tickets-row" v-if="isReturn" v-animate-css="'fadeIn'">
      <div class="col-12">
        <div class="row tickets-header align-items-center">
          <div class="col-12">
            <div class="outbound">
              Return
            </div>
            <div class="ticket-route text-center">
              {{ returnDepartureCity }}
              <span class="arrow"></span>
              {{ returnDestinationCity }}
            </div>
          </div>
        </div>
        <div class="row tickets-dates align-items-center">
          <div class="col-12 col-sm-3 d-none d-md-block">
            <span class="arrow arrow-left"></span>
            <span class="date date-left">
                {{ moment(returnSelectedDate, 'YYYY-MM-DD').subtract(1, 'day').format('ddd D MMMM') }}
            </span>
          </div>
          <div class="col-12 col-sm-6 actual-date">
            {{ moment(returnSelectedDate, 'YYYY-MM-DD').format('dddd, Do MMMM YYYY') }}
          </div>
          <div class="col-12 col-sm-3 d-none d-md-block">
            <span class="arrow arrow-right"></span>
            <span class="date date-right">
                {{ moment(returnSelectedDate, 'YYYY-MM-DD').add(1, 'day').format('ddd D MMMM') }}
            </span>
          </div>
        </div>

        <div class="row white-bg">
          <div class="col">
            <div class="row ticket-categories align-items-center">
              <div class="col-xl-9 col-lg-9 col-md-9 col-12 offset-xl-3 offset-lg-3 offset-md-3">
                <div class="row">
                  <div class="col-4 text-center ticket-category-header">
                    Basic
                  </div>
                  <div class="col-4 text-center ticket-category-header grey-bg">
                    Standard
                  </div>
                  <div class="col-4 text-center ticket-category-header">
                    Plus
                  </div>
                </div>
              </div>
            </div>

            <wizz-tickets-row-return :returnFlights="returnActualFlight" v-animate-css="'fadeIn'"></wizz-tickets-row-return>

            <wizz-tickets-descriptions></wizz-tickets-descriptions>

            <wizz-tickets-moredates></wizz-tickets-moredates>

          </div>
        </div>
      </div>
    </div>

    <wizz-select-backdate v-show="isBackSelectorShow && !isReturn" v-animate-css="'fadeIn'"></wizz-select-backdate>

    <wizz-summary v-show="isTicketSelected" v-animate-css="'fadeIn'" :selectedDepartureDate="departureDate"></wizz-summary>

  </section>
</template>

<script>
  import DiscountCard from './ticketsDiscount.vue';
  import MoreDates from './moreDates.vue';
  import FlightSelector from '../flightSelector/flightSelector.vue';
  import SelectBackDate from './selectBackDates.vue';
  import Summary from './summary.vue';
  import TicketsRow from './ticketsRow.vue';
  import TicketsRowReturn from './ticketsRowReturn.vue';
  import TicketsDescriptions from './ticketsDescriptions.vue';
  import { bus } from '../../main';
  import moment from 'moment';

  /**
   * The Tickets component.
   */

  export default {
    name: 'wizz-tickets',
    components: {
      'wizz-discounts': DiscountCard,
      'wizz-tickets-moredates': MoreDates,
      'wizz-flight-selector': FlightSelector,
      'wizz-select-backdate': SelectBackDate,
      'wizz-summary': Summary,
      'wizz-tickets-row': TicketsRow,
      'wizz-tickets-row-return': TicketsRowReturn,
      'wizz-tickets-descriptions': TicketsDescriptions

    },
    props: ['departureDate'],
    data() {
      return {
        actualFlight: [],
        isTicketsShow: false,
        departureCity: '',
        destinationCity: '',
        selectedDate: '',
        departureIata: '',
        destinationIata: '',
        isReturn: false,
        isTicketSelected: false,
        isBackSelectorShow: false,

        returnActualFlight: [],
        returnDepartureCity: '',
        returnDestinationCity: '',
        returnSelectedDate: '',
        returnDepartureIata: '',
        returnDestinationIata: ''
      }
    },
    created() {
      /**
       * If the localStorage has values load data from there.
       */
      let value = this.$ls.get('departure');

      if (value != null) {
        this.actualFlight = value[8];
        this.departureCity = value[7];
        this.destinationCity = value[2];
        this.selectedDate = value[4];
        this.departureIata = value[5];
        this.destinationIata = value[6];
        this.isTicketsShow = true;
        this.isReturn = value[9];

        this.returnActualFlight = value[10];
        this.isTicketsShow = true;
        this.returnDepartureCity = value[2];
        this.returnDestinationCity = value[7];
        this.returnSelectedDate = value[11];
        this.returnDepartureIata = value[6];
        this.returnDestinationIata = value[5];

      }

      /**
       * If no value in localStorage (e.g. init load) then listen to EventBus and load data.
       */
      bus.$on('selectedflight', (event, departureCity, destinationCity, selectedDate, departureIata, destinationIata, isReturn) => {
        this.actualFlight = event;
        this.isTicketsShow = true;
        this.departureCity = departureCity;
        this.destinationCity = destinationCity;
        this.selectedDate = selectedDate;
        this.departureIata = departureIata;
        this.destinationIata = destinationIata;
        this.isReturn = isReturn;
        this.isBackSelectorShow = true;

      });

      bus.$on('returnselectedflight', (event, departureCity, destinationCity, selectedDate, departureIata, destinationIata, isReturn) => {
        this.returnActualFlight = event;
        this.isTicketsShow = true;
        this.returnDepartureCity = destinationCity;
        this.returnDestinationCity = departureCity;
        this.returnSelectedDate = selectedDate;
        this.returnDepartureIata = departureIata;
        this.returnDestinationIata = destinationIata;
        this.isReturn = isReturn;
      });

      bus.$on('ticketdata', (event, selectedTicket, isOutboundSelected) => {
        this.isTicketSelected = isOutboundSelected;
      });

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/partials/variables";
  @import "../../styles/bootstrap/bootstrap";

  .tickets-row {
    margin-bottom: 35px;
    box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 3px 3px;
    .tickets-header {
      height: 55px;
      background: #f2f2f2;
      border-radius: 3px 3px 0 0;
      @include media-breakpoint-down(md) {
        height: 65px;
      }
      .outbound {
        float: left;
        font-weight: bold;
        font-size: 18px;
        color: #919191;
        text-transform: uppercase;
        position: absolute;
        @include media-breakpoint-down(md) {
          position: relative;
          width: 100%;
          text-align: center;
        }
      }
      .ticket-route {
        font-size: 22px;
        color: $blue;
        .arrow {
          width: 32px;
          height: 11px;
          background: url("../../assets/img/arrow_single.svg");
          display: inline-block;
          margin: 0 10px;
        }
      }
    }
    .tickets-dates {
      height: 58px;
      background: white;
      border-bottom: 1px solid #e5e5e5;
      .arrow {
        display: inline-block;
        width: 10px;
        height: 18px;
        cursor: pointer;
        &.arrow-left {
          background: url("../../assets/img/arrow_dateselect.svg");
          transform: rotate(180deg);
          float: left;
          margin: 0 20px 0 6px;
        }
        &.arrow-right {
          background: url("../../assets/img/arrow_dateselect.svg");
          float: right;
          margin: 0 6px 0 20px;
        }
      }
      .date {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 12px;
        color: #919191;
        display: inline-block;
        &.date-right {
          float: right;
        }
        &.date-left {
          float: left;
        }
      }
      .actual-date {
        font-size: 18px;
        text-align: center;
      }
    }
    .ticket-categories {
      .ticket-category-header {
        background: white;
        font-size: 12px;
        font-weight: bold;
        padding: 20px 0;
        text-transform: uppercase;
      }
    }
    .time-row {
      border-bottom: 1px solid $background;
      .arrow {
        display: inline-block;
        width: 25px;
        height: 8px;
        background: url("../../assets/img/arrow_dates_small.svg");
        margin: 0 10px;
      }
      .single-ticket-wrapper {
        background: white;
        padding: 20px 8px;
        .single-ticket {
          width: 100%;
          height: 50px;
          border: 2px solid $pink;
          border-radius: 3px;
          font-weight: bold;
          text-align: center;
          cursor: pointer;
          @include transition(transition, 0.5s);
          &:hover {
            background: $pink;
            color: white;
          }
          &.selected {
            background: $pink;
            color: white;
          }
          &.single-ticket-notickets {
            border: 2px solid #ccc;
            background: #eee;
            cursor: not-allowed;
            &:hover {
              color: black;
            }
          }
        }
      }
    }
  }
</style>

