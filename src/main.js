import Vue from 'vue'
import App from './App.vue'
import vSelect from 'vue-select'
import BootstrapVue from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import moment from 'moment';
import VueCookie from 'vue-cookie';
import VueLocalStorage from 'vue-ls';
import VAnimateCss from 'v-animate-css';

Vue.use(VAnimateCss);

Vue.use(VueLocalStorage);

Vue.use(VueCookie);

Vue.prototype.moment = moment;

Vue.use(flatPickr);

Vue.use(BootstrapVue);

Vue.component('v-select', vSelect);
Vue.use(require('vue-moment'));

export const bus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
