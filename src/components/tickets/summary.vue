<template>
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
        <div class="col-3">
          <h4>
            Outbound
          </h4>
        </div>
        <div class="col-3 text-center">
          {{ flight.departure | moment("HH:mm") }}
          <span class="arrow"></span>
          {{ flight.arrival | moment("HH:mm") }}
        </div>
        <div class="col-3 text-capitalize text-center">
          {{ selectedTicket.bundle }} Ticket
        </div>
        <div class="col-3 text-center">
          €{{ selectedTicket.price }}
        </div>
      </div>
      <div class="row return-date date-row">
        <div class="col-3">
          <h4>
            Return
          </h4>
        </div>
        <div class="col-3 text-center">
          {{ returnFlight.departure | moment("HH:mm") }}
          <span class="arrow"></span>
          {{ returnFlight.arrival | moment("HH:mm") }}
        </div>
        <div class="col-3 text-capitalize text-center">
          {{ returnSelectedTicket.bundle }} Ticket
        </div>
        <div class="col-3 text-center">
          €{{ returnSelectedTicket.price }}
        </div>
      </div>
      <div class="row date-row font-weight-bold">
        <div class="col-3">
          <h4>
            Total:
          </h4>
        </div>
        <div class="col total">
          €{{ getTotal }}
        </div>
      </div>
      </div>
    </div>
</template>

<script>
  import { bus } from '../../main';

  export default {
    data() {
      return {
        flight: '',
        selectedTicket: '',

        returnFlight: '',
        returnSelectedTicket: '',

        total: ''
      }
    },
    props: ['selectedDepartureDate'],
    computed: {
      getTotal() {
        return this.selectedTicket.price + this.returnSelectedTicket.price;
      }
    },
    created() {
      bus.$on('ticketdata', (event, selectedTicket) => {
        this.flight = event;
        this.selectedTicket = selectedTicket;
      });

      bus.$on('returnticketdata', (event, returnSelectedTicket) => {
        this.returnFlight = event;
        this.returnSelectedTicket = returnSelectedTicket;
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

  .summary-row {
    margin-bottom: 30px;
    font-size: 18px;
    .date-row {
      margin: 15px 0;
    }
    .total {
      font-size: 22px;
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
      .summary-details {

      }
    }
  }
</style>