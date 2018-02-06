<template>
  <div>
    <b-modal ref="myModalRef" id="myModal">
      <p>
        We are wishing you the best time on your flight from {{ departureCity }} to {{ destinationCity }}.
      </p>
      <p v-show="isReturnTicketSelected">
        And the return from {{ returnDepartureCity }} to {{ returnDestinationCity }}.
      </p>

      <div slot="modal-title">
        <h3>Thank You for your order!</h3>
      </div>
      <div style="width: 100%;" slot="modal-footer" class="d-flex align-items-center justify-content-center">
        <button @click="hideModal" class="wizz-button wizz-button-primary rounded">
          Close
        </button>
      </div>
    </b-modal>
    <div class="row summary-row">
      <div class="col-12 summary">
        <div class="row">
          <div class="col-12 summary-main">
            <h3>
              Your flight Summary
            </h3>
          </div>
        </div>
        <div class="row departure-date date-row">
          <div class="col-12">
            <h4 class="row-title">
              Outbound
            </h4>
            <div class="row">
              <div class="col-sm-5 col-6">
                {{ departureCity }} <span class="arrow"></span> {{ destinationCity }}
              </div>
              <div class="col-sm-3 col-6 text-center">
                <time>{{ moment(flight.departure).format('HH:mm') }}</time>
                <span class="arrow"></span>
                <time>{{ moment(flight.arrival).format('HH:mm') }}</time>
              </div>
              <div class="col-sm-3 col-6 text-capitalize text-center">
                {{ selectedTicket.bundle }} Ticket
              </div>
              <div class="col-sm-1 col-6 text-center">
                €{{ selectedTicket.price }}
              </div>
            </div>
          </div>

        </div>
        <div class="row return-date date-row" v-if="isReturnTicketSelected">
          <div class="col-12">
            <h4 class="row-title">
              Return
            </h4>
            <div class="row">
              <div class="col-sm-5 col-6">
                {{ returnDepartureCity }} <span class="arrow"></span> {{ returnDestinationCity }}
              </div>
              <div class="col-sm-3 col-6 text-center">
                <time>{{ moment(returnFlight.departure).format('HH:mm') }}</time>
                <span class="arrow"></span>
                <time>{{ moment(returnFlight.arrival).format('HH:mm') }}</time>
              </div>
              <div class="col-sm-3 col-6 text-capitalize text-center">
                {{ returnSelectedTicket.bundle }} Ticket
              </div>
              <div class="col-sm-1 col-6 text-center">
                €{{ returnSelectedTicket.price }}
              </div>
            </div>
          </div>
        </div>
        <div class="row date-row total-row">
          <div class="col-sm-6 col-12">
            <h4 class="font-weight-bold total-summary">
              Total: €{{ getTotal }}
            </h4>
          </div>
          <div class="col-sm-6 col-12">
            <button class="wizz-button wizz-button-secondary rounded" v-b-modal="'myModal'">
              Order & Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { bus } from '../../main';
  import bModal from 'bootstrap-vue/es/components/modal/modal';

  export default {
    data() {
      return {
        flight: '',
        selectedTicket: '',
        departureCity: '',
        destinationCity: '',

        returnFlight: '',
        returnSelectedTicket: '',
        isReturnTicketSelected: false,
        returnDepartureCity: '',
        returnDestinationCity: '',

        total: ''
      }
    },
    props: ['selectedDepartureDate'],
    computed: {
      getTotal() {
        if (this.isReturnTicketSelected) {
          return this.selectedTicket.price + this.returnSelectedTicket.price;
        } else {
          return this.selectedTicket.price
        }
      }
    },
    methods: {
      hideModal () {
        this.$refs.myModalRef.hide()
      }
    },
    created() {
      bus.$on('ticketdata', (event, selectedTicket) => {
        this.flight = event;
        this.selectedTicket = selectedTicket;
      });

      bus.$on('returnticketdata', (event, returnSelectedTicket, isReturnSelected) => {
        this.isReturnTicketSelected = isReturnSelected;
        this.returnFlight = event;
        this.returnSelectedTicket = returnSelectedTicket;
      });

      bus.$on('selectedflight', (event, departureCity, destinationCity, selectedDate, departureIata, destinationIata, isReturn) => {
        this.departureCity = departureCity;
        this.destinationCity = destinationCity;
      });

      bus.$on('returnselectedflight', (event, departureCity, destinationCity, selectedDate, departureIata, destinationIata, isReturn) => {
        this.returnDepartureCity = destinationCity;
        this.returnDestinationCity = departureCity;
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/partials/variables";
  @import "../../styles/bootstrap/bootstrap";

  h3 {
    font-size: 24px;
    text-transform: uppercase;
    text-align: center;
  }

  h4 {
    font-size: 20px;
  }

  p {
    font-size: 18px;
  }

  .date-row {
    .col-6 {
      @include media-breakpoint-down(md) {
        text-align: left !important;
        margin: 15px 0;
      }
    }
  }

  .summary-row {
    margin-bottom: 30px;
    font-size: 18px;
    .date-row {
      margin: 15px 0;
      .total-summary {
        font-size: 24px;
        margin: 5px 0;
        padding-top: 10px;
        @include media-breakpoint-down(md) {
          text-align: center;
        }
      }
      &.return-date {
        border-top: 1px solid #eee;
        padding-top: 10px;
      }
      .row-title {
        font-weight: bold;
        color: $blue;
      }
    }
    .total-row {
      padding: 25px 0;
    }
    .arrow {
      display: inline-block;
      width: 25px;
      height: 8px;
      background: url("../../assets/arrow_dates_small.svg");
      margin: 0 10px;
    }
    .summary {
      border-radius: 3px;
      background: white;
      box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.1);
      padding: 0 20px;
      position: relative;
      padding: 25px;
      .summary-main {
        p {
          opacity: .6;
        }
      }
    }
  }
</style>
