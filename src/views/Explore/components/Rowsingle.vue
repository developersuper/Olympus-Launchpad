<template>
  <router-link @click="$router.push(`/launchcard/${launch.presaleAddr}`)" to="" class="mb-5 px-10 py-6 bg-gray-800 lg:py-3 lg:px-3 lg:mb-0 flex lg:flex-row flex-col justify-between items-center lg:bg-transparent hover:bg-opacity-50 hover:bg-gray-700 rounded-lg lg:mx-0 mx-4">
    <div class="tokenNameCell mb-2 lg:pb-0 pb-4 flex items-center">
      <span :class="isLive ? 'ring-success bg-success' : 'ring-error bg-error'" class="w-3 h-3 ring-2 ring-opacity-40 rounded-full"></span>
      <img class="ml-2 w-6 h-6 border-launchpad_primary border-2 rounded-full" :src="src" />
      <span class="font-semibold text-sm uppercase inline-block ml-2 lg:font-normal">{{ launch.tokenName }}</span>
      <span v-if="!launch.isWhitelisted" class="px-2 py-1 rounded-md bg-gray-500 font-bold text-gray-900 text-xs ml-2 hidden xl:block">PUBLIC</span>
      <span v-if="launch.isWhitelisted" class="px-2 py-1 rounded-md bg-gray-500 font-bold text-gray-900 text-xs ml-2 hidden xl:block">PRIVATE</span>
      <span v-if="!launch.isWhitelisted" class="px-2 py-1 rounded-md bg-gray-500 font-bold text-gray-900 text-xs ml-2 xl:hidden">PUB</span>
      <span v-if="launch.isWhitelisted" class="px-2 py-1 rounded-md bg-gray-500 font-bold text-gray-900 text-xs ml-2 xl:hidden">PRI</span>
      <!-- <img v-if="partnerType == 1" class="ml-2 w-6 h-6 border-launchpad_primary border-1 rounded-full" :src="this.partner_types[0].icon" />
      <img v-if="partnerType == 2" class="ml-2 w-6 h-6 border-launchpad_primary border-1 rounded-full" :src="this.partner_types[1].icon" />
      <img v-if="partnerType == 3" class="ml-2 w-6 h-6 border-launchpad_primary border-1 rounded-full" :src="this.partner_types[2].icon" />
      <img v-if="partnerType == 4" class="ml-2 w-6 h-6 border-launchpad_primary border-1 rounded-full" :src="this.partner_types[3].icon" /> -->
    </div>

    <div class="text-sm justify-between w-full flex launchRatioCell">
      <span class="lg:hidden mb-1 inline-block md:text-base font-semibold text-gray-200 pr-2">Rate</span>
      <span 
        class="text-launchpad_primary font-semibold md:text-base lg:text-xs lg:text-gray-100 lg:font-normal" 
        v-html="'1 BNB = ' + launch.rate.toString() + ' ' + launch?.symbol"
      ></span>
    </div>
    <div class="text-sm justify-between w-full flex launchParticipantsCell">
      <span class="lg:hidden mb-1 inline-block md:text-base font-semibold text-gray-200 pr-2">Participants</span>
      <span class="text-launchpad_primary font-semibold md:text-base lg:text-xs lg:text-gray-100 lg:font-normal">{{ launch.participants.toString() }}</span>
    </div>
    <div class="text-sm justify-between w-full flex launchTypeCell">
      <span class="lg:hidden mb-1 inline-block md:text-base font-semibold text-gray-200 pr-2">Launch Type</span>
      <span class="text-launchpad_primary font-semibold md:text-base lg:text-xs lg:text-gray-100 lg:font-normal">{{ launch.launchType }}</span>
    </div>
    <div class="text-sm lg:text-xs justify-between w-full flex launchProgressCell">
      <span class="lg:hidden mb-1 inline-block md:text-base font-semibold text-gray-200 pr-2">Progress</span>
      <div class="countdown lg:pr-4 lg:w-full caption">
        <div class="time font-semibold text-launchpad_primary uppercase md:text-base lg:text-xs lg:text-gray-100 lg:font-normal">
          {{ (launch.soldTokens).div(launch.totalTokens).mul(100).toString() }} %
        </div>
        <div class="hidden lg:block h-3 bg-gray-700 rounded-full w-full">
          <div class=" w-full rounded-full bg-gradient-to-r to-launchpad_primary-dark h-full from-launchpad_primary" v-bind:style="`width:${(launch.soldTokens).div(launch.totalTokens).mul(100).toString()}%`"></div>
        </div>
      </div>
    </div>
    <div class="text-sm lg:text-xs justify-between w-full flex launchEndsCell">
      <span class="lg:hidden mb-1 inline-block md:text-base font-semibold text-gray-200 pr-2">Ends</span>
      <div class="countdown lg:pr-4 lg:w-full caption">
        <TimeLine1 :startTime="launch.startTime.getTime()" :endTime="launch.endTime.getTime()" :launch="launch" />
        <!-- <TimeLine1 :startTime="Date.now() - 100000" :endTime="launch.endTime.getTime()" :launch="launch" /> -->
      </div>
    </div>
    <div class="mt-4 pl-0 lg:mt-0 text-sm actionColCell hover:opacity-50 transition-opacity duration-200 text-launchpad_primary justify-start flex items-center lg:pl-8">
      <button class="px-4 py-1 rounded-full bg-gray-500 font-bold text-gray-100 text-sm ml-2">VIEW</button>
    </div>
  </router-link>
</template>

<script>
import { mapState } from 'vuex';

import { bogintific } from '@/js/helpers/filters';
import TimeLine1 from '@/components/TimeLine1.vue';
import { getLogoURL } from '@/js/service.js';

export default {
  props: {
    launch: Object,
  },
  name: 'Rowsingle',
  components: {
    TimeLine1,
  },
  data() {
    return {
      src: null,
    }
  },
  async created() {
    try{
      this.src = await getLogoURL(this.launch.presaleAddr);
    }catch(e){
      return this.src =  require('@/assets/icons/unknownToken.svg');
    }
  },
  computed: {
    ...mapState(['nowTime']),
    isLive() {
      if(this.launch?.isFinalized || this.launch?.startTime.getTime() > this.nowTime || this.launch?.endTime.getTime() < this.nowTime) return false;
      return true;
    }
  },
  methods: {
    bogintific,
  },
};
</script>

<style scoped>
.row_head button {
  padding: 4px;
  background: transparent;
  position: relative;
}

.progress {
  padding: 0;
  width: 90%;
  height: 10px;
  overflow: hidden;
  background: #3a546b;
  border-radius: 12px;
  margin: 5px 0 !important;
  min-width: 140px;
}


.time {
  display: flex;
}
</style>
