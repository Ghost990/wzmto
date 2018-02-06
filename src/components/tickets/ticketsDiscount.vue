<template>
  <div class="row discount-row">
    <div class="col-12 discount-card align-items-center d-flex">
      <button class="discount-fares-button">
        Show Discount Club Fares
      </button>
      <div class="discounts">
                            <span class="discount discount-flight">
                                €10 discount on flight
                            </span>
        <span class="discount discount-baggage">
                                €5 discount on baggages
                            </span>
      </div>
      <div class="read-more">
        <a href="#">
          Read More
        </a>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
  @import "../../styles/partials/variables";
  @import "../../styles/bootstrap/bootstrap";

  .discount-row {
    .discount-card {
      border-radius: 3px;
      background: white;
      box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.1);
      height: 107px;
      padding: 0 20px;
      position: relative;
      margin-bottom: 20px;
      .discount-fares-button {
        text-transform: uppercase;
        color: $pink;
        border: 2px solid $pink;
        border-radius: 3px;
        width: 300px;
        height: 45px;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
        @include transition(transition, 0.5s);
        @include media-breakpoint-down(md) {
          width: 100%;
        }
        &:hover {
          background: $pink;
          color: white;
        }
      }
      .discounts {
        margin: 0 30px;
        @include media-breakpoint-down(md) {
          display: none;
        }
        .discount {
          color: #343434;
          display: block;
        }
      }
      .read-more {
        text-transform: uppercase;
        font-weight: bold;
        color: $pink;
        position: absolute;
        right: 20px;
        @include media-breakpoint-down(md) {
          display: none;
        }
        a {
          color: $pink;
          border-bottom: 1px solid $pink;
          &:hover {
            text-decoration: none;
          }
        }
      }
    }
  }
</style>
