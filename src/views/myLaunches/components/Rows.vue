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
      <div class="flex p-3 lg:w-1/3 md:w-1/2 w-full justify-between" v-for="launche in launchesCreated" :key="launche.tokenAddr">
        <div class="relative w-full bg-gray-900 p-6 shadow-smooth border-gray-600 border rounded-2xl flex flex-col items-center">
          <img v-if="launche.partnerType == 1" class="absolute z-20 w-10 h-10 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/defiapetalk.png" alt="Logo" />
          <img v-if="launche.partnerType == 2" class="absolute z-20 w-10 h-10 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/madlab.png" alt="Logo" />
          <img v-if="launche.partnerType == 3" class="absolute z-20 w-10 h-10 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/gollum.png" alt="Logo" />
          <img v-if="launche.partnerType == 4" class="absolute z-20 w-10 h-10 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/smalcalls.png" alt="Logo" />
          <img v-if="typeof(launche.partnerType) == `number`" class="absolute z-30 w-4 h-4 right-9 top-14" src="@/assets/icons/sheld.png" alt="Logo" />
          <h3 class="mb-2">{{ launche.tokenName }}</h3>
          <img class="absolute z-10 mt-14 w-32 h-32 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/olympus.svg" alt="Logo" />
          <vc-donut :size="160" background="#081A2E" foreground="#2F455C" :thickness="8" :sections="[{ value: launche.progress, color: progressColor }]"></vc-donut>
          <div class="countdown mt-4 text-center pr-4 pl-4 lg:w-full">
            <TimeLine :starttime="launche.startTime" :endtime="launche.endTime" />
          </div>
          <button @click="$router.push(`/launchcard/${launche.tokenAddr}`)" class="py-2 px-4 bg-gray-600 hover:bg-gray-500 font-semibold mt-4 rounded-full">View</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import TimeLine from "@/components/TimeLine.vue";

export default {
  components: {
    TimeLine
  },
  data() {
    return {
      progressColor: "#EFBD28",
      isCreated: true,
      isJoined: false,
      isActived: true,
      isEnded: false,
    };
  },
  methods: {
    setCreated() {
      this.isCreated = true;
      this.isJoined = false;
    },
    setJoined() {
      this.isJoined = true;
      this.isCreated = false;
    },
    setActived() {
      this.isActived = true;
      this.isEnded = false;
    },
    setEnded() {
      this.isEnded = true;
      this.isActived = false;
    }
  },
  computed: {
    ...mapState(['launches', 'partner_types']),
    ...mapGetters('wallet', [
      'address'
    ]),
    launchesCreated() {
      if (this.launches[0]) {
        if (this.isCreated) {
            return this.launches[0].filter((launche) => {
              if (this.isActived) return launche.owner == this.address && launche.isLive == true;
              else return launche.owner == this.address && launche.isLive == false;
            })
        } else {

        }
      } else {
        return null;
      }

    }
  },
  created() {
    
  }
};
</script>
