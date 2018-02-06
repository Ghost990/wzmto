import Vue from 'vue'
import App from './App.vue'
import vSelect from 'vue-select'
import BootstrapVue from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import moment from 'moment';
import VueLocalStorage from 'vue-ls';
import VAnimateCss from 'v-animate-css';
import vOutsideEvents from 'vue-outside-events'
import axios from 'axios';

axios.defaults.baseURL = 'https://mock-air.herokuapp.com';

Vue.use(vOutsideEvents)

Vue.use(VAnimateCss)

Vue.use(VueLocalStorage)

Vue.prototype.moment = moment

Vue.use(flatPickr)

Vue.use(BootstrapVue)

Vue.component('v-select', vSelect)

export const bus = new Vue()

new Vue({
  el: '#app',
  render: h => h(App)
})
