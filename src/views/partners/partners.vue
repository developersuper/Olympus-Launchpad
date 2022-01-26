<template>
  <div class="container mx-auto px-4 my-6 lg:my-8">
    <div v-if="launchMode === 0" class="heading wow fadeInDown mt-5" data-wow-duration="0.6s" data-wow-delay="0.3s">
      <h2 class="pb-2">
        Call Channel Launch Partners
      </h2>
      <Logo class="max-w-75 mx-auto" />
      <p>View out trust partners recommended launches:</p>
    </div>
    <launch-form v-if="launchMode != 0" />

    <section class="container wow fadeInDown relative mt-10" data-wow-duration="0.3s" data-wow-delay="0.8s">
      <div class="relative w-full flex space-x-0 lg:space-y-0 space-y-4 lg:space-x-4 flex-col lg:flex-row mb-10">
        <div v-for="partner_type in partner_types" :key="partner_type.id" @click="$router.push(`/partners/${partner_type.id}`)" class="lg:w-1/4 bg-gray-900 cursor-pointer hover:bg-gray-800 transition-colors duration-200 p-6 shadow-smooth border-gray-600 border rounded-2xl flex flex-col items-center">
          <img class="mb-4 bg-opacity-20 w-32 h-32 rounded-full" :src="partner_type.icon" alt="Logo" />
          <h3 class="text-center gradient-text lg:h-16 xl:h-8">{{ partner_type.name }}</h3>
          <p class="custom caption p-4 mt-4 max-w-100 text-center lg:h-32 xl:h-24">{{ partner_type.description }}</p>
          <div class="flex flex-row space-x-4 mb-5 mt-5">
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
      </div>
    </section>

    <div class="container flex lg:flex-row flex-col wow fadeInDown lg:space-y-0 space-y-4 lg:space-x-4" data-wow-duration="0.6s" data-wow-delay="0.9s">
      <largeButton name="EXPLORE LAUNCHES" btnname="EXPLORE" routername="explore" />
      <largeButton name="MY LAUNCHES" btnname="MY LAUNCH" routername="mylaunches" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import largeButton from "@/components/largeButton.vue";
import Logo from "@/components/Logo.vue";
import { mapGetters, mapState } from 'vuex';

export default {
  name: "partners",
  data: function() {
    return {
      launchMode: 0,
    };
  },
  components: {
    largeButton,
    Logo,
  },
  computed: {
    ...mapState(['partner_types']),
  },
};
</script>
<style>
h3, p, span {
  font-family: "Open Sans", sans-serif;
}
.custom {
  font-size: 1.2rem !important;
  line-height: 1.5rem !important;
}
.social {
  border: 1px solid #b1b5b7;
}
.social:hover {
  border: none;
  background-color: #bfbfbf;
}
</style>
