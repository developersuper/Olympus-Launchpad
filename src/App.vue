<template>
  <div class="flex flex-col justify-between min-h-screen">
    <Navbar />
    <div v-if="error === ''">
      <router-view />
    </div>
    <div v-else class="text-center text-error-red error-msg">{{ error }}</div>
    <Footer />
    <background style="z-index: -1;" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Background from "@/components/Background.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    Background,
  },
  methods: {
    ...mapActions('launchpad',[
      'loadPresales'
    ]),
    ...mapActions(['initialize']),
  },
  computed: {
    ...mapState(['provider', 'web3'])
  },
  async created() {
    if(!this.provider) {
      await this.initialize();
    }
    await this.loadPresales(this.provider);
  }
};
</script>
<style>
* {
  font-family: "Open Sans", sans-serif;
  text-decoration: none !important;
  color: #fff;
}

body {
  background-color: #1a293e;
}

.gradient-text {
  background: linear-gradient(to right, #f57824 0%, #efbd28 25%, #f57824 50%, #efbd28 75%, #f57824 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700 !important;
  background-size: 400%;
  animation: hue 15s infinite linear;
}

.gradient-color {
  background: linear-gradient(to right, #f57824 0%, #efbd28 50%, #efbd28 100%);
}

.mt--1 {
  position: absolute !important;
  margin-top: 9px;
  margin: 0 !important;
  width: 96% !important;
  left: 2%;
}

@-webkit-keyframes hue {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 400%;
  }
}

.gradient-border {
  background: linear-gradient(to right, #f57824 0%, #efbd28 100%) !important;
  border-radius: 50px;
  padding: 14px;
  position: relative;
  z-index: 1;
}
.gradient-border::before {
  position: absolute;
  content: "";
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  top: 3px;
  left: 3px;
  border-radius: 50px;
  background-color: #273f59;
  z-index: -1;
}
</style>
