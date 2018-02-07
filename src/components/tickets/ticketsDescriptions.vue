<template>
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
</template>

<script>
  /**
   * The TicketDescriptions static component.
   */
  export default {
    name: 'wizz-tickets-descriptions'
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/partials/variables";
  @import "../../styles/bootstrap/bootstrap";

  .tickets-descriptions {
    border-bottom: 1px solid $background;
    .ticket-category-description {
      padding: 0 8px;
      color: $dark;
      .title {
        font-size: 0.75rem;
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
</style>
