<template>
  <div class="container xl:max-w-screen-lg mx-auto px-4 my-6 lg:my-8">
    <Head />
     <div class="flex flex-col lg:flex-row space-x-0 lg:space-y-0 space-y-4 lg:space-x-4 w-full">
     <!-- <div v-if="!isWalletConnected" class="w-full bg-gray-900 rounded-2xl overflow-hidden max-w-2xl mx-auto border border-gray-700 mb-12">
        <div class="bg-gray-800 border-b border-gray-700">
          <h3 class="gradient-text w-full py-6 text-center">My Launches</h3>
        </div>
        <div class="sm:px-8 px-4 py-8 flex flex-col items-center">
          <Button name="Connect Wallet" class="connectBtn w-full max-w-64" @click="$store.dispatch('wallet/connectWallet')" />
        </div>
      </div>
      <Card v-else /> -->
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
import Button from "@/components/Button.vue";
import { mapGetters, mapState } from 'vuex';

export default {
  name: "launchCard",
  components: {
    Card,
    largeButton,
    Head,
    Button,
  },
  computed: {
    ...mapGetters('wallet', ['isWalletConnected'])
  }
};
</script>

<style></style>
