import Vue from 'vue'
import App from './App.vue'
import vSelect from 'vue-select'
import BootstrapVue from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import moment from 'moment'

Vue.prototype.moment = moment;

Vue.use(flatPickr);


Vue.use(BootstrapVue);

Vue.component('v-select', vSelect);
Vue.use(require('vue-moment'));

new Vue({
  el: '#app',
  render: h => h(App)
})
