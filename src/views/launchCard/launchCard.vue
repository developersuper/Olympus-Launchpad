<template>
  <div class="container xl:max-w-screen-lg mx-auto px-4 my-6 lg:my-8">
    <Head />
    <div class="flex flex-col lg:flex-row space-x-0 lg:space-y-0 space-y-4 lg:space-x-4 w-full">
      <Card />
    </div>
    <div class="container flex lg:flex-row flex-col wow mt-12 lg:mt-20 fadeInDown lg:space-y-0 space-y-4 lg:space-x-4 wow fadeInDown" data-wow-duration="0.6s" data-wow-delay="0.9s">
      <largeButton name="EXPLORE LAUNCHES" btnname="EXPLORE" routername="explore" />
      <largeButton name="MY LAUNCHES" btnname="MY LAUNCH" routername="mylaunches" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "./components/Card.vue";
import largeButton from "@/components/largeButton.vue";
import Head from "./components/Head.vue";
import { mapGetters, mapState } from 'vuex';

export default {
  name: "launchCard",
  components: {
    Card,
    largeButton,
    Head,
  },
};
</script>

<style></style>
