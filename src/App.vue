<template>
  <div>
    <wizz-header></wizz-header>
    <main class="container">
      <wizz-titlebar></wizz-titlebar>
      <div class="row">
        <wizz-sidebar></wizz-sidebar>
        <wizz-tickets></wizz-tickets>
      </div>
    </main>
  </div>
</template>

<script>
  import Header from './components/header/header.vue';
  import TitleBar from './components/titles/titleBar.vue';
  import Sidebar from './components/sidebar/sidebar.vue';
  import Tickets from './components/tickets/tickets.vue';

  /**
   * The App component which is the main entry point.
   *
   * @author Zsolt Nagy
   * @license MIT
   */

  export default {
    name: 'app',
    components: {
      'wizz-header': Header,
      'wizz-titlebar': TitleBar,
      'wizz-sidebar': Sidebar,
      'wizz-tickets': Tickets
    }
  }
</script>

<style lang="scss">
  @import "styles/partials/variables";
  @import "styles/bootstrap/bootstrap";

  :root {
    font-size: 16px;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.875rem;
    background: $background;
    margin: 0;
    padding: 0;
  }

  /* DATEPICKER */
  .flatpickr-input,
  .form-control,
  .form-control:disabled, .form-control[readonly] {
    border: 2px solid $pink !important;
    background: white !important;
    border-radius: 3px !important;
  }

  /* GLOBAL BUTTONS */
  .wizz-button {
    text-align: center;
    padding: 10px 35px;
    border-radius: 3px;
    color: white;
    min-width: 300px;
    max-width: 500px;
    width: 100%;
    cursor: pointer;
    @include transition(transition, 0.5s);
    @include media-breakpoint-down(md) {
      min-width: 100%;
    }
    &.wizz-button-primary {
      background: $blue;
      border: $blue;
    }
    &.wizz-button-secondary {
      background: $pink;
      border: $pink;
    }
    &:hover {
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.4);
    }
  }

  .main-bg {
    position: fixed;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url("assets/map.svg");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .white-bg {
    background: white;
  }

</style>


