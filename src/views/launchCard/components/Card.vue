<template>
<div class="flex flex-col">
  <div class="flex flex-col bg-gray-900 border border-gray-700 p-4 h-full rounded-2xl lg:flex-row space-x-0 lg:space-y-0 space-y-4 lg:space-x-4 w-full">
    <div class="w-full wow fadeInDown" data-wow-duration="0.3s" data-wow-delay="0.4s">
      <div class="h-full px-4 pb-2 pt-2 mx-auto">
        <div class="text-center flex flex-col justify-between h-full items-center">
          <div class="relative flex flex-row items-center space-x-4">
            <span :class="model.isLive ? 'ring-success bg-success' : 'ring-error bg-error'" class="w-3 h-3 ring-2 ring-opacity-40 rounded-full"></span>
            <h3>{{ model.tokenName }}</h3>
            <span v-if="model.isPublic" class="px-2 py-1 rounded-md bg-gray-700 text-gray-900 font-bold text-xs ml-2">PUBLIC</span>
            <span v-if="!model.isPublic" class="px-2 py-1 rounded-md bg-gray-700 text-gray-900 font-bold text-xs ml-2">PRIVATE</span>
            <img v-if="model.partnerType == 1" class="ml-2 w-12 h-12 border-launchpad_primary border-1 rounded-full" src="@/assets/icons/defiapetalk.png" />
            <img v-if="model.partnerType == 2" class="ml-2 w-12 h-12 border-launchpad_primary border-1 rounded-full" src="@/assets/icons/madlab.png" />
            <img v-if="model.partnerType == 3" class="ml-2 w-12 h-12 border-launchpad_primary border-1 rounded-full" src="@/assets/icons/gollum.png" />
            <img v-if="model.partnerType == 4" class="ml-2 w-12 h-12 border-launchpad_primary border-1 rounded-full" src="@/assets/icons/smalcalls.png" />
            <img v-if="model.partnerType" class="absolute z-50 w-4 h-4 right-4 top-10" src="@/assets/icons/sheld.png" alt="Logo" />
          </div>
          <div class="relative my-8 flex items-center place-content-center">
            <div class="absolute z-10">
              <img class="w-48 h-48 sm:w-64 sm:h-64 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/olympus.svg" alt="Logo" />
            </div>
            <vc-donut class="hidden sm:block" :size="324" background="#081A2E" label="76" foreground="#2F455C" :thickness="12" :sections="[{ value: model.soldTokens*100 / model.presaleTokens, color: progressColor }]"></vc-donut>
            <vc-donut class="sm:hidden" :size="240" background="#081A2E" foreground="#2F455C" :thickness="10" :sections="[{ value: model.progress, color: progressColor }]"></vc-donut>
          </div>
          <div class="flex flex-col w-full">
            <h4 class="font-semibold text-2xl mt-10 gradient-text">{{ model.soldTokens / model.rate }} BNB / {{ model.presaleTokens / model.rate }} BNB</h4>
            <p class="font-semibold mt-2 text-xl text-gray-400 mb-4">{{ model.soldTokens*100 / model.presaleTokens }}% Complete</p>
            <div class="countdown mt-4 w-44 sm:w-96 mx-auto">
              <Timer :starttime="model.startDate" :endtime="model.endDate" />
            </div>
            <div clas="flex flex-col sm:flex-row space-x-4 mb-5 mt-5">
              <div class="flex flex-row space-x-4 mb-5 mt-5 justify-center">
                <a href="https://mobile.twitter.com/olympus_token" target="_blank">
                    <div class="social h-10 w-10 rounded-full text-center pt-1.5"><i class="fab fa-twitter"></i></div>
                </a>
                <a href="https://www.instagram.com/olympusbsc/?hl=en" target="_blank">
                    <div class="social h-10 w-10 rounded-full text-center pt-1.5"><i class="fab fa-instagram"></i></div>
                </a>
                <a href="https://t.me/OlympusOfficial" target="_blank">
                    <div class="social h-10 w-10 rounded-full text-center pt-1.5"><i class="fab fa-telegram"></i></div>
                </a>
                <a href="mailto:contact@olympustoken.io" target="_blank">
                    <div class="social h-10 w-10 rounded-full text-center pt-1.5"><i class="fa fa-envelope"></i></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full wow fadeInDown" data-wow-duration="0.3s" data-wow-delay="0.4s">
      <div class="text-center flex flex-col justify-between h-full items-center">
        <div class="h-full px-4 pb-4 pt-0 mx-auto">
          <div class="flex items-center bg-gray-900 mx-auto place-content-center p-4 rounded-t-2xl">
            <span class="text-base font-semibold text-gray-200">YOUR ALLOWANCE</span>&nbsp;&nbsp;&nbsp;&nbsp;              
            <span class="ml-2 gradient-text text-base font-semibold">0/5 BNB</span>
          </div>
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
                <vue3-slider class="slider z-50 mt--1" ref="portfolioSlider" v-model="percentageRaised" :data="sliderRange" :height="9" trackColor="#507194" color="#EFBD28" :min="min" :max="max" :step="12" :orientation="orientation" />
                <div class="bg-gray-600 border border-gray-300 rounded-2xl cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-200">
                  <div class="rounded-2xl w-full text-gray-200 text-right pt-3 pr-2 text-xs">BALANCE: 0</div>
                  <input
                    v-model="addAmount"
                    placeholder="Amount to add"
                    style="height: 42px;"
                    type="text"
                    class="relative w-full bg-gray-600 border border-gray-600 rounded-2xl shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm"
                  />
                </div>
                <div class="absolute font-semibold text-gray-100 right-3 top-9">BNB</div>
              </div>
          </div>
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
              <h3 class="mt-4 font-semibold">{{ model.participants }}</h3>
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
                <span class="caption gradient-text">{{ String(new Date(Number(model.startTime))).substr(3, 22)}}</span>
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="caption text-gray-100"><b>Launch end</b></span>
                <span class="caption gradient-text">{{ String(new Date(Number(model.endTime))).substr(3, 22)}}</span>
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="caption text-gray-100"><b>Token address</b></span>
                <div class="flex flex-row items-center space-x-2">
                  <span class="caption text-gray-100"><b>{{ model.tokenAddr.substr(0,18) + "..." }}</b></span>
                  <a :href="'https://testnet.bscscan.com/address/' + model.tokenAddr" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg
                  ></a>
                </div>
              </div>
              <div class="flex flex-row items-center justify-between">
                <span class="caption text-gray-100"><b>Created by</b></span>
                <div class="flex flex-row items-center space-x-2">
                  <span class="caption text-gray-100"><b>{{ model.owner.substr(0,18) + "..." }}</b></span>
                  <a :href="'https://testnet.bscscan.com/address/' + model.owner" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg
                  ></a>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col lg:flex-row space-y-4 w-full lg:space-y-0 lg:space-x-4">
            <button v-wave class="lg-btn p-4 gradient-color text-gray-100 rounded-lg w-full font-semibold hover:bg-opacity-80 transition-all duration-200">
              CLAIM
            </button>
            <button v-wave class="lg-btn p-4 border-2 border-gray-500 text-gray-200 bg-gray-400 bg-opacity-0 hover:bg-opacity-20 rounded-lg w-full font-semibold transition-all duration-200">
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
  </div>
  <div class="mt-8 px-4 py-8 w-full bg-gray-900 rounded-lg text-center transform ring-0 transition ease-in-out duration-600">
    <div class="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
      <div class="bg-gray-800 shadow-lg border-b border-gray-700">
        <div class="flex-row flex justify-between h-12 pr-9 pl-6 items-center">
          <div>Address</div>
          <div>Action</div>
        </div>
      </div>
      <div class="max-h-80 overflow-scroll px-1 py-3 lg:py-3 lg:px-3">
        <div class="flex justify-between p-2 rounded-md hover:bg-opacity-50 hover:bg-gray-700" v-for="whitelisted in enable_whitelisted_list" :key="whitelisted.id">
          <span class="hidden sm:block">{{ whitelisted.address }}</span>
          <span class="sm:hidden">{{ whitelisted.address.slice(0, 28) }}</span>
          <span class="cursor-pointer"><i class="fa fa-trash"></i></span>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-end mt-4">
      <button @click="showModal()" class="py-2 px-5 border-2 border-launchpad_primary text-launchpad_primary bg-launchpad_primary bg-opacity-0 hover:bg-opacity-20 rounded-lg font-semibold transition-all duration-200"><i class="fa fa-plus text-launchpad_primary"></i> Add</button>
    </div>
  </div>
</div>
<popup @close="showPopup = false" v-if="showPopup" @tokenAddress="setTokenAddress($event)"></popup>
</template>

<script>
import slider from "vue3-slider";
import Popup from "./Popup.vue";
import { bogintific } from "@/js/helpers/filters";
import Timer from "@/components/TimeLine.vue";
import { mapGetters, mapState } from 'vuex';

export default {
  name: "Card",
  data() {
    return {
      addAmount: "1",
      liquidityLocked: "40",
      participants: "40",
      circulatingSupply: "40000000",
      progressColor: "#EFBD28",
      percentageRaised: 1,
      showPopup: false,
      param: this.$route.params.id,
    };
  },
  
  components: {
    Timer,
    Popup,
    "vue3-slider": slider,
  },

  methods: {
    bogintific,
    setPercentageRaised(e) {
      this.percentageRaised = e;
    },
    openPopup: async function() {
      this.showPopup = true;
    },
    showModal() {
        this.openPopup();
    },
    setTokenAddress(e) {
      console.log(e);
    },
  },

  computed: {
    ...mapState(['partner_types', 'enable_whitelisted_list']),
    ...mapState('launchpad', ['launches']),
  },

  created() {
    if (this.launches) {
      let launches_data = this.launches.filter((launch) => launch.tokenAddr == this.param)[0];
      this.model = {
        ...launches_data,
      }
      console.log("this is url---", this.$route.params.id);
    } else {
      return null;
    }
  }
};
</script>

<style scoped>
.card {
  background-color: #081a2e;
  border-radius: 16px;
  padding: 20px 40px;
  max-width: 550px;
  margin: auto;
}
</style>
