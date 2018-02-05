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

<script></script>

<style lang="scss" scoped>
  @import "../../styles/partials/variables";
  @import "../../styles/bootstrap/bootstrap";

  .main-text {
    padding: 39px 0 29px 0;
    .page-title {
      color: $blue;
      font-size: 40px;
      text-transform: uppercase;
      display: inline-block;
      margin: 0;
    }
    .flight-icon {
      width: 37px;
      height: 39px;
      background: url("../../assets/plane.svg");
      display: inline-block;
      margin-right: 20px;
    }
  }
</style>

