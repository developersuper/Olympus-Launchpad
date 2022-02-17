import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store.js";
import Donut from "vue-css-donut-chart";
import "vue-css-donut-chart/dist/vcdonut.css";

import "./assets/css/main.css";

// Datepicker
import VueFlatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

// Button "ripple" effect
import VWave from "v-wave";


// window.addEventListener("load", function() {
//   console.log('loading...');
//   if(window.ethereum) {
//     window.ethereum.on('accountsChanged', function (accounts) {
//       console.log('accountsChanges',accounts);
      
//     });
//     // detect Network account change
//     window.ethereum.on('networkChanged', function(networkId){
//       console.log('networkChanged', networkId);
//       store.dispatch('initialize');
//     });
//   }
// });

createApp(App)
  .use(router)
  .use(store)
  .use(VueFlatPickr)
  .use(Donut)
  .use(VWave, {
    initialOpacity: 0.3,
    easing: "ease-in",
  })
  .mount("#app");
