<template>
  <div class="row">
    <div class="col-6" @click="busData">
      date1
      {{ flight.departure | moment("HH:mm") }} -> {{ flight.arrival | moment("HH:mm") }}
    </div>
    <div class="col-6">
      date2
    </div>
  </div>
</template>

<script>
  import { bus } from '../../main';

  export default {
    data() {
      return {

      }
    },
    methods: {
      busData() {
        bus.$emit('ticketdata', this.flight);
      }
    },
    created() {

    },
    props: ['departureDate', 'flight']
  }
</script>

<style lang="scss" scoped>

</style>
