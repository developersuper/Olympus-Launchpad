<template>
  <div>
    <Gateway />
    <Bottom />
  </div>
</template>

<script>
// @ is an alias to /src
import Gateway from "./components/Gateway.vue";

import Bottom from "./components/Bottom.vue";
export default {
  name: "Dashboard",
  components: {
    Gateway,
    Bottom,
  },
};
</script>

<style></style>
