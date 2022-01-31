<template>
  <section class="">
    <div class="container mx-auto px-4 mt-8 lg:mt-24 text-center flex place-self-center flex-col w-full wow fadeInDown" data-wow-duration="0.3s" data-wow-delay="0s">
      <h2 class="pb-2">THE FORGE OF HEPHAESTUS</h2>
      <p class="mt-3 text-white text-base sm:text-xl lg:text-2xl">THE ONLY PLACE TO LAUNCH YOUR TOKEN PROJECTS</p>
    </div>
    <div class="container mx-auto px-4 text-center w-full wow fadeInDown mb-4 mt-12" data-wow-duration="0.3s" data-wow-delay="0.7s">
      <toggles :statuses="statuses" :value="status" @update="status = $event" />
    </div>

    <LaunchSlide v-if="launches.length > 0" :launches="filteredLaunches" />

    <div v-if="partners.length > 0" class="container mx-auto px-4 text-center flex place-self-center flex-col w-full wow fadeInDown mt-20 mb-10" data-wow-duration="0.3s" data-wow-delay="0s">
      <h2 class="pb-2">CALL CHANNEL ENDORSED</h2>
      <p class="mt-3 text-white text-base sm:text-xl lg:text-2xl">THESE PROJECTS HAVE BEEN VERIFIED BY OUR TRUSTED CALL CHANNEL PARTNERS</p>
    </div>

    <PartnerSlide v-if="partners.length > 0" />

    <div class="container mx-auto px-4 flex flex-col lg:space-y-0 space-y-4 lg:flex-row justify-between items-center">
      <div class="flex items-center place-content-center lg:order-1 order-2 bg-opacity-90 border-gray-700 border-2 bg-gray-900 w-full rounded-2xl overflow-hidden py-10 wow fadeInLeft" data-wow-duration="0.3s" data-wow-delay="0.4s">
        <div class="flex items-center flex-col">
          <img class="mt-4 p-4 bg-opacity-20 bg-launchpad_primary w-24 h-24 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/launchedprojects.png" alt="Logo" />
          <h2 class="gradient-text my-2">{{ launchesIn24H }}</h2>
          <h3 class="overline">PROJECT LAUNCHING IN 24H</h3>
        </div>
      </div>

      <div class="container mx-auto px-4 w-full place-content-center flex justify-center lg:order-2 order-1 relative lg:h-125 wow fadeInDown" data-wow-duration="0.3s" data-wow-delay="0.4s">
        <Logo class="self-center" />
      </div>

      <div class="container mx-auto px-4 flex items-center place-content-center lg:order-3 order-3 bg-opacity-90 border-gray-700 border-2 bg-gray-900 w-full rounded-2xl overflow-hidden py-10 wow fadeInRight" data-wow-duration="0.3s" data-wow-delay="0.4s">
        <div class="flex items-center flex-col">
          <img class="mt-4 p-4 bg-opacity-20 bg-launchpad_primary w-24 h-24 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/fairlaunch.png" alt="Logo" />
          <h2 class="gradient-text my-2">{{ totalProjects }}</h2>
          <h3 class="overline">TOTAL PROJECTS LAUNCHED</h3>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 mt-5 container flex lg:flex-row flex-col wow fadeInDown lg:space-y-0 space-y-4 lg:space-x-4" data-wow-duration="0.6s" data-wow-delay="0.9s">
      <largeButton name="EXPLORE LAUNCHES" btnname="EXPLORE" routername="explore" />
      <largeButton name="MY LAUNCHES" btnname="MY LAUNCH" routername="mylaunches" />
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import Logo from "@/components/Logo.vue";
import largeButton from "@/components/largeButton.vue";
import Toggles from "./Toggles.vue";
import { mapGetters, mapState } from 'vuex';
import PartnerSlide from "./PartnerSlide.vue";
import LaunchSlide from "./LaunchSlide.vue";

export default {
  name: "Gateway",
  components: {
    Logo,
    largeButton,
    Toggles,
    PartnerSlide,
    LaunchSlide,
  },
  data() {
    return {
      progressColor: '#EFBD28',
      statuses: ['POPULAR', 'NEWEST', 'ENDING SOON'],
      status: 'POPULAR',
    };
  },
  updated() {
    console.log(this.status);
  },
  computed: {
    ...mapState(['partner_types', 'partners']),
    ...mapState('launchpad', ['launches']),
    ...mapGetters(['verifiedByParter']),
    ...mapGetters('launchpad', ['totalProjects', 'launchesIn24H']),
    filteredLaunches() {
      const temp = [...this.launches];
      if(this.status === 'NEWEST') {
        return temp.sort((a, b) => {
          a.createdAt < b.createdAt; 
        }).slice(0, 10);
      }
      if(this.status === 'ENDING SOON') {
        return temp.filter(launch => launch.endTime.getTime() > Date.now()).sort((a, b) => {
          return a.endTime > b.endTime;
        }).slice(0, 10);
      }
      return this.launches;
    }
  },
};
</script>
