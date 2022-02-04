<template>
  <div class="w-full lg:mt-o mt-4 bg-gray-900 border border-gray-700 p-4 items-center rounded-2xl overflow-hidden flex flex-col wow fadeInDown mb-4" data-wow-duration="0.3s" data-wow-delay="0.6s">
    <h3 class="gradient-text">Filter by Token</h3>
    <input
      class="bg-launchpad_primary overline bg-opacity-10 hover:shadow-launchpad_primary focus:shadow-launchpad_primary relative filterByToken mt-4 border-launchpad_primary transition-all duration-200 placeholder-launchpad_primary-light text-launchpad_primary rounded-full border p-3 w-full text-center"
      placeholder="Search by token name or address"
    />
  </div>

  <div class="text-center w-full wow fadeInDown mb-4" data-wow-duration="0.3s" data-wow-delay="0.7s">
    <toggles />
  </div>

  <section class="container wow fadeInDown relative mt-10" data-wow-duration="0.3s" data-wow-delay="0.8s">
    <div class="flex flex-wrap p-2 w-full mb-10">
      <div class="flex p-3 lg:w-1/3 md:w-1/2 w-full justify-between" v-for="launche in this.launches_data" :key="launche.id">
        <div v-if="launche.partnerType == this.$route.params.id" class="relative w-full bg-gray-900 p-6 shadow-smooth border-gray-600 border rounded-2xl flex flex-col items-center">
          <h3 class="mb-2">{{ launche.name }}</h3>
          <img class="absolute z-10 mt-14 w-32 h-32 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/olympus.svg" alt="Logo" />
          <img v-if="this.$route.params.id == 1" class="absolute z-20 right-5 w-10 h-10 border-launchpad_primary border-1 rounded-full" src="@/assets/icons/midas.jpg" alt="Logo" />
          <img v-if="this.$route.params.id == 2" class="absolute z-20 right-5 w-10 h-10 border-launchpad_primary border-1 rounded-full" src="@/assets/icons/gollum.jpg" alt="Logo" />
          <img v-if="this.$route.params.id == 3" class="absolute z-20 right-5 w-10 h-10 border-launchpad_primary border-1 rounded-full" src="@/assets/icons/defi.jpg" alt="Logo" />
          <img v-if="this.$route.params.id == 4" class="absolute z-20 right-5 w-10 h-10 border-launchpad_primary border-1 rounded-full" src="@/assets/icons/apefam.jpg" alt="Logo" />
          <img v-if="this.$route.params.id == 5" class="absolute z-20 right-5 w-10 h-10 border-launchpad_primary border-1 rounded-full" src="@/assets/icons/early.jpg" alt="Logo" />
          <img class="absolute z-30 w-4 h-4 right-8 top-14" src="@/assets/icons/sheld.png" alt="Logo" />
          <vc-donut :size="160" background="#081A2E" foreground="#2F455C" :thickness="8" :sections="[{ value: launche.progress, color: progressColor }]"></vc-donut>
          <div class="countdown mt-4 text-center pr-4 pl-4 lg:w-full">
            <TimeLine :starttime="launche.startDate" :endtime="launche.endDate" />
          </div>
          <button @click="$router.push(`/launchcard/${launche.id}`)" class="py-2 px-4 bg-gray-600 hover:bg-gray-500 font-semibold mt-4 rounded-full">View</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Toggles from "./Toggles.vue";
import { mapGetters, mapState } from 'vuex';
import TimeLine from "@/components/TimeLine.vue";

export default {
  components: {
    Toggles,
    TimeLine
  },
  data() {
    return {
      progressColor: "#EFBD28",
    };
  },
  computed: {
    ...mapState(['launches', 'partner_types']),
    ...mapGetters(['partnerType1Launches', 'partnerType2Launches', 'partnerType3Launches', 'partnerType4Launches']),
  },
  created() {
    let launches_data = {};
    if ( this.$route.params.id == 1) {
      this.launches_data = this.partnerType1Launches;
    }
    if ( this.$route.params.id == 2) {
        this.launches_data = this.partnerType2Launches;
    }
    if ( this.$route.params.id == 3) {
        this.launches_data = this.partnerType3Launches;
    }
    if ( this.$route.params.id == 4) {
        this.launches_data = this.partnerType4Launches;
    }
  }
};
</script>
