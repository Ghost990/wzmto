<template>
  <div class="row">
    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12 offset-xl-3 offset-lg-3 offset-md-3 main-text">
      <span class="flight-icon"></span>
      <h1 class="page-title">
        Select Flights
      </h1>
    </div>
  </div>
</template>

<script>
  /**
   * The TitleBar static component.
   */
  export default {
    name: 'wizz-title-bar'
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/partials/variables";
  @import "../../styles/bootstrap/bootstrap";

  .main-text {
    padding: 39px 0 29px 0;
    margin-top: 60px;
    @include media-breakpoint-down(md) {
      margin-top: 0;
    }
    .page-title {
      color: $blue;
      font-size: 2.5rem;
      text-transform: uppercase;
      display: inline-block;
      margin: 0;
      @include media-breakpoint-down(md) {
        font-size: 1.5rem;
        text-align: center;
        width: 100%;
      }
    }
    .flight-icon {
      width: 37px;
      height: 39px;
      background: url("../../assets/plane.svg");
      display: inline-block;
      margin-right: 20px;
      @include media-breakpoint-down(md) {
        display: none;
      }
    }
  }
</style>

