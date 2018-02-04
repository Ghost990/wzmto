<template>
  <div class="row time-row align-items-center" @click="busData">
    <div class="col-3">
      {{ returnFlight.departure | moment("HH:mm") }}
      <span class="arrow"></span>
      {{ returnFlight.arrival | moment("HH:mm") }}
    </div>
    <div class="col">
      <div class="row">
        <div class="col-4 text-center single-ticket-wrapper" v-for="price in returnFlight.fares">
          <button class="single-ticket align-items-center justify-content-center d-flex" v-if="returnFlight.remainingTickets > 0" v-model="selectedTicket" @click="returnSelectTicket(price, $event)">
            €{{ price.price }}
          </button>
          <button disabled v-else class="single-ticket single-ticket-notickets align-items-center justify-content-center d-flex">
            No tickets
          </button>
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
        selectedTicket: '',
        returnSelectedTicket: ''
      }
    },
    methods: {
      busData() {
        bus.$emit('returnticketdata', this.returnFlight, this.returnSelectedTicket);
      },
      selectTicket(ticket, event) {
        this.selectedTicket = ticket;
        event.target.classList.add('selected');
      },
      returnSelectTicket(ticket, event) {
        this.returnSelectedTicket = ticket;
        event.target.classList.add('selected');
      }
    },
    created() {

    },
    props: ['returnFlight']
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/partials/variables";
  @import "../../styles/bootstrap/bootstrap";

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
</style>
