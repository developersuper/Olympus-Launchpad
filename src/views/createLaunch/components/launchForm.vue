<template>
  <section class="wow fadeInDown mb-10" data-wow-duration="0.6s" data-wow-delay="0.7s" style="margin-top:0px">
    <Head />
    <div class="bg-gray-900 rounded-2xl overflow-hidden max-w-2xl mx-auto border border-gray-700">
      <div class="bg-gray-800 border-b border-gray-700">
        <h3 class="gradient-text w-full py-6 text-center">CREATE {{model.name}}</h3>
      </div>
      <div class="sm:px-8 px-4 py-8 flex flex-col items-center" v-if="!isWalletConnected">
        <Button name="Connect Wallet" class="connectBtn w-full max-w-64" @click="$store.dispatch('wallet/connectWallet')" />
      </div>
      <FormContext v-else />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import Button from "@/components/Button.vue";
import Head from './Head.vue';
import FormContext from './FormContext.vue';


export default {
  components: {
    Button,
    Head,
    FormContext,
  },
  created() {
    let launches_type = this.launche_types.filter((launch) => launch.id == this.$route.params.id)[0];
    this.model = {
      ...launches_type,
    };
    this.$store.dispatch('wallet/connectWallet')
  },
  computed: {
    ...mapGetters('wallet', [
      'address',
      'isWalletConnected',
    ]),
    ...mapState(['launche_types']),
  }
}
</script>
