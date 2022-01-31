<template>
  <div class="w-full lg:mt-o mt-4 bg-gray-900 border border-gray-700 p-4 items-center rounded-2xl overflow-hidden flex flex-col wow fadeInDown mb-4" data-wow-duration="0.3s" data-wow-delay="0.6s">
    <h3 class="gradient-text">Filter by Token</h3>
    <input
      class="bg-launchpad_primary overline bg-opacity-10 hover:shadow-launchpad_primary focus:shadow-launchpad_primary relative filterByToken mt-4 border-launchpad_primary transition-all duration-200 placeholder-launchpad_primary-light text-launchpad_primary rounded-full border p-3 w-full text-center"
      placeholder="Search by token name or address"
    />
  </div>

  <div class="text-center w-full wow fadeInDown mb-4" data-wow-duration="0.3s" data-wow-delay="0.7s">
    <div class="flex lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-4 max-w-150 mx-auto">
      <div class="lg:w-1/2">
        <div class="flex p-1 space-x-1 bg-gray-900 border border-gray-700 rounded-xl">
            <button
              @click="setCreated()"
              :class="[
                'w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg',
                'focus:outline-none focus:ring-1 ring-white ring-opacity-60',
                isCreated ? 'bg-gradient-to-r font-semibold shadow-launchpad_primary from-launchpad_primary to-launchpad_primary-xtra_dark' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
              ]"
            >
              Created
            </button>
            <button
              @click="setJoined()"
              :class="[
                'w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg',
                'focus:outline-none focus:ring-1 ring-white ring-opacity-60',
                isJoined ? 'bg-gradient-to-r font-semibold shadow-launchpad_primary from-launchpad_primary to-launchpad_primary-xtra_dark' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
              ]"
            >
              Joined
            </button>
        </div>
      </div>
      <div class="lg:w-1/2">
        <div class="flex p-1 space-x-1 bg-gray-900 border border-gray-700 rounded-xl">
            <button
              @click="setActived()"
              :class="[
                'w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg',
                'focus:outline-none focus:ring-1 ring-white ring-opacity-60',
                isActived ? 'bg-gradient-to-r font-semibold shadow-launchpad_primary from-launchpad_primary to-launchpad_primary-xtra_dark' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
              ]"
            >
              Active
            </button>
            <button
              @click="setEnded()"
              :class="[
                'w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg',
                'focus:outline-none focus:ring-1 ring-white ring-opacity-60',
                isEnded ? 'bg-gradient-to-r font-semibold shadow-launchpad_primary from-launchpad_primary to-launchpad_primary-xtra_dark' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
              ]"
            >
              Ended
            </button>
        </div>
      </div>
    </div>
  </div>

  <section class="container wow fadeInDown relative mt-10" data-wow-duration="0.3s" data-wow-delay="0.8s">
    <div class="flex flex-wrap p-2 w-full mb-10">
      <div class="flex p-3 lg:w-1/3 md:w-1/2 w-full justify-between" v-for="launch in filteredLaunches()" :key="launch.tokenAddr">
        <Card 
          :launch="launch" 
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
// import {
//   checkJoined
// } from "@/js/web3.js";
import Card from '@/components/Card.vue';


export default {
  components: {
    Card,
  },
  data() {
    return {
      progressColor: "#EFBD28",
      isCreated: true,
      isActived: true,
    };
  },
  methods: {
    setCreated() {
      this.isCreated = true;
    },
    setJoined() {
      this.isCreated = false;
    },
    setActived() {
      this.isActived = true;
    },
    setEnded() {
      this.isActived = false;
    },
    isLive(oneLaunch) {
      if(oneLaunch?.isFinalized || oneLaunch?.startTime.getTime() > Date.now() || oneLaunch?.endTime.getTime() < Date.now()) return false;
      return true;
    },
    filteredLaunches() {
      return this.launches.filter(launch => (launch.owner === this.address && this.isLive(launch)));
    },
  },
  computed: {
    ...mapState(['partner_types']),
    ...mapState('launchpad', ['launches']),
    ...mapGetters('wallet', [
      'address'
    ]),
  },
};
</script>
