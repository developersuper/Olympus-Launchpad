<template>
  <div :key="partner_type.id" @click="$router.push(`/partners/${partner_type.id}`)" class="w-full bg-gray-900 p-6 shadow-smooth border-gray-600 border rounded-2xl h-full flex flex-col items-center">
        <img class="mb-4 bg-opacity-20 w-32 h-32 rounded-full" :src="partner_type.icon" alt="Logo" />
          <h3 class="text-center gradient-text lg:h-16 xl:h-8">{{ partner_type.name }}</h3>
          <p class="custom caption p-4 mb-2 mt-4 max-w-100 text-center lg:h-32 xl:h-24">{{ partner_type.description }}</p>
          <div class="flex flex-row space-x-2 mb-2 mt-5">
            <a href="https://mobile.twitter.com/olympus_token" target="_blank">
                <div class="social h-10 w-10 rounded-full text-center pt-1.5"><i class="fab fa-twitter"></i></div>
            </a>
            <a href="https://www.instagram.com/olympusbsc/?hl=en" target="_blank">
                <div class="social h-10 w-10 rounded-full text-center pt-1.5"><i class="fab fa-instagram"></i></div>
            </a>
            <a href="https://t.me/OlympusOfficial" target="_blank">
                <div class="social h-10 w-10 rounded-full text-center pt-1.5"><i class="fab fa-telegram"></i></div>
            </a>
            <a href="mailto:contact@olympustoken.io" target="_blank">
                <div class="social h-10 w-10 rounded-full text-center pt-1.5"><i class="fa fa-envelope"></i></div>
            </a>
            </div>
            <div class="py-1 transition-colors duration-200 px-6 text-base bg-gray-600 hover:bg-gray-500 font-semibold mt-4 rounded-full">VIEW LAUNCHES</div>
          
  </div>
</template>
<script>

import TimeLine from "@/components/TimeLine.vue";

export default {
  name: 'PartnerCard',
  components: {
    TimeLine,
  },
  props: {
    partner_type: Object,
  },
  mounted() {
    console.log(this.partner_type);
  }
}
</script>