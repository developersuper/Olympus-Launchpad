
<template>
  <div class="sm:px-8 px-4 pb-8">
    <!-- Token Address-->
    <div>
      <input
        class="bg-launchpad_primary overline bg-opacity-10 hover:shadow-launchpad_primary focus:shadow-launchpad_primary relative mt-8 border-launchpad_primary transition-all duration-200 placeholder-launchpad_primary text-launchpad_primary rounded-full border p-3 w-full text-center"
        placeholder="Enter token address"
        v-model="tokenAddress"
      />
      <div v-if="isValidAddress !== 'correct'" class="text-center text-error-red">{{ isValidAddress }}</div>
    </div>
    <LogoUpload 
      v-if="isValidAddress === 'correct'" 
      @loaded="imageFile = $event"
    />
    <div v-if="isValidAddress === 'correct'" class="caption my-8 space-y-6 rounded-lg p-4">
      <TokenSelect :tokenName="tokenName"/>
      <PresaleOwner :address="address" />
      <LockTokens />
      <Whitelist :isApproved="isApproved" @whitelisted="whitelistedArray = [...$event];"/>
      <!-- Tokens available -->
      <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        <label class="w-full lg:w-3/5 mt-1 block text-sm font-semibold text-gray-100">
          How many tokens are available for presale?
        </label>
        <div class="w-full lg:w-2/5 mt-1 flex items-center relative">
          <div class="w-full bg-gray-600 border border-gray-300 rounded-2xl cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-200">
            <div class="rounded-2xl text-gray-200 text-right pt-2 pr-2 text-xs">BALANCE: {{ tokenBalance }}</div>
            <input
              v-model="availableTokens"
              :disabled="isApproved"
              style="height: 42px;"
              type="number"
              class="relative w-full bg-gray-600 rounded-2xl shadow-sm pl-3 pr-10 py-2 text-left sm:text-sm"
            />
          </div>
          <div class="absolute font-semibold text-gray-100 right-3 top-8">{{ tokenName }}</div>
        </div>
      </div>
      <div v-if="isValidAvailablePresale !== ''" class="text-center text-error-red error-msg">{{ isValidAvailablePresale }}</div>
      <!-- Hardcap % Softcap -->
      <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        <div class="w-full">
          <label class="block text-sm font-semibold text-gray-100">
            Hardcap
          </label>
          <div class="mt-1 flex items-center relative">
            <input
              v-model="hardCap"
              :disabled="isApproved"
              style="height: 42px;"
              type="number"
              class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-14 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-200 sm:text-sm"
            />
            <div class="absolute font-semibold text-gray-100 right-3">BNB</div>
          </div>
        </div>
        <div class="w-full">
          <label class="block text-sm font-semibold text-gray-100">
            Softcap
          </label>
          <div class="mt-1 flex items-center relative">
            <input
              v-model="softCap"
              :disabled="isApproved"
              style="height: 42px;"
              type="number"
              class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-14 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-200 sm:text-sm"
            />
            <div class="absolute font-semibold text-gray-100 right-3">BNB</div>
          </div>
        </div>
      </div>
      <div v-if="isValidCap !== ''" class="text-center text-error-red error-msg">{{ isValidCap }}</div>
      <PresaleRate 
        :presaleRate="presaleRate"
        @presaleRate="presaleRate = $event"
        :tokenName="tokenName"
        :disabled="isApproved"
        :error="isValidPresaleRate"
      />

      <!-- Percent slider -->
      <label class="block text-lg font-semibold text-gray-100 text-center">PERCENT OF RAISED WBNB FOR LIQUIDITY</label>
      <div class="flex flex-row items-center justify-between">
        <span class="text-lg font-semibold text-launchpad_primary">0%</span>
        <span class="text-lg font-semibold text-launchpad_primary">{{ percentageRaised }}%</span>
      </div>
      <vue3-slider 
        class="slider custom-slider" 
        ref="portfolioSlider" 
        v-model="percentageRaised" 
        :data="sliderRange" 
        :height="12" 
        trackColor="#081A2E" 
        color="#EFBD28" 
        :min="0" 
        :max="100" 
        :step="1" 
        orientation="horizontal" 
      />
      <div v-if="isValidLiquidityPercentage !== ''" class="text-center text-error-red error-msg">{{ isValidLiquidityPercentage }}</div>
      <MinMax
        :bnbLimit="bnbLimit"
        @bnbLimit="bnbLimit = $event"
        :bnbMax="bnbMax"
        @bnbMax="bnbMax = $event"
        :disabled="isApproved"
        :error="isValidBNBPerUser"
      />
      <!-- Dates -->
      <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        <div class="w-full">
          <label class="block text-sm font-semibold text-gray-100">START DATE</label>
          <flat-pickr
            class="bg-launchpad_primary overline bg-opacity-10 hover:shadow-launchpad_primary text-center focus:shadow-launchpad_primary relative mt-4 border-launchpad_primary transition-all duration-200 placeholder-launchpad_primary text-launchpad_primary rounded-2xl border py-3 px-6 w-full cursor-pointer"
            placeholder="Start Date"
            name="date"
            :config="config"
            v-model="startDate"
            :disabled="isApproved"
          />
        </div>
        <div class="w-full">
          <label class="block text-sm font-semibold text-gray-100">END DATE</label>
          <flat-pickr
            class="bg-launchpad_primary overline bg-opacity-10 hover:shadow-launchpad_primary text-center focus:shadow-launchpad_primary relative mt-4 border-launchpad_primary transition-all duration-200 placeholder-launchpad_primary text-launchpad_primary rounded-2xl border py-3 px-6 w-full cursor-pointer"
            placeholder="End Date"
            name="date"
            :config="config"
            v-model="endDate"
            :disabled="isApproved"
          />
        </div>
      </div>
      <div v-if="isValidTime !== ''" class="text-center text-error-red error-msg">{{ isValidTime }}</div>
    </div>
    <LaunchSummary />
    <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      <button @click="approve()" v-wave class="p-6 border-2 border-launchpad_primary text-launchpad_primary bg-launchpad_primary bg-opacity-0 hover:bg-opacity-20 rounded-lg w-full font-semibold transition-all duration-200">
        {{ isApproved ? 'APPROVED' : 'APPROVE' }}
      </button>
      <button @click="createLaunch(address)" v-wave :class="[!isApproved ? 'cursor-not-allowed opacity-70 bg-gray-400' : 'hover:bg-opacity-80', 'p-6 bg-launchpad_primary text-gray-900 rounded-lg w-full font-semibold transition-all duration-200']">
        CREATE LAUNCH
      </button>
    </div>
    <div v-if="!isValidAll" class="text-center text-error-red error-msg">Something went wrong.</div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex';

import {
  detectAddress, 
  getName,  
  createPresale, 
  getBalanceOfToken,
  approve,
} from '@/js/web3.js';
import { uploadImage } from '@/js/service.js';

import slider from 'vue3-slider';
import LogoUpload from './LaunchForm/LogoUpload.vue';
import TokenSelect from './LaunchForm/TokenSelect.vue';
import PresaleOwner from './LaunchForm/PresaleOwner.vue';
import LockTokens from './LaunchForm/LockTokens.vue';
import Whitelist from './LaunchForm/Whitelisted.vue';
import PresaleRate from './LaunchForm/PresaleRate.vue';
import MinMax from './LaunchForm/MinMax.vue';
import LaunchSummary from "./LaunchForm/LaunchSummary.vue";

export default {
  components: {
    LaunchSummary,
    "vue3-slider": slider,
    PresaleOwner,
    LockTokens,
    Whitelist,
    LogoUpload,
    TokenSelect,
    PresaleRate,
    MinMax,
  },
  created() {
    let launches_type = this.launche_types.filter((launch) => launch.id == this.$route.params.id)[0];
    this.model = {
      ...launches_type,
    },
    this.startDate = Date.now() + 600000;
    this.endDate = Date.now() + 1000000000;
    console.log(this.startDate);
    console.log(this.startDate, this.endDate);
    this.config = {
      enableTime: true,
      enableSeconds: true,
      altFormat: "M j, Y",
      dateFormat: 'Y-m-d H:i:s',
      time_24hr: true,
    };
    this.tokenAddress = '0x8cA9095D699d454FEf3400Fbca1a798b9D9e97cB';
  },
  data() {
    return {
      imageFile: null,
      config: null,
      isApproved: false,
      isValidAddress: '',
      isValidAll: true,
      presaleOwner: null,
      tokenAddress: '',
      whitelistedArray: [],
      tokenName: "--",
      startDate: "2022-01-01",
      endDate: "2022-12-12",
      tokenBalance: 0,
      availableTokens: 0,
      presaleRate: 1,
      hardCap: 100,
      softCap: 51,
      percentageRaised: 40,
      bnbLimit: 0.1,
      bnbMax: 1.5,
    };
  },
  watch: {
    tokenAddress: async function(val) {
      if (val.length == 42 && await detectAddress(val) == "0x" && await getName(val) != "") {
        this.isValidAddress = 'correct';
        this.tokenName = await getName(val);
        this.tokenBalance = await getBalanceOfToken(val, this.address);
        this.availableTokens = this.tokenBalance;
        this.hardCap = this.availableTokens / this.presaleRate;
        this.softCap = this.hardCap / 2 + 1;
      } else {
        this.isValidAddress = 'Invalid token address!  Please try with correct address.';
        this.tokenName = "--";
      }
    },
    percentageRaised: function (val, oldVal) {
      if(this.isApproved === true) val = oldVal;
    }
  },
  methods: {
    async approve() {
      if (
        this.isValidAddress === 'correct' && 
        this.isValidAvailablePresale === '' && 
        this.isValidBNBPerUser === '' && 
        this.isValidCap === '' && 
        this.isValidPresaleRate === '' && 
        this.isValidTime === '' && 
        this.isValidLiquidityPercentage === ''
      ) {
        
        const result = await approve(this.tokenAddress, this.availableTokens);

        if(!result) {
          this.isValidAll = false;
          return;
        }
        this.isValidAll = true;
        this.isApproved = true;
        if (!this.whitelistEnabled) this.whitelistedArray = [];
      } else {
        this.isValidAll = false;
      }
    },
    async createLaunch() {
      const result = await createPresale(
        this.tokenAddress,
        this.address,
        this.softCap,
        this.hardCap,
        this.presaleRate,
        this.bnbLimit,
        this.bnbMax,
        this.percentageRaised,
        this.startDate,
        this.endDate,
        this.availableTokens,
        this.whitelistEnabled,
        true,
        this.whitelistedArray
      );
      if(result === true) {
        await this.loadPresales();
        this.$router.push('/explore');
      }else {
        this.isValidAll = false;
        this.isApproved = false;
      }
    },
    setApprovedFlag() {
      this.isApproved = true;
    },
  },
  computed: {
    ...mapGetters('wallet', [
      'address',
      'isWalletConnected',
    ]),
    ...mapState(['launche_types']),
    ...mapActions('launchpad',[
      'loadPresales'
    ]),
    isValidCap() {
      if(this.softCap === 0 || this.hardCap === 0) return 'Softcap and Hardcap must not be 0.';
      if(this.softCap > this.hardCap) return 'Softcap must not exceed Hardcap.';
      if(this.softCap * 2 <= this.hardCap) return 'Hardcap must be smaller than 2 times of softCap.';
      return '';
    },
    isValidAvailablePresale() {
      if(this.availableTokens <= 0) return 'Must be over 0.';
      if(this.availableTokens > this.tokenBalance) return 'Must be smaller than balance.';
      return '';
    },
    isValidPresaleRate() {
      if(this.presaleRate <= 0) return 'Presale rate must be bigger than 0.';
      if(this.availableTokens / this.presaleRate < this.softCap) return 'Current presale rate couldn\'t reach softcap.';
      return '';
    },
    isValidBNBPerUser() {
      if(this.bnbLimit < 0 || this.bnbMax < 0) return 'Should be over 0.';
      if(this.bnbLimit > this.bnbMax) return 'BNB Min must be smaller than BNB Max.';
      return '';
    },
    isValidTime() {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      if(start.getTime() < Date.now()) return 'Start time passed current time.';
      if(start.getTime() > end.getTime()) return 'Start time must before end time.';
      return '';
    },
    isValidLiquidityPercentage() {
      if(this.percentageRaised < 40) return 'must be over 40%';
      return '';
    }
  },
};
</script>

<style>
.error-msg {
  margin-top: 0.5rem !important;
}
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.checkbox {
  --border-color: #d2d6dc;
  --color: #3f83f8;
  display: flex;
  align-items: center;
}
.checkbox input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  vertical-align: middle;
  background-origin: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-shrink: 0;
  height: 1.5rem;
  width: 1.5rem;
  color: #fff;
  background-color: #3bd0f51f;
  border-color: #3bd0f5;
  border-width: 1px;
  border-radius: 0.25rem;
  border-style: solid;
}
.checkbox input[type="checkbox"]:checked {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L7 8.586 5.707 7.293z'/%3E%3C/svg%3E");
  border-color: transparent;
  background-color: #3bd0f5;
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
}
@media not print {
  .checkbox input[type="checkbox"]::-ms-check {
    border-width: 1px;
    color: transparent;
    background: inherit;
    border-color: inherit;
    border-radius: inherit;
  }
}
.checkbox input[type="checkbox"]:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
  border-color: #a4cafe;
}
.checkbox input[type="checkbox"]:checked:focus {
  border-color: transparent;
}
.checkbox label {
  margin-left: 0.5rem;
  display: block;
  line-height: 1.25rem;
}

input[type="date"],
input[type="time"] {
  display: block;

  /* Solution 1 */
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  min-height: 32px;
  width: 100%;
}
</style>
