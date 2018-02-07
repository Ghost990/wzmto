<template>
  <div class="col-xl-3 col-lg-3 col-md-3 col-12 sidebar">
    <button class="wizz-button wizz-button-primary rounded show-details-trigger d-sm-block d-lg-none d-xl-none d-md-one" data-toggle="collapse" data-target="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
      Show Details
    </button>
    <section class="collapse" id="collapseExample">
      <div class="row sidebar-section no-gutters">
        <div class="col sidebar-wrap">
          <div class="sidebar-subtitle">
            <h3 class="subtitle">
              Flights
            </h3>
          </div>
          <div class="row sidebar-single-row">
            <div class="col-8 item-name">
              Checked-in bags
            </div>
            <div class="col-4 item-price text-right">
              €129
            </div>
          </div>
          <div class="row sidebar-single-row">
            <div class="col-8 item-name">
              Return
            </div>
            <div class="col-4 item-price text-right">
              €89
            </div>
          </div>
        </div>
        <div class="divider">
          <span class="chevron"></span>
        </div>
      </div>
      <div class="row sidebar-section no-gutters">
        <div class="col sidebar-wrap">
          <div class="sidebar-subtitle">
            <h3 class="subtitle">
              Bundle
            </h3>
          </div>
          <div class="row sidebar-single-row">
            <div class="col-8 item-name">
              Basic
            </div>
            <div class="col-4 item-price text-right">
              €0
            </div>
          </div>
        </div>
        <div class="divider">
          <span class="chevron"></span>
        </div>
      </div>
      <div class="row sidebar-section no-gutters">
        <div class="col sidebar-wrap">
          <div class="sidebar-subtitle">
            <h3 class="subtitle">
              Passengers
            </h3>
          </div>
          <div class="row sidebar-single-row">
            <div class="col-8 item-name">
              Cabin bags
            </div>
            <div class="col-4 item-price text-right">
              €10
            </div>
          </div>
          <div class="row sidebar-single-row">
            <div class="col-8 item-name">
              Checked-in bags
            </div>
            <div class="col-4 item-price text-right">
              €0
            </div>
          </div>
          <div class="row sidebar-single-row">
            <div class="col-8 item-name">
              Seats
            </div>
            <div class="col-4 item-price text-right">
              €0
            </div>
          </div>
        </div>
        <div class="divider">
          <span class="chevron"></span>
        </div>
      </div>
      <div class="row sidebar-section no-gutters">
        <div class="col sidebar-wrap">
          <div class="sidebar-subtitle">
            <h3 class="subtitle">
              Services
            </h3>
          </div>
          <div class="row sidebar-single-row">
            <div class="col-8 item-name">
              Priority boarding
            </div>
            <div class="col-4 item-price text-right">
              €15
            </div>
          </div>
        </div>
      </div>
      <div class="row total-row no-gutters">
        <div class="total-button align-items-center d-flex">
        <span class="col text-left">
            Total
        </span>
          <span class="col text-right">
            €{{ isTicketSelected ? getTotal : 0 }}
        </span>
        </div>
      </div>
      <div class="row sidebar-section no-gutters">
        <div class="col sidebar-wrap">
          <div class="sidebar-subtitle">
            <h3 class="subtitle text-center">
              Booking & Payment
            </h3>
          </div>
        </div>
        <div class="divider"></div>
      </div>
      <div class="row sidebar-section discount-section no-gutters">
        <div class="col sidebar-wrap">
          <div class="sidebar-subtitle">
            <h3 class="subtitle text-center">
              Discount Club Price
            </h3>
          </div>
          <div class="row total-newprice no-gutters">
            <div class="col text-left">
              Total
            </div>
            <div class="col text-right">
              €{{ isTicketSelected ? getTotal : 0 }}
            </div>
          </div>
          <div class="row total-oldprice no-gutters">
            <div class="col-8 text-left">
              Original Price
            </div>
            <div class="col text-right">
              €{{ isTicketSelected ? getOriginalPrice : 0 }}
            </div>
          </div>
        </div>
      </div>
      <div class="row join-club align-items-center d-flex">
        <button class="join-club-button">
          Join Discount Club
        </button>
      </div>
    </section>
  </div>
</template>

<script>
  import { bus } from '../../main';

  /**
   * The Sidebar component.
   */

  export default {
    name: 'wizz-sidebar',
    data() {
      return {
        selectedTicket: '',
        returnSelectedTicket: '',
        isReturnTicketSelected: false,
        isTicketSelected: false,
        total: '0'
      }
    },
    computed: {
      /**
       * Calculating the single and total price of the selected tickets.
       */
      getTotal() {
        if (this.isReturnTicketSelected) {
          return this.selectedTicket.price + this.returnSelectedTicket.price;
        } else {
          return this.selectedTicket.price
        }
      },
      /**
       * Adding 19.5% to the price to get a higher price than the calculated, this way the discount is visible and separable
       */
      getOriginalPrice() {
        if (this.isReturnTicketSelected) {
          return Math.floor(((this.selectedTicket.price + this.returnSelectedTicket.price) * 1.195));
        } else {
          return Math.floor(this.selectedTicket.price * 1.195);
        }
      }
    },
    created() {
      bus.$on('ticketdata', (event, selectedTicket, isTicketSelected) => {
        this.flight = event;
        this.selectedTicket = selectedTicket;
        this.isTicketSelected = isTicketSelected;
      });

      bus.$on('returnticketdata', (event, returnSelectedTicket, isReturnSelected) => {
        this.isReturnTicketSelected = isReturnSelected;
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
    font-size: 1rem;
    text-transform: uppercase;
    color: $blue !important;
    font-weight: bold;
  }

  .sidebar {
    @include media-breakpoint-down(md) {
      margin-bottom: 15px;
    }
    .sidebar-section {
      position: relative;
      padding-top: 20px;
      padding-bottom: 20px;
      &:first-of-type {
        padding-top: 0;
      }
      .sidebar-wrap {
        //border-bottom: 1px dashed $light;
        margin-right: 28px;
        padding: 0 0 0 10px;
      }
      .sidebar-single-row {
        .item-price {
          color: $blue;
        }
      }
    }
    .total-row {
      .total-button {
        width: 100%;
        background: $blue;
        color: white;
        font-weight: bold;
        height: 53px;
        border-radius: 3px;
        font-size: 1rem;
        cursor: pointer;
        border: none;
        @include transition(transition, 0.5s);
        span {
          padding: 0 15px;
        }
        &:hover {
          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.4);
        }
      }
    }
    .discount-section {
      background: white;
      padding: 20px 10px;
      border-radius: 3px;
      .sidebar-subtitle {
        border-bottom: 1px solid $background;
        .subtitle {
          font-size: 0.75rem;
        }
      }
      .total-newprice {
        margin: 20px 0 10px 0;
        div {
          color: $blue;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 1rem;
        }
      }
      .total-oldprice {
        div {
          color: $light;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 0.875rem;
        }
      }
    }
    .join-club {
      text-align: center;
      margin: 0;
      .join-club-button {
        height: 48px;
        background: $pink;
        color: white;
        font-weight: bold;
        font-size: 0.875rem;
        width: 100%;
        border-radius: 3px;
        margin-top: -2px;
        z-index: 1;
        border: none;
        cursor: pointer;
        @include transition(transition, 0.5s);
        &:hover {
          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.4);
        }
      }
    }
  }

  .divider {
    border-bottom: 1px dashed $light;
    padding: 10px 0;
    position: relative;
    width: 100%;
    margin-right: 14px;
    .chevron {
      display: block;
      width: 15px;
      height: 15px;
      background: $background;
      border-width: 1px;
      border-style: solid;
      border-color: transparent $light $light transparent;
      position: absolute;
      left: 50%;
      margin-right: -50%;
      transform: rotate(45deg);
      margin-top: 2px;
    }
  }

  .collapse {
    @include media-breakpoint-up(sm) {
      display: block;
    }
  }

  .show-details-trigger {
    margin: 15px 0;
  }
</style>
