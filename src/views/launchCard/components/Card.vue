<template>
<Head :model="model"/>
<div class="flex flex-col lg:flex-row space-x-0 lg:space-y-0 space-y-4 lg:space-x-4 w-full">
  <div v-if="loading">Loading..</div>
  <div v-else class="flex flex-col w-full">
    <div class="flex flex-1 flex-col bg-gray-900 border border-gray-700 p-4 h-full rounded-2xl lg:flex-row space-x-0 lg:space-y-0 space-y-4 lg:space-x-4 w-full">
      <LeftPart class="" :model="model" :isLive="isLive" />
      <RightPart :model="model" :bought="parseEther('0.1')" :isLive="isLive" />
    </div>
  </div>
</div>
</template>

<script>
import { 
  getPresaleInfo, 
  getDecimals, 
} from '@/js/web3.js';
import { mapState, mapActions, mapGetters } from 'vuex';

import LeftPart from './LeftPart.vue';
import RightPart from './RightPart.vue';
import Head from './Head.vue';
import { 
  utils,  
} from 'ethers';

export default {
  name: "Card",
  data() {
    return {
      loading: false,
      addAmount: "1",
      liquidityLocked: "40",
      participants: "40",
      circulatingSupply: "40000000",
      progressColor: "#EFBD28",
      percentageRaised: 0,
      model: null,
      launch: null,
    };
  },
  components: {
    LeftPart,
    RightPart,
    Head,
  },
  methods: {
    ...mapActions('launchpad',[
      'loadPresales'
    ]),
    parseEther(ether) {
      return utils.parseEther(ether);
    }
  },
  computed: {
    ...mapState('wallet', ['address', 'provider']),
    ...mapState(['partner_types', 'enable_whitelisted_list']),
    ...mapState('launchpad', ['launches']),
    ...mapGetters('wallet', ['isWalletConnected']),
    isLive() {
      if( 
        this.model?.isFinalized || 
        this.model?.startTime?.getTime() > this.nowTime || 
        this.model?.endTime?.getTime() < this.nowTime
      ) return false;
      return true;
    },
  },
  async created () {
    this.loading = true;
    this.model = await getPresaleInfo(this.$route.params.id);
    if(this.launches.length === 0) {
      await this.loadPresales();
    }
    this.launch = this.launches.filter(launch => launch.presaleAddr === this.$route.params.id)[0];
    
    if(this.launch && this.model) {
      const decimals = await getDecimals(this.launch.tokenAddr);
      this.model = {
        ...this.launch,
        ...this.model,
        decimals,
      }
    }
    console.log('getting model in card:', this.model);
    this.loading = false;
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
