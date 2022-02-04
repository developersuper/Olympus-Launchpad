<template>
  <div class="container mx-auto px-4 my-6 lg:my-8">
    <div v-if="launchMode === 0" class="heading wow fadeInDown mt-5" data-wow-duration="0.6s" data-wow-delay="0.3s">
      <h2 class="pb-2">
        Call Channel Launch Partners
      </h2>
      <Logo class="max-w-75 mx-auto" />
      <p class="uppercase">View our partners’ endorsed pre-sales below:</p>
    </div>
    <launch-form v-if="launchMode != 0" />

    <section class="container wow fadeInDown relative mt-10" data-wow-duration="0.3s" data-wow-delay="0.8s">
      <div class="relative w-full flex space-x-0 lg:space-y-0 space-y-4 lg:space-x-4 flex-col lg:flex-row mb-10">  
        <Partnerslide/>
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
import Partnerslide from "./components/partnerslide.vue";
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
    Partnerslide,
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
