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
      <div class="row">
        <div class="col-6">
          <h4>
            Selected Route
          </h4>
        </div>
        <div class="col-6">
          {{ flight.departure | moment("HH:mm") }} -> {{ flight.arrival | moment("HH:mm") }}
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <h4>
            Return
          </h4>
        </div>
        <div class="col-6">
          {{ flight.arrival | moment("HH:mm") }} -> {{ flight.departure | moment("HH:mm") }}
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          Total: {{ selectedTicket }}
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
        selectedTicket: ''
      }
    },
    props: ['selectedDepartureDate'],
    created() {
      bus.$on('ticketdata', (event, selectedTicket) => {
        this.flight = event;
        this.selectedTicket = selectedTicket;
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/partials/variables";
  @import "../../styles/bootstrap/bootstrap";

  h3 {
    font-size: 18px;
    text-transform: uppercase;
    text-align: center;
  }

  h4 {
    font-size: 16px;
  }

  .summary-row {
    margin-bottom: 30px;
    .summary {
      border-radius: 3px;
      background: white;
      box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.1);
      padding: 0 20px;
      position: relative;
      padding: 25px;
      .summary-main {
        p {
          font-size: 16px;
          opacity: .6;
        }
      }
      .summary-details {

      }
    }
  }
</style>
