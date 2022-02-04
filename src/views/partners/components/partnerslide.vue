<template>
  <swiper
    :slides-per-view="4"
    :space-between="10"
    navigation
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :breakpoints="swiperOptions.breakpoints"
  >
    <swiper-slide v-for="partner_type in partner_types" :key="partner_type.id">
        <PartnerCard 
            :partner_type="partner_type" 
        />
    </swiper-slide>
  </swiper>
</template>
<script>
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import TimeLine from "@/components/TimeLine.vue";
import PartnerCard from '@/components/partnercard.vue';
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
    TimeLine,
    PartnerCard
  },
  data() {
    return {
      progressColor: "#EFBD28",
      swiperOptions: {
          breakpoints: {       
      320: {       
         slidesPerView: 1,
         spaceBetween: 10     
      },          
      770: {       
         slidesPerView: 2,       
         spaceBetween: 10     
      },   
  
      771: {       
         slidesPerView: 4,       
         spaceBetween: 10     
      } 
    }   
    }

    };
  },
  computed: {
    ...mapState(['partner_types']),
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
    setup() {
    const { width, height } = useWindowSize();
    return {
      windowWidth: width,
      windowHeight: height,
    };
    },
  },
};
</script>
<style lang="sass" scoped>

.div
    height: 80vh
.swiper-container
    height: 80vh
    padding: 3rem
    .swiper-wrapper
        .swiper-slide
            border-radius: 5px
</style>
