<template>
  <div>
    <div class="row time-row align-items-center" @click="busData(flight)" v-for="(flight, key) in returnFlights" :key="flight.flightNumber">
      <div class="col-12 col-sm-3 ticket-dates">
        <time>{{ moment(flight.departure).format('HH:mm') }}</time>
        <span class="arrow"></span>
        <time>{{ moment(flight.arrival).format('HH:mm') }}</time>
      </div>
      <div class="col">
        <div class="row">
          <div class="col-4 text-center single-ticket-wrapper" v-for="(price, key) in flight.fares">
            <button :class="{'selected': returnSelectedTicket === price}" class="single-ticket align-items-center justify-content-center d-flex" v-if="flight.remainingTickets > 0" v-model="returnSelectedTicket" @click="returnSelectTicket(price, $event, key)">
              €{{ price.price }}
            </button>
            <button disabled v-else class="single-ticket single-ticket-notickets align-items-center justify-content-center d-flex">
              No tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { bus } from '../../main';

  /**
   * TicketsRowReturn component.
   *
   * @author Zsolt Nagy
   * @license MIT
   */

  export default {
    name: 'wizz-tickets-row-return',
    data() {
      return {
        returnSelectedTicket: '',
        returnSelectedFlight: '',
        returnTicketSelected: false
      }
    },
    methods: {
      /**
       * Setting the selected flight inforations and emitting the data.
       */
      busData(flight) {
        this.returnSelectedFlight = flight;
        bus.$emit('returnticketdata', this.returnSelectedFlight, this.returnSelectedTicket, this.returnTicketSelected);
      },
      returnSelectTicket(ticket, event) {
        this.returnTicketSelected = true;
        this.returnSelectedTicket = ticket;
        event.target.classList.add('selected');
      }
    },
    /**
     * The actual flight informations is passing down from parent as a prop.
     */
    props: ['returnFlights']
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/partials/variables";
  @import "../../styles/bootstrap/bootstrap";

  .time-row {
    border-bottom: 1px solid $background;
    @include media-breakpoint-down(md) {
      margin: 10px 0;
    }
    .ticket-dates {
      @include media-breakpoint-down(md) {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
      }
    }
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
</style>
