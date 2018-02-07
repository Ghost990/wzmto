<template>
  <nav class="info-bar" id="infobar">
    <div class="container">
      <div class="row align-items-center inner">
        <div class="col-xl-1 col-lg-1 col-md-1 col-12 d-none d-md-block">
          <div class="logo"></div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-12 offset-xl-1 offset-lg-1 offset-md-1 routes">
          <div class="route route-from">
            <div class="leaving-from-text d-none d-md-block">
              Leaving From
            </div>
            <div class="city-airport">
              {{ departureCity }} <span class="city-shortname">{{ departureIata }}</span>
            </div>
          </div>
          <div class="arrows"></div>
          <div class="route route-to">
            <div class="city-airport">
              {{ destinationCity }} <span class="city-shortname">{{ destinationIata }}</span>
            </div>
          </div>
        </div>
        <div class="col-md-3 offset-xl-1 offset-lg-1 offset-md-1 passengers d-none d-md-block">
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

  </nav>
</template>

<script>
  import { bus } from '../../main';

  /**
   * The Header component.
   */

  export default {
    name: 'wizz-header',
    data() {
      return {
        departureCity: 'Budapest',
        destinationCity: 'Barcelona El Prat',
        departureIata: 'BUD',
        destinationIata: 'BCN',
        scrollPosition: 0
      }
    },
    methods: {
      handleScroll(event) {
        let scrollpos = window.scrollY;
        let header = document.getElementById('infobar');
        if (scrollpos >= 100) {
          header.classList.add('shadow');
        } else {
          header.classList.remove('shadow');
        }
      }
    },
    created() {
      bus.$on('selectedflight', (event, departureCity, destinationCity, selectedDate, departureIata, destinationIata) => {
        this.departureCity = departureCity;
        this.destinationCity = destinationCity;
        this.departureIata = departureIata;
        this.destinationIata = destinationIata;
      });
      /**
       * If there is value in localStorage then listening to it and fill the selected city and iata values. If not the
       * default is used from the provided PSD file.
       */
      let value = this.$ls.get('departure');
      if (value !== null) {
        this.departureCity = value[7];
        this.destinationCity = value[2];
        this.departureIata = value[5];
        this.destinationIata = value[6];
      }

      window.addEventListener('scroll', this.handleScroll);

    },
  }
</script>

<style lang="scss" scoped>
  @import '../../styles/partials/variables';
  @import "../../styles/bootstrap/bootstrap";

  .info-bar {
    height: 60px;
    background: $blue;
    color: white;
    position: fixed;
    width: 100%;
    z-index: 1;
    @include media-breakpoint-down(md) {
      position: relative;
    }
    @include transition(transition, 0.5s);
    .inner {
      height: 60px;
      .logo {
        width: 24px;
        height: 24px;
        background: url("../../assets//logo.svg");
      }
      .routes {
        @include media-breakpoint-down(md) {
          text-align: center;
        }
        .route {
          display: inline-block;
          .leaving-from-text {
            font-size: 0.75rem;
            text-transform: uppercase;
          }
          .city-airport {
            font-size: 1.25rem;
            @include media-breakpoint-down(md) {
              font-size: 0.875rem;
            }
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
          @include media-breakpoint-down(md) {
            width: 19px;
            height: 11px;
            -webkit-background-size: 19px 11px;
            background-size: 19px 11px;
          }
        }
      }
      .passengers {
        .passengers-text {
          font-size: 0.75rem;
          text-transform: uppercase;
        }
        .profile {
          display: inline-block;
          font-size: 1.25rem;
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
