<template>
  <div 
    @click="$router.push(`/partners/${partner_type.id}`)" 
    class="relative w-full min-h-fit bg-gray-900 px-6 py-8 shadow-smooth border-gray-600 border rounded-2xl flex flex-col items-center justify-between"
    style="min-width: 200px"
  >
    <div class="mb-4 flex flex-col items-center">
      <img
        class="mb-4 bg-opacity-20 w-32 h-32 rounded-full" 
        :src="partner_type.icon" alt="Logo" 
      />
      <h3 class="text-center gradient-text h-16 sm:h-10">{{ partner_type.name }}</h3>
      <p 
        class="custom caption p-4 mb-2 mt-2 max-w-100 text-center lg:h-32 xl:h-24"
        style="min-height: 140px"
      >{{ partner_type.description }}</p>
    </div>
    <div class="flex flex-col items-center mb-6">
      <div class="flex flex-row space-x-2 mb-2 mt-5">
        <a href="https://mobile.twitter.com/olympus_token" target="_blank">
            <div class="social h-10 w-10 rounded-full text-center pt-1.5"><i class="fab fa-twitter"></i></div>
        </a>
        <!-- <a href="https://www.instagram.com/olympusbsc/?hl=en" target="_blank">
            <div class="social h-10 w-10 rounded-full text-center pt-1.5"><i class="fab fa-instagram"></i></div>
        </a> -->
        <a href="https://t.me/OlympusOfficial" target="_blank">
            <div class="social h-10 w-10 rounded-full text-center pt-1.5"><i class="fab fa-telegram"></i></div>
        </a>
        <!-- <a href="mailto:contact@olympustoken.io" target="_blank">
            <div class="social h-10 w-10 rounded-full text-center pt-1.5"><i class="fa fa-envelope"></i></div>
        </a> -->
        </div>
      <div class="py-1 transition-colors duration-200 px-6 text-base bg-gray-600 hover:bg-gray-500 font-semibold mt-4 rounded-full">VIEW LAUNCHES</div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'PartnerCard',
  components: {
  },
  props: {
    partner_type: Object,
  },
  mounted() {
    console.log(this.partner_type);
  }
}
</script>