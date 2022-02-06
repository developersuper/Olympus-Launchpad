<template>
<div class="w-full wow fadeInDown" data-wow-duration="0.3s" data-wow-delay="0.4s">
  <div class="text-center flex flex-col justify-between h-full items-center">
    <div class="h-full px-4 pb-4 pt-0 mx-auto">
      <div class="flex items-center bg-gray-900 mx-auto place-content-center p-4 rounded-t-2xl">
        <span class="text-base font-semibold text-gray-200">YOUR ALLOWANCE</span>&nbsp;&nbsp;&nbsp;&nbsp;              
        <span v-if="isWalletConnected" class="ml-2 gradient-text text-base font-semibold"> {{ Math.max(minLimit, parseWei(bought)) }} / {{ maxLimit }} BNB</span>
        <span v-else class="ml-2 gradient-text text-base font-semibold"> -- / -- BNB</span>
      </div>
      <LiquiditySelecter 
        :model="this.model"
        :value="parseWei(addAmount)"
        @update="setAddAmount"
      />
      <div v-if="isValidAmount !== '' && this.isWalletConnected" class="text-center text-error-red error-msg">{{ isValidAmount }}</div>
      <div class="flex flex-row max-w justify-between w-full mt-4">
        <div class="md:w-1/3 flex items-center flex-col text-center mb-2">
          <span class="text-xs font-semibold whitespace-nowrap text-center text-gray-200 mb-4">Liquidity Locked</span>
          <img class="mt-12 absolute z-10 w-14 h-14 sm:w-16 sm:h-16" src="@/assets/icons/Lock.svg" alt="Logo" />
          <vc-donut class="hidden sm:block" :size="100" background="#081A2E" foreground="#2F455C" :thickness="17" :sections="[{ value: 30, color: progressColor }]"></vc-donut>
          <vc-donut class="sm:hidden" :size="90" background="#081A2E" foreground="#2F455C" :thickness="17" :sections="[{ value: 30, color: progressColor }]"></vc-donut>
          <h3 class="mt-4 font-semibold">{{ liquidityLocked }}%</h3>
        </div>
        <div class="md:w-1/3 flex items-center flex-col text-center mb-2">
          <span class="text-xs font-semibold whitespace-nowrap text-center text-gray-200 mb-4">Participants</span>
          <img class="mt-12 absolute z-10 w-14 h-14 sm:w-16 sm:h-16" src="@/assets/icons/User.svg" alt="Logo" />
          <vc-donut class="hidden sm:block" :size="100" background="#081A2E" foreground="#2F455C" :thickness="17" :sections="[{ value: model.participants/10, color: progressColor }]"></vc-donut>
          <vc-donut class="sm:hidden" :size="90" background="#081A2E" foreground="#2F455C" :thickness="17" :sections="[{ value: model.participants/10, color: progressColor }]"></vc-donut>
          <h3 class="mt-4 font-semibold">{{ model.participants.toString() }}</h3>
        </div>
        <div class="md:w-1/3 flex items-center flex-col text-center mb-2">
          <span class="text-xs font-semibold whitespace-nowrap text-center text-gray-200 mb-4">Circulating Supply</span>
          <img class="mt-12 absolute z-10 w-14 h-14 sm:w-16 sm:h-16" src="@/assets/icons/Pie.svg" alt="Logo" />
          <vc-donut class="hidden sm:block" :size="100" background="#081A2E" foreground="#2F455C" :thickness="17" :sections="[{ value: 30, color: progressColor }]"></vc-donut>
          <vc-donut class="sm:hidden" :size="90" background="#081A2E" foreground="#2F455C" :thickness="17" :sections="[{ value: 30, color: progressColor }]"></vc-donut> 
          <h3 class="mt-4 font-semibold" v-html="bogintific(circulatingSupply)"></h3>
        </div>
      </div>

      <div class="mb-10 text-center p-4 rounded-md flex flex-col w-full items-center">
        <div class="space-y-2 w-full">
          <div class="flex flex-row items-center justify-between">
            <span class="caption text-gray-100"><b>Launch start</b></span>
            <span class="caption gradient-text">{{ model.startTime.toString().substr(3, 22)}}</span>
          </div>
          <div class="flex flex-row items-center justify-between">
            <span class="caption text-gray-100"><b>Launch end</b></span>
            <span class="caption gradient-text">{{ model.endTime.toString().substr(3, 22) }}</span>
          </div>
          <div class="flex flex-row items-center justify-between">
            <span class="caption text-gray-100"><b>Token address</b></span>
            <div class="flex flex-row items-center space-x-2">
              <span class="caption text-gray-100">
                <b>
                  {{ model.tokenAddr.substr(0,7) + "..." + model.owner.substr(model.tokenAddr.length - 7, model.tokenAddr.length) }}
                </b>
              </span>
              <a :href="'https://testnet.bscscan.com/address/' + model.tokenAddr" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg
              ></a>
            </div>
          </div>
          <div class="flex flex-row items-center justify-between">
            <span class="caption text-gray-100"><b>Created by</b></span>
            <div class="flex flex-row items-center space-x-2">
              <span class="caption text-gray-100">
                <b>
                  {{ model.owner.substr(0,7) + "..." + model.owner.substr(model.owner.length - 7, model.owner.length) }}
                </b>
              </span>
              <a :href="'https://testnet.bscscan.com/address/' + model.owner" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg
              ></a>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row space-y-4 w-full lg:space-y-0 lg:space-x-4">
        <button 
          v-wave 
          :class="[isDisableFirstButton ? 'cursor-not-allowed opacity-70 bg-gray-400' : 'gradient-color', 'lg-btn p-4 text-gray-100 rounded-lg w-full font-semibold hover:bg-opacity-80 transition-all duration-200']"
          :disabled="isDisableFirstButton"
        >
          {{ buttonTitle }}
        </button>
        <button 
          v-wave 
          :class="[isDisableSecondButton ? 'cursor-not-allowed opacity-70 bg-gray-400' : '', 'lg-btn p-4 border-2 border-gray-500 text-gray-200 bg-gray-400 bg-opacity-0 hover:bg-opacity-20 rounded-lg w-full font-semibold transition-all duration-200']"
          :disabled="isDisableSecondButton"  
        >
          WITHDRAW INITIAL EARLY
        </button>
      </div>
      <div class="flex items-end sm:justify-end">
        <div class="w-full sm:w-1/2">
        <p class="mt-5 text-gray-300 text-sm sm:text-xs">Claim your full initial deposit up to 1 hour before launch ends. There is a 10% fee for withdrawing early.</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { bogintific } from '@/js/helpers/filters';
import { utils, BigNumber } from 'ethers';
import { mapGetters } from 'vuex';

import LiquiditySelecter from './LiquiditySelecter.vue';
import {
  
} from '@/js/web3.js';

export default {
  components: {
    LiquiditySelecter,
  },
  props: {
    model: Object,
    bought: Object,
    isLive: Boolean,
  },
  created() {
    this.addAmount = this.isWalletConnected ? this.model.minBuyLimit : BigNumber.from('0');
  },
  data() {
    return {
      addAmount: BigNumber.from('0'),
      liquidityLocked: "40",
      participants: "40",
      circulatingSupply: "40000000",
      progressColor: "#EFBD28",
    }
  },
  methods: {
    bogintific,
    setAddAmount(e) {
      this.addAmount = utils.parseEther(e.toString());
    },
    parseWei(wei) {
      return utils.formatEther(wei);
    },
    async submitFirstBtn() {
      if(this.isDisableFirstButton) return;
    },
    async withdrawEmergency() {
      if(this.isDisableSecondButton) return;
    }
  },
  computed: {
    ...mapGetters('wallet', ['isWalletConnected']),
    maxLimit() {
      return parseFloat(utils.formatEther(this.model.maxBuyLimit.toString()));
    },
    minLimit() {
      return parseFloat(utils.formatEther(this.model.minBuyLimit.toString())).toFixed(2);
    },
    buttonTitle() {
      if(this.model.isFinalized && this.model.fundRaised.gte(this.model.softcap)) return 'CLAIM';
      if(this.model.isFinalized && this.model.fundRaised.lt(this.model.softcap)) return 'WITHDRAW';
      return 'BUY'
    },
    isDisableFirstButton() {
      if(this.buttonTitle === 'BUY') {
        if(
          !this.isWalletConnected
          || Date.now() < this.model.startTime.getTime() 
          || Date.now() > this.model.endTime.getTime() 
          || this.addAmount.lt(this.model.minBuyLimit) 
          || this.bought.eq(this.model.maxBuyLimit)
        ) return true;
        return false
      }
      return false; 
    },
    isDisableSecondButton() {
      if(
        this.model.isFinalized
        || !this.isWalletConnected 
        || Date.now() < this.model.startTime.getTime()
        || Date.now() > this.model.endTime.getTime() + 3600000
      ) return true;
      return false;
    },
    isValidAmount() {
      if(this.addAmount.lt(this.model.minBuyLimit)) return 'Must be over minimum limit.';
      if(this.addAmount.add(this.bought).gt(this.model.maxBuyLimit)) return 'Must be under maximum limit';
      return '';
    }
  }
}
</script>