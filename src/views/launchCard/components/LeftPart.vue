<template>
  <div class="w-full wow fadeInDown" data-wow-duration="0.3s" data-wow-delay="0.4s">
    <div class="h-full px-4 pb-2 pt-2 mx-auto">
      <div class="text-center flex flex-col justify-between h-full items-center">
        <div class="relative flex flex-row items-center space-x-4">
          <span :class="isLive ? 'ring-success bg-success' : 'ring-error bg-error'" class="w-3 h-3 ring-2 ring-opacity-40 rounded-full"></span>
          <h3>{{ model?.tokenName }}</h3>
          <span v-if="!model?.isWhitelisted" class="px-2 py-1 rounded-md bg-gray-700 text-gray-900 font-bold text-xs ml-2">PUBLIC</span>
          <span v-if="model?.isWhitelisted" class="px-2 py-1 rounded-md bg-gray-700 text-gray-900 font-bold text-xs ml-2">PRIVATE</span>
          <!-- <img v-if="model?.partnerType == 1" class="ml-2 w-12 h-12 border-launchpad_primary border-1 rounded-full" src="@/assets/icons/defiapetalk.png" />
          <img v-if="model?.partnerType == 2" class="ml-2 w-12 h-12 border-launchpad_primary border-1 rounded-full" src="@/assets/icons/madlab.png" />
          <img v-if="model?.partnerType == 3" class="ml-2 w-12 h-12 border-launchpad_primary border-1 rounded-full" src="@/assets/icons/gollum.png" />
          <img v-if="model?.partnerType == 4" class="ml-2 w-12 h-12 border-launchpad_primary border-1 rounded-full" src="@/assets/icons/smalcalls.png" />
          <img v-if="model?.partnerType" class="absolute z-50 w-4 h-4 right-4 top-10" src="@/assets/icons/sheld.png" alt="Logo" /> -->
        </div>
        <div class="relative my-8 flex items-center place-content-center">
          <div class="absolute z-10">
            <img 
              class="w-48 h-48 sm:w-64 sm:h-64 border-launchpad_primary border-2 rounded-full" 
              :src="src" 
              alt="Logo" 
            />
          </div>
          <vc-donut 
            class="hidden sm:block" 
            :size="324" background="#081A2E" label="76" foreground="#2F455C" :thickness="12" 
            :sections="[{ 
              value: formatEther(model.soldTokens.toString()) * 100 / formatEther(model.presaleTokens.toString()), 
              color: progressColor 
            }]"
          ></vc-donut>
          <vc-donut 
            class="sm:hidden" 
            :size="240" background="#081A2E" foreground="#2F455C" :thickness="10" 
            :sections="[{ 
              value: formatEther(model.soldTokens.toString()) * 100 / formatEther(model.presaleTokens.toString()), 
              color: progressColor 
          }]"></vc-donut>
        </div>
        <div class="flex flex-col w-full">
          <h4 class="font-semibold text-2xl mt-10 gradient-text">
            {{ formatEther(model.fundRaised.toString()) }} BNB / {{ model.presaleTokens.div(model?.rate).div(parseDecimals(model.decimals)).toString() }} BNB
          </h4>
          <p class="font-semibold mt-2 text-xl text-gray-400 mb-4">{{ formatEther(model.soldTokens.toString()) * 100 / formatEther(model.presaleTokens.toString()) }}% Complete</p>
          <div class="countdown mt-4 w-44 sm:w-96 mx-auto">
            <TimeLine :startTime="model?.startTime" :endTime="model?.endTime" :launch="model" />
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
</template>
<script>
import { BigNumber, utils } from 'ethers';

import TimeLine from "@/components/TimeLine.vue";
import { getLogoURL } from '@/js/service.js'; 

export default {
  components: {
    TimeLine,
  },
  props: {
    model: Object,
    isLive: Boolean,
  },
  data() {
    return {
      src: null,
      progressColor: "#EFBD28"
    }
  },
  async created() {
    try{
      this.src = await getLogoURL(this.model.id);
    }catch(e){
      return this.src =  require('@/assets/icons/unknownToken.svg');
    }
  },
  mounted() {
    console.log(this.formatEther(this.model.soldTokens.toString()) * 100 / this.formatEther(this.model.presaleTokens.toString()), )
  },
  methods: {
    parseDecimals(decimals) {
      if(isNaN(decimals) || decimals < 0) return;
      return BigNumber.from('10').pow(decimals);
    },
    formatEther(ether) {
      return utils.formatEther(ether);
    }
  }
}
</script>