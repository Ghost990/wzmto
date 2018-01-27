<template>
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
</template>

<script></script>

<style lang="scss" scoped>
  @import "../../styles/partials/variables";
  @import "../../styles/bootstrap/bootstrap";

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
