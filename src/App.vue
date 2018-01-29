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

  export default {
    components: {
      'wizz-header': Header,
      'wizz-titlebar': TitleBar,
      'wizz-sidebar': Sidebar,
      'wizz-tickets': Tickets
    },
    created() {
      var nowDate = new Date();
      // var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
      var date =
      console.log(date);
    }
  }
</script>

<style lang="scss">
  @import "styles/partials/variables";
  @import "styles/bootstrap/bootstrap";
  body {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 14px;
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
    &.wizz-button-primary {
      background: $blue;
    }
    &.wizz-button-secondary {
      background: $pink;
    }
  }

</style>


