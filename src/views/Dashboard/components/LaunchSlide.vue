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
    <swiper-slide v-for="launch in launches" :key="launch.tokenAddr">
      <Card 
        :launch="launch" 
      />
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
    <swiper-slide v-for="launch in launches" :key="launch.tokenAddr">
      <Card 
        :launch="launch" 
      />
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
    <swiper-slide v-for="launch in launches" :key="launch.tokenAddr">
      <Card 
        :launch="launch" 
      />
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
    <swiper-slide v-for="launch in launches" :key="launch.tokenAddr">
      <Card 
        :launch="launch" 
      />
    </swiper-slide>
  </swiper>
</template>
<script>
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import TimeLine from '@/components/TimeLine.vue';
import Card from '@/components/Card.vue';
import { useWindowSize } from 'vue-window-size';
import { mapGetters, mapState } from 'vuex';

// Import Swiper styles
import '@/assets/scss/main.scss';
import '@/assets/scss/pagination.scss';
import '@/assets/scss/navigation.scss';

// install Swiper components
SwiperCore.use([Navigation, Pagination, A11y]);

// Import Swiper styles
export default {
  components: {
    Swiper,
    SwiperSlide,
    TimeLine,
    Card
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