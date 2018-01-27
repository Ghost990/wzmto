<template>
  <section class="col-xl-9 col-lg-9 col-md-9 col-12">
    <wizz-discounts></wizz-discounts>
    <div class="row tickets-row">
      <div class="col-12">
        <div class="row tickets-header align-items-center">
          <div class="col-12">
            <div class="outbound">
              Outbound
            </div>
            <div class="ticket-route text-center">
              Budapest
              <span class="arrow"></span>
              Barcelona El Prat
            </div>
          </div>
        </div>
        <div class="row tickets-dates align-items-center">
          <div class="col-xl-4 col-lg-4 col-md-4 col-12">
            <span class="arrow arrow-left"></span>
            <span class="date date-left">
                {{ new Date() | moment("subtract", "1 day", "ddd D MMMM") }}
            </span>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12 actual-date">
            {{ new Date() | moment("dddd, Do MMMM YYYY") }}
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-12">
            <span class="arrow arrow-right"></span>
            <span class="date date-right">
                {{ new Date() | moment("add", "1 day", "ddd D MMMM") }}
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
            <div class="row time-row align-items-center">
              <div class="col-3">
                06:05
                <span class="arrow"></span>
                08:20
              </div>
              <div class="col">
                <div class="row">
                  <div class="col-4 text-center single-ticket-wrapper">
                    <button class="single-ticket align-items-center justify-content-center d-flex">
                      €9.99
                    </button>
                  </div>
                  <div class="col-4 text-center single-ticket-wrapper grey-bg">
                    <button class="single-ticket align-items-center justify-content-center d-flex">
                      €19.99
                    </button>
                  </div>
                  <div class="col-4 text-center single-ticket-wrapper">
                    <button class="single-ticket align-items-center justify-content-center d-flex">
                      €29.99
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row time-row align-items-center">
              <div class="col-3">
                09:15
                <span class="arrow"></span>
                10:20
              </div>
              <div class="col">
                <div class="row">
                  <div class="col-4 text-center single-ticket-wrapper">
                    <button class="single-ticket align-items-center justify-content-center d-flex">
                      €9.99
                    </button>
                  </div>
                  <div class="col-4 text-center single-ticket-wrapper grey-bg">
                    <button class="single-ticket align-items-center justify-content-center d-flex">
                      €19.99
                    </button>
                  </div>
                  <div class="col-4 text-center single-ticket-wrapper">
                    <button class="single-ticket align-items-center justify-content-center d-flex">
                      €29.99
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row time-row align-items-center">
              <div class="col-3">
                17:15
                <span class="arrow"></span>
                18:20
              </div>
              <div class="col">
                <div class="row">
                  <div class="col-4 text-center single-ticket-wrapper">
                    <button class="single-ticket align-items-center justify-content-center d-flex">
                      €9.99
                    </button>
                  </div>
                  <div class="col-4 text-center single-ticket-wrapper grey-bg">
                    <button class="single-ticket align-items-center justify-content-center d-flex">
                      €19.99
                    </button>
                  </div>
                  <div class="col-4 text-center single-ticket-wrapper">
                    <button class="single-ticket align-items-center justify-content-center d-flex">
                      €29.99
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
            <div class="row more-dates">
              <div class="col-12">
                <div class="row more-dates-header align-items-center">
                  <div class="more-dates-title">
                    More Dates
                  </div>
                  <div class="more-dates-view-selector">
                    <div class="calenar active">
                      <a href="#">
                        Calendar
                      </a>
                    </div>
                    <div class="charts">
                      <a href="#">
                        Charts
                      </a>
                    </div>
                  </div>
                </div>
                <div class="row more-dates-content align-items-center">
                  <div class="col-1">
                    <span class="arrow arrow-left"></span>
                  </div>
                  <div class="col date-traffic">
                    <div class="month">
                      <div class="month-name">
                        October
                      </div>
                      <div class="single-day">
                        <div class="date">
                          Mon 28
                        </div>
                        <div class="fullness">
                          <span class="full-1 full"></span>
                          <span class="full-2 full"></span>
                          <span class="full-3 full"></span>
                          <span class="full-4 full"></span>
                        </div>
                      </div>
                      <div class="single-day">
                        <div class="date">
                          Tue 29
                        </div>
                        <div class="fullness">
                          <span class="full-1 full d-none"></span>
                          <span class="full-2 full d-none"></span>
                          <span class="full-3 full"></span>
                          <span class="full-4 full"></span>
                        </div>
                      </div>
                    </div>
                    <div class="month">
                      <div class="month-name">
                        November
                      </div>
                      <div class="single-day">
                        <div class="date">
                          Thu 1
                        </div>
                        <div class="fullness">
                          <span class="full-1 full d-none"></span>
                          <span class="full-2 full d-none"></span>
                          <span class="full-3 full d-none"></span>
                          <span class="full-4 full"></span>
                        </div>
                      </div>
                      <div class="single-day">
                        <div class="date">
                          Fri 2
                        </div>
                        <div class="fullness">
                          <span class="full-1 full d-none"></span>
                          <span class="full-2 full d-none"></span>
                          <span class="full-3 full"></span>
                          <span class="full-4 full"></span>
                        </div>
                      </div>
                      <div class="single-day active">
                        <div class="date">
                          Sat 3
                        </div>
                        <div class="fullness">
                          <span class="full-1 full d-none"></span>
                          <span class="full-2 full d-none"></span>
                          <span class="full-3 full"></span>
                          <span class="full-4 full"></span>
                        </div>
                      </div>
                      <div class="single-day">
                        <div class="date">
                          Sun 4
                        </div>
                        <div class="fullness">
                          <span class="full-1 full"></span>
                          <span class="full-2 full"></span>
                          <span class="full-3 full"></span>
                          <span class="full-4 full"></span>
                        </div>
                      </div>
                      <div class="single-day not-available">
                        <div class="date">
                          Mon 5
                        </div>
                        <div class="fullness">
                          <span class="full-1 full"></span>
                          <span class="full-2 full"></span>
                          <span class="full-3 full"></span>
                          <span class="full-4 full"></span>
                        </div>
                      </div>
                      <div class="single-day">
                        <div class="date">
                          Tue 6
                        </div>
                        <div class="fullness">
                          <span class="full-1 full d-none"></span>
                          <span class="full-2 full d-none"></span>
                          <span class="full-3 full"></span>
                          <span class="full-4 full"></span>
                        </div>
                      </div>
                      <div class="single-day">
                        <div class="date">
                          Wed 7
                        </div>
                        <div class="fullness">
                          <span class="full-1 full"></span>
                          <span class="full-2 full"></span>
                          <span class="full-3 full"></span>
                          <span class="full-4 full"></span>
                        </div>
                      </div>
                      <div class="single-day">
                        <div class="date">
                          Thu 8
                        </div>
                        <div class="fullness">
                          <span class="full-1 full d-none"></span>
                          <span class="full-2 full d-none"></span>
                          <span class="full-3 full"></span>
                          <span class="full-4 full"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-1">
                    <span class="arrow arrow-right"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import DiscountCard from './ticketsDiscount.vue';

  export default {
    components: {
      'wizz-discounts': DiscountCard
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

  .more-dates {
    .more-dates-header {
      text-transform: uppercase;
      height: 50px;
      position: relative;
      .more-dates-title {
        font-weight: bold;
        font-size: 14px;
        margin-left: 20px;
        display: inline-block;
      }
      .more-dates-view-selector {
        right: 20px;
        position: absolute;
        display: inline-block;
        div {
          display: inline-block;
          font-size: 12px;
          font-weight: bold;
          @include transition(transition, 0.5s);
          &:first-of-type {
            margin-right: 20px;
          }
          &.active {
            color: $pink;
            border-bottom: 1px solid $pink;
            a {
              color: $pink;
              &:hover {
                opacity: 1;
                color: $pink;
              }
            }
            &:hover {
              color: $pink;
            }
          }
        }
      }
    }
    .more-dates-content {
      height: 140px;
      background: $background;
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
      .date-traffic {
        .month {
          display: inline-block;
          .month-name {
            color: $light;
            text-transform: uppercase;
            margin: 10px 0;
            display: block;
          }
          .single-day {
            width: 50px;
            height: 80px;
            text-align: center;
            border: 1px solid #e5e5e5;
            border-radius: 3px;
            display: inline-block;
            margin: 0 2.5px;
            cursor: pointer;
            .date {
              font-weight: bold;
              background: white;
              font-size: 12px;
            }
            .fullness {
              height: 60px;
              position: relative;
              .full {
                background: #e1e1e1;
                display: block;
                height: 25%;
                width: 100%;
                position: absolute;
                &.full-4 {
                  bottom: 0;
                }
                &.full-3 {
                  bottom: 25%;
                }
                &.full-2 {
                  bottom: 50%;
                }
                &.full-1 {
                  bottom: 75%;
                }
              }
            }
            &.not-available {
              .fullness {
                top: 50%;
                left: 50%;
                margin-right: -50%;
                transform: translate(-50%, -50%);
                width: 25px;
                height: 25px;
                background: url("../../assets/icon-x.svg");
                .full {
                  display: none;
                }
              }
            }
            &.active {
              border: 2px solid $pink;
              .fullness {
                .full {
                  background: $pink;
                }
              }
            }
            &:hover {
              outline: 1px solid $pink;
            }
          }
        }
      }
    }
  }
</style>

