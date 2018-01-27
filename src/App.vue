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
</style>


