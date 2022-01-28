<template>
  <swiper
    :slides-per-view="1"
    :space-between="50"
    navigation
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="sm:hidden p-9 "
  >
    <swiper-slide v-for="launche in launches" :key="launche.tokenAddr">
      <div class="relative w-full bg-gray-900 p-6 shadow-smooth border-gray-600 border rounded-2xl flex flex-col items-center">
        <img v-if="launche.partnerType == 1" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/defiapetalk.png" alt="Logo" />
        <img v-if="launche.partnerType == 2" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/madlab.png" alt="Logo" />
        <img v-if="launche.partnerType == 3" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/gollum.png" alt="Logo" />
        <img v-if="launche.partnerType == 4" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/smalcalls.png" alt="Logo" />
        <h4 class="mb-4">{{ launche.tokenName }}</h4>
        <img class="absolute z-10 mt-14 w-32 h-32 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/olympus.svg" alt="Logo" />
        <vc-donut :size="160" background="#081A2E" foreground="#2F455C" :thickness="8" :sections="[{ value: launche.soldTokens*100 / launche.presaleTokens, color: progressColor }]"></vc-donut>
        <div class="countdown mt-4 text-center pr-4 pl-4 lg:w-full">
          <TimeLine :starttime="launche.startTime" :endtime="launche.endTime" />
        </div>
        <button @click="$router.push(`/launchcard/${launche.tokenAddr}`)" class="py-2 px-4 bg-gray-600 hover:bg-gray-500 font-semibold mt-4 rounded-full">View</button>
      </div>
    </swiper-slide>
  </swiper>
  <swiper
    :slides-per-view="2"
    :space-between="60"
    navigation
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="hidden sm:block lg:hidden pb-10"
  >
    <swiper-slide v-for="launche in launches" :key="launche.tokenAddr">
      <div class="relative w-full bg-gray-900 p-6 shadow-smooth border-gray-600 border rounded-2xl flex flex-col items-center">
        <img v-if="launche.partnerType == 1" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/defiapetalk.png" alt="Logo" />
        <img v-if="launche.partnerType == 2" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/madlab.png" alt="Logo" />
        <img v-if="launche.partnerType == 3" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/gollum.png" alt="Logo" />
        <img v-if="launche.partnerType == 4" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/smalcalls.png" alt="Logo" />
        <h4 class="mb-4">{{ launche.tokenName }}</h4>
        <img class="absolute z-10 mt-14 w-32 h-32 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/olympus.svg" alt="Logo" />
        <vc-donut :size="160" background="#081A2E" foreground="#2F455C" :thickness="8" :sections="[{ value: launche.soldTokens*100 / launche.presaleTokens, color: progressColor }]"></vc-donut>
        <div class="countdown mt-4 text-center pr-4 pl-4 lg:w-full">
          <TimeLine :starttime="launche.startTime" :endtime="launche.endTime" />
        </div>
        <button @click="$router.push(`/launchcard/${launche.tokenAddr}`)" class="py-2 px-4 bg-gray-600 hover:bg-gray-500 font-semibold mt-4 rounded-full">View</button>
      </div>
    </swiper-slide>
  </swiper>
  <swiper
    :slides-per-view="3"
    :space-between="60"
    navigation
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="hidden lg:block xl:hidden pb-10"
  >
    <swiper-slide v-for="launche in launches" :key="launche.tokenAddr">
      <div class="relative w-full bg-gray-900 p-6 shadow-smooth border-gray-600 border rounded-2xl flex flex-col items-center">
        <img v-if="launche.partnerType == 1" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/defiapetalk.png" alt="Logo" />
        <img v-if="launche.partnerType == 2" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/madlab.png" alt="Logo" />
        <img v-if="launche.partnerType == 3" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/gollum.png" alt="Logo" />
        <img v-if="launche.partnerType == 4" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/smalcalls.png" alt="Logo" />
        <h4 class="mb-4">{{ launche.tokenName }}</h4>
        <img class="absolute z-10 mt-14 w-32 h-32 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/olympus.svg" alt="Logo" />
        <vc-donut :size="160" background="#081A2E" foreground="#2F455C" :thickness="8" :sections="[{ value: launche.soldTokens*100 / launche.presaleTokens, color: progressColor }]"></vc-donut>
        <div class="countdown mt-4 text-center pr-4 pl-4 lg:w-full">
          <TimeLine :starttime="launche.startTime" :endtime="launche.endTime" />
        </div>
        <button @click="$router.push(`/launchcard/${launche.tokenAddr}`)" class="py-2 px-4 bg-gray-600 hover:bg-gray-500 font-semibold mt-4 rounded-full">View</button>
      </div>
    </swiper-slide>
  </swiper>
  <swiper
    :slides-per-view="4"
    :space-between="60"
    navigation
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="hidden xl:block pb-10"
  >
    <swiper-slide v-for="launche in launches" :key="launche.tokenAddr">
      <div class="relative w-full bg-gray-900 p-6 shadow-smooth border-gray-600 border rounded-2xl flex flex-col items-center">
        <img v-if="launche.partnerType == 1" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/defiapetalk.png" alt="Logo" />
        <img v-if="launche.partnerType == 2" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/madlab.png" alt="Logo" />
        <img v-if="launche.partnerType == 3" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/gollum.png" alt="Logo" />
        <img v-if="launche.partnerType == 4" class="absolute z-20 w-6 h-6 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/smalcalls.png" alt="Logo" />
        <h4 class="mb-4">{{ launche.tokenName }}</h4>
        <img class="absolute z-10 mt-14 w-32 h-32 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/olympus.svg" alt="Logo" />
        <vc-donut :size="160" background="#081A2E" foreground="#2F455C" :thickness="8" :sections="[{ value: launche.soldTokens*100 / launche.presaleTokens, color: progressColor }]"></vc-donut>
        <div class="countdown mt-4 text-center pr-4 pl-4 lg:w-full">
          <TimeLine :starttime="launche.startTime" :endtime="launche.endTime" />
        </div>
        <button @click="$router.push(`/launchcard/${launche.tokenAddr}`)" class="py-2 px-4 bg-gray-600 hover:bg-gray-500 font-semibold mt-4 rounded-full">View</button>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script>
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import TimeLine from "@/components/TimeLine.vue";
import { useWindowSize } from 'vue-window-size';
import { mapGetters, mapState } from 'vuex';

// Import Swiper styles
import "@/assets/scss/main.scss";
import "@/assets/scss/pagination.scss";
import "@/assets/scss/navigation.scss";

// install Swiper components
SwiperCore.use([Navigation, Pagination, A11y]);

// Import Swiper styles
export default {
  components: {
    Swiper,
    SwiperSlide,
    TimeLine
  },
  data() {
    return {
      progressColor: "#EFBD28",
    };
  },
  computed: {
    ...mapState('launchpad', ['launches']),
    ...mapState(['partner_types']),
    ...mapGetters(['verifiedByParter']),
  },
  created() {
  },
  methods: {
    onSwiper(swiper) {
      // console.log(swiper)
    },
    onSlideChange() {
      // console.log('slide change')
    },

  },
  setup() {
    const { width, height } = useWindowSize();
    return {
      windowWidth: width,
      windowHeight: height,
    };
  },
};
</script>