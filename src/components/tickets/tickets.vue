<template>
  <section class="col-xl-9 col-lg-9 col-md-9 col-12">
    <wizz-flight-selector></wizz-flight-selector>
    <wizz-discounts v-if="isTicketsShow"></wizz-discounts>
    <div class="row">
      <span v-for="flight in actualFlight">
        {{ flight.flightNumber }}
      </span>
    </div>
    <div class="row tickets-row" v-if="isTicketsShow">
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
          <div class="col-xl-4 col-lg-4 col-md-4 col-12">
            <span class="arrow arrow-left"></span>
            <span class="date date-left">
                {{ selectedDate | moment("subtract", "1 day", "ddd D MMMM") }}
            </span>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 actual-date">
            {{ selectedDate | moment("dddd, Do MMMM YYYY") }}
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12">
            <span class="arrow arrow-right"></span>
            <span class="date date-right">
                {{ selectedDate | moment("add", "1 day", "ddd D MMMM") }}
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
            <div class="row time-row align-items-center" v-for="flight in actualFlight">
              <div class="col-3">
                {{ flight.departure | moment("HH:mm") }}
                <span class="arrow"></span>
                {{ flight.arrival | moment("HH:mm") }}
              </div>
              <div class="col">
                <div class="row">
                  <div class="col-4 text-center single-ticket-wrapper" v-for="price in flight.fares">
                    <button class="single-ticket align-items-center justify-content-center d-flex" v-if="flight.remainingTickets > 0">
                      €{{ price.price }}
                    </button>
                    <button v-else>
                      No tickets
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row tickets-descriptions align-items-center">
              <div class="col-xl-9 col-lg-9 col-md-9 col-12 offset-xl-3 offset-lg-3 offset-md-3">
                <div class="row">
                  <div class="col-4 text-center ticket-category-description">
                    <div class="title">
                      Just The Essentials
                    </div>
                    <ul class="ticket-description-list list-unstyled">
                      <li>Flight ticket</li>
                      <li>1 small cabin bag</li>
                    </ul>
                  </div>
                  <div class="col-4 text-center ticket-category-description grey-bg">
                    <div class="title">
                      €2.25 Cheaper in Bundle
                    </div>
                    <ul class="ticket-description-list list-unstyled">
                      <li>Flight ticket</li>
                      <li>1 small cabin bag</li>
                      <li>Seat selection</li>
                    </ul>
                  </div>
                  <div class="col-4 text-center ticket-category-description">
                    <div class="title">
                      €3.25 Cheaper in Bundle
                    </div>
                    <ul class="ticket-description-list list-unstyled">
                      <li>Flight ticket</li>
                      <li>1 large cabin bag</li>
                      <li>1 heavy checked-in bag</li>
                      <li>+1 small personal item onboard</li>
                      <li>Seat selection</li>
                      <li>Flex for flight charges</li>
                      <li>Priority Boarding</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <wizz-tickets-moredates></wizz-tickets-moredates>
          </div>
        </div>
      </div>
    </div>

    <div class="row tickets-row" v-if="isReturn">
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
          <div class="col-xl-4 col-lg-4 col-md-4 col-12">
            <span class="arrow arrow-left"></span>
            <span class="date date-left">
                {{ returnSelectedDate | moment("subtract", "1 day", "ddd D MMMM") }}
            </span>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 actual-date">
            {{ returnSelectedDate | moment("dddd, Do MMMM YYYY") }}
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12">
            <span class="arrow arrow-right"></span>
            <span class="date date-right">
                {{ returnSelectedDate | moment("add", "1 day", "ddd D MMMM") }}
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
            <div class="row time-row align-items-center" v-for="flight in returnActualFlight">
              <div class="col-3">
                {{ flight.departure | moment("HH:mm") }}
                <span class="arrow"></span>
                {{ flight.arrival | moment("HH:mm") }}
              </div>
              <div class="col">
                <div class="row">
                  <div class="col-4 text-center single-ticket-wrapper" v-for="price in flight.fares">
                    <button class="single-ticket align-items-center justify-content-center d-flex" v-if="flight.remainingTickets > 0">
                      €{{ price.price }}
                    </button>
                    <button v-else>
                      No tickets
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row tickets-descriptions align-items-center">
              <div class="col-xl-9 col-lg-9 col-md-9 col-12 offset-xl-3 offset-lg-3 offset-md-3">
                <div class="row">
                  <div class="col-4 text-center ticket-category-description">
                    <div class="title">
                      Just The Essentials
                    </div>
                    <ul class="ticket-description-list list-unstyled">
                      <li>Flight ticket</li>
                      <li>1 small cabin bag</li>
                    </ul>
                  </div>
                  <div class="col-4 text-center ticket-category-description grey-bg">
                    <div class="title">
                      €2.25 Cheaper in Bundle
                    </div>
                    <ul class="ticket-description-list list-unstyled">
                      <li>Flight ticket</li>
                      <li>1 small cabin bag</li>
                      <li>Seat selection</li>
                    </ul>
                  </div>
                  <div class="col-4 text-center ticket-category-description">
                    <div class="title">
                      €3.25 Cheaper in Bundle
                    </div>
                    <ul class="ticket-description-list list-unstyled">
                      <li>Flight ticket</li>
                      <li>1 large cabin bag</li>
                      <li>1 heavy checked-in bag</li>
                      <li>+1 small personal item onboard</li>
                      <li>Seat selection</li>
                      <li>Flex for flight charges</li>
                      <li>Priority Boarding</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <wizz-tickets-moredates></wizz-tickets-moredates>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import DiscountCard from './ticketsDiscount.vue';
  import MoreDates from './moreDates.vue';
  import FlightSelector from '../flightSelector/flightSelector.vue';
  import { bus } from '../../main';

  export default {
    components: {
      'wizz-discounts': DiscountCard,
      'wizz-tickets-moredates': MoreDates,
      'wizz-flight-selector': FlightSelector
    },
    data() {
      return {
        actualFlight: [],
        isTicketsShow: false,
        selectedTicket: '',
        departureCity: '',
        destinationCity: '',
        selectedDate: '',
        departureIata: '',
        destinationIata: '',
        isReturn: false,

        returnActualFlight: [],
        returnDepartureCity: '',
        returnDestinationCity: '',
        returnSelectedDate: '',
        returnDepartureIata: '',
        returnDestinationIata: ''
      }
    },
    methods: {
      getFlightData(event, departureCity, destinationCity, selectedDate) {
        this.actualFlight = event;
        this.isTicketsShow = true;
        this.departureCity = departureCity;
        this.destinationCity = destinationCity;
        this.selectedDate = selectedDate;



        console.log(departureCity);
      }
    },
    created() {
      bus.$on('selectedflight', (event, departureCity, destinationCity, selectedDate, departureIata, destinationIata, isReturn) => {
        this.actualFlight = event;
        this.isTicketsShow = true;
        this.departureCity = departureCity;
        this.destinationCity = destinationCity;
        this.selectedDate = selectedDate;
        this.departureIata = departureIata;
        this.destinationIata = destinationIata;
        this.isReturn = isReturn;

      });

      bus.$on('returnSelectedflight', (event, departureCity, destinationCity, selectedDate, departureIata, destinationIata) => {
        this.returnActualFlight = event;
        this.isTicketsShow = true;
        this.returnDepartureCity = destinationCity;
        this.returnDestinationCity = departureCity;
        this.returnSelectedDate = selectedDate;
        this.returnDepartureIata = departureIata;
        this.returnDestinationIata = destinationIata;

      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/partials/variables";
  @import "../../styles/bootstrap/bootstrap";

  .tickets-row {
    margin-top: 20px;
    margin-bottom: 35px;
    box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 3px 3px;
    .tickets-header {
      height: 55px;
      background: #f2f2f2;
      border-radius: 3px 3px 0 0;
      .outbound {
        float: left;
        font-weight: bold;
        font-size: 18px;
        color: #919191;
        text-transform: uppercase;
        position: absolute;
      }
      .ticket-route {
        font-size: 22px;
        color: $blue;
        .arrow {
          width: 32px;
          height: 11px;
          background: url("../../assets/arrow_single.svg");
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
          background: url("../../assets/arrow_dateselect.svg");
          transform: rotate(180deg);
          float: left;
          margin: 0 20px 0 6px;
        }
        &.arrow-right {
          background: url("../../assets/arrow_dateselect.svg");
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
        background: url("../../assets/arrow_dates_small.svg");
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
        }
      }
    }
  }

  .tickets-descriptions {
    border-bottom: 1px solid $background;
    .ticket-category-description {
      padding: 0 8px;
      color: $dark;
      .title {
        font-size: 12px;
        font-weight: bold;
        padding: 20px 0;
        text-transform: uppercase;
      }
      .ticket-description-list {
        li {
          text-align: left;
          &:before {
            background: #919191;
            border-radius: 50%;
            content: "";
            display: inline-block;
            margin-right: 5px;
            margin-bottom: 3px;
            height: 4px;
            width: 4px;
          }
        }
      }
    }
  }
</style>

