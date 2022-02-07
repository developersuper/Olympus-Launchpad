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
          v-if="isWalletConnected"
          class="slider z-50 mt--1"  
          v-model="percentageRaised" 
          :height="9" 
          trackColor="#507194" 
          color="#EFBD28" 
          @change="onPercentageChange"
        />
        <div class="bg-gray-600 border border-gray-300 rounded-2xl cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-200">
          <div class="rounded-2xl w-full text-gray-200 text-right pt-3 pr-2 text-xs">BALANCE: {{ isWalletConnected ? balance : '--' }} </div>
          <input
            placeholder="Amount to add"
            style="height: 42px;"
            type="number"
            class="relative w-full bg-gray-600 border border-gray-600 rounded-2xl shadow-sm pl-3 pr-14 py-2 text-left cursor-default sm:text-sm"
            :value="addAmount"
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
import { utils } from 'ethers';

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
      balance: '0',
      addAmount: 0,
      flag: false,
    }
  },
  async mounted() {
    if(this.model.isBnb && this.isWalletConnected) {
      this.balance = this.parseWei(await getBalance(this.address));
      this.addAmount = this.value;
      this.percentageRaised = this.value * 100 / this.balance;
    }else {
      this.balance = 0;
      this.addAmount = 0;
      this.percentageRaised = 0;
    }
    this.flag = false;
  },
  watch: {
    async isWalletConnected(val, oldVal) {
      if(this.model.isBnb && val && val !== oldVal) {
        this.balance = this.parseWei(await getBalance(this.address));
      }
    },
    addAmount(val) {
      if(!this.isWalletConnected) {
        return;
      }
      this.$emit('update', val);
    },
    value(val) {
      if(!this.isWalletConnected || this.balance === 0) {
        this.percentageRaised = 0;
        return;
      }
      this.flag = true;
      this.percentageRaised = val * 100 / this.balance;
    }
  },
  methods: {
    parseWei(wei) {
      return parseFloat(utils.formatEther(wei));
    },
    onPercentageChange(val) {
      if(this.flag) {
        this.flag = false;
        return;
      }
      this.setPercentageRaised(val);
    },
    setPercentageRaised(val) {
      if(!this.isWalletConnected) {
        return;
      }
      this.addAmount = this.balance * val / 100;
    },
    updateAddAmount(e) {
      try {
        if(isNaN(e.target.value) || !this.isWalletConnected) return;
        this.addAmount = parseFloat(e.target.value);
      }catch(e) {
        console.log('Error in updateAddAmount in LiquiditySelecter', e);
      }
    },
  },
  computed: {
    ...mapGetters('wallet', ['isWalletConnected', 'address']),
  },
}
</script>