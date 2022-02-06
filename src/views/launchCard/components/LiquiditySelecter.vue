<template>
  <p class="text-gray-200 font-semibold text-sm mb-4">ADD YOUR BNB TO LAUNCH</p>
  <div class="flex bg-gray-900 justify-between pr-6 pl-6">
    <span class="overline text-gray-200 cursor-pointer hover:text-launchpad_primary transition-colors duration-200" @click="setPercentageRaised(1)">1%</span>
    <span class="overline text-gray-200 cursor-pointer hover:text-launchpad_primary transition-colors duration-200" @click="setPercentageRaised(25)">25%</span>
    <span class="overline text-gray-200 cursor-pointer hover:text-launchpad_primary transition-colors duration-200" @click="setPercentageRaised(50)">50%</span>
    <span class="overline text-gray-200 cursor-pointer hover:text-launchpad_primary transition-colors duration-200" @click="setPercentageRaised(75)">75%</span>
    <span class="overline text-gray-200 cursor-pointer hover:text-launchpad_primary transition-colors duration-200" @click="setPercentageRaised(100)">100%</span>
  </div>
  <div class="lg:flex-row flex-col w-full items-center flex lg:space-y-0 space-y-4 lg:space-x-4">
      <div class="relative w-full">
        <vue3-slider 
          class="slider z-50 mt--1" 
          ref="portfolioSlider" 
          v-model="percentageRaised" 
          :data="sliderRange" 
          :height="9" 
          trackColor="#507194" 
          color="#EFBD28" 
          min="0" 
          max="100" 
          :step="0.00000001" 
          :orientation="orientation" 
          @change="setPercentageRaised"
        />
        <div class="bg-gray-600 border border-gray-300 rounded-2xl cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-200">
          <div class="rounded-2xl w-full text-gray-200 text-right pt-3 pr-2 text-xs">BALANCE: {{ isWalletConnected ? parseWei(balance) : '--' }} </div>
          <input
            placeholder="Amount to add"
            style="height: 42px;"
            type="number"
            class="relative w-full bg-gray-600 border border-gray-600 rounded-2xl shadow-sm pl-3 pr-14 py-2 text-left cursor-default sm:text-sm"
            :value="value"
            :disabled="!isWalletConnected"
            @change="updateAddAmount"
          />
        </div>
        <div class="absolute font-semibold text-gray-100 right-3 top-9">BNB</div>
      </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import slider from "vue3-slider";
import { getBalance } from '@/js/web3.js';
import { BigNumber, utils } from 'ethers';

export default {
  components: {
    "vue3-slider": slider,
  },
  props: {
    model: Object,
    value: Number,
  },
  data() {
    return {
      percentageRaised: 0,
      balance: BigNumber.from('0'),
    }
  },
  async mounted() {
    console.log('here', this.model.isBnb, this.isWalletConnected);
    if(this.model.isBnb && this.isWalletConnected) {
      this.balance = await getBalance(this.address);
    }else {
      this.balance = BigNumber.from('0');
    }
    this.percentageRaised = this.value * 100 / this.balance;
  },
  methods: {
    parseWei(wei) {
      return utils.formatEther(wei);
    },
    setPercentageRaised(e) {
      if(!this.isWalletConnected) {
        this.percentageRaised = 0;
        return;
      }
      this.percentageRaised = e;
      let addAmount = this.balance * this.percentageRaised / 100;
      this.$emit('update', addAmount);
    },
    updateAddAmount(e) {
      if(isNaN(e.target.value) || !this.isWalletConnected) return;
      this.percentageRaised = e.target.value * 100 / this.balance;
      this.$emit('update', e.target.value);
    },
  },
  computed: {
    ...mapGetters('wallet', ['isWalletConnected', 'address']),
  },
}
</script>