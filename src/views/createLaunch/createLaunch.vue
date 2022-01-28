<template>
  <div class="container mx-auto px-4 my-6 lg:my-8">
    <div v-if="launchMode === 0" class="heading wow fadeInDown mt-5" data-wow-duration="0.6s" data-wow-delay="0.3s">
      <h2 class="pb-2">
        Create Launch
      </h2>
      <Logo class="max-w-75 mx-auto" />
      <p>SELECT LAUNCH TYPE:</p>
    </div>
    <launch-form v-if="launchMode != 0" />

    <section v-if="launchMode === 0" class="container wow fadeInDown relative mt-10" data-wow-duration="0.3s" data-wow-delay="0.8s">
      <div class="relative w-full flex space-x-0 lg:space-y-0 space-y-4 lg:space-x-4 flex-col lg:flex-row mb-10">
        <div v-for="launche in launche_types" :key="launche.id" :class="[launche.id == 1 ? 'hover:bg-gray-800' : '' ,'relative lg:w-1/3 bg-gray-900 cursor-pointer transition-colors duration-200 p-6 shadow-smooth border-gray-600 border rounded-2xl flex flex-col items-center']">
          <div v-if="launche.id !== 1" class="absolute w-full h-full bg-gray-900 rounded-2xl top-0 opacity-80 cursor-not-allowed"></div>
          <img v-if="launche.id == 1" class="mb-4 p-4 bg-opacity-20 bg-gray1000 w-32 h-32 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/prelaunch.png" alt="Logo" />
          <img v-if="launche.id == 2" class="mb-4 p-4 bg-opacity-20 bg-gray1000 w-32 h-32 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/lottery.png" alt="Logo" />
          <img v-if="launche.id == 3" class="mb-4 p-4 bg-opacity-20 bg-gray1000 w-32 h-32 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/fairlaunch.png" alt="Logo" />
          <h3 class="gradient-text">{{ launche.name }}</h3>
          <p class="custom caption p-4 mt-4 max-w-100 text-center">{{ launche.description }}</p>
          <div @click="$router.push(`/create/${launche.id}`)" class="py-1 transition-colors duration-200 px-6 text-base bg-gray-600 hover:bg-gray-500 font-semibold mt-4 rounded-xl">CREATE</div>
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
import launchForm from "@/views/createLaunch/components/launchForm";
import { mapGetters, mapState } from 'vuex';

export default {
  name: "createLaunch",
  data: function() {
    return {
      launchMode: 0,
    };
  },
  components: {
    launchForm,
    largeButton,
    Logo,
  },
  computed: {
    ...mapState(['launche_types']),
  },
  created() {
  }
};
</script>
<style>
* {
  font-family: "Open Sans", sans-serif;
}
.custom {
  font-size: 1.2rem !important;
  line-height: 1.5rem !important;
}
.bg-gray1000 {
  background-color: #3a546b;
}
</style>
