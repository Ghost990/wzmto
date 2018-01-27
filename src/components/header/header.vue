<template>
  <div class="info-bar">
    <div class="container">
      <div class="row align-items-center inner">
        <div class="col-xl-1 col-lg-1 col-md-1 col-12">
          <div class="logo"></div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-12 offset-xl-1 offset-lg-1 offset-md-1 routes">
          <div class="route route-from">
            <div class="leaving-from-text">
              Leaving From
            </div>
            <div class="city-airport">
              Budapest <span class="city-shortname">BUD</span>
            </div>
          </div>
          <div class="arrows"></div>
          <div class="route route-to">
            <div class="city-airport">
              Barcelona El Prat <span class="city-shortname">BCN</span>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 offset-xl-1 offset-lg-1 offset-md-1 passengers">
          <div class="passengers-text">
            Passengers
          </div>
          <div class="profile adult">
            3 <span class="profile-adult"></span>
          </div>
          <div class="profile children">
            2 <span class="profile-children"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
  @import '../../styles/partials/variables';
  @import "../../styles/bootstrap/bootstrap";

  .info-bar {
    height: 60px;
    background: $blue;
    color: white;
    //position: fixed;
    width: 100%;
    z-index: 1;
    @include transition(transition, 0.5s);
    .inner {
      height: 60px;
      .logo {
        width: 24px;
        height: 24px;
        background: url("../../assets/logo.svg");
      }
      .routes {
        .route {
          display: inline-block;
          .leaving-from-text {
            font-size: 12px;
            text-transform: uppercase;
          }
          .city-airport {
            font-size: 20px;
            .city-shortname {
              text-transform: uppercase;
              opacity: .6;
            }
          }
        }
        .arrows {
          width: 29px;
          height: 21px;
          background: url("../../assets/arrows.svg");
          display: inline-block;
          margin: 0 25px;
        }
      }
      .passengers {
        .passengers-text {
          font-size: 12px;
          text-transform: uppercase;
        }
        .profile {
          display: inline-block;
          font-size: 20px;
          &:last-of-type {
            margin-left: 20px;
          }
          .profile-adult {
            width: 16px;
            height: 19px;
            background: url("../../assets/profile.svg");
            display: inline-block;
          }
          .profile-children {
            width: 13px;
            height: 14px;
            background: url("../../assets/profile_small.svg");
            display: inline-block;
          }
        }
      }
    }
    &.shadow {
      box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.4);
    }
  }
</style>
