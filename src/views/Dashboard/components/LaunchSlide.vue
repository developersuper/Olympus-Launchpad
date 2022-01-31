<template>
  <swiper
    :slides-per-view="1"
    :space-between="50"
    navigation
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="sm:block p-9 md:hidden"
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
    class="hidden md:block xl:hidden pb-10"
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
    class="hidden xl:block 2xl:hidden pb-10"
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
    class="hidden 2xl:block pb-10"
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
  props: {
    launches: Array,
  },
  components: {
    Swiper,
    SwiperSlide,
    Card
  },
  data() {
    return {
      progressColor: "#EFBD28",
    };
  },
  computed: {
    ...mapState(['partner_types']),
    ...mapGetters(['verifiedByParter']),
  },
  mounted() {
    console.log('launches', this.launches);
  },
  methods: {
    onSwiper() {
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