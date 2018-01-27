<template>
  <section class="col-xl-3 col-lg-3 col-md-3 col-12 sidebar">
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
      <button class="total-button align-items-center d-flex">
                                  <span class="col text-left">
                                      Total
                                  </span>
        <span class="col text-right">
                                      123
                                  </span>
      </button>
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
            €182
          </div>
        </div>
        <div class="row total-oldprice no-gutters">
          <div class="col-8 text-left">
            Original Price
          </div>
          <div class="col text-right">
            €226
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
</template>

<script></script>

<style lang="scss" scoped>
  @import "../../styles/partials/variables";
  @import "../../styles/bootstrap/bootstrap";

  h3 {
    font-size: 16px;
    text-transform: uppercase;
    color: $blue !important;
    font-weight: bold;
  }

  .sidebar {
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
        font-size: 16px;
        cursor: pointer;
        border: none;
        @include transition(transition, 0.5s);
        span {
          padding: 0 10px;
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
          font-size: 12px;
        }
      }
      .total-newprice {
        margin: 20px 0 10px 0;
        div {
          color: $blue;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 16px;
        }
      }
      .total-oldprice {
        div {
          color: $light;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 14px;
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
        font-size: 14px;
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
</style>
