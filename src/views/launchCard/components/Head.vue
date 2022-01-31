<template>
  <section class="container" style="margin-bottom:20px">
    <div class="heading wow fadeInDown " data-wow-duration="0.3s" data-wow-delay="0s">
      <div class="flex flex-col items-center">  
        <div class="flex flex-row items-center space-x-4">
          <h2 class="pb-2">
            LAUNCH: 
          </h2><img class="w-10 h-10" src="@/assets/icons/olympus.svg" /><h2 class="pb-2">{{ model.tokenName }}</h2>
        </div>
      </div>
       <Logo class="max-w-75 mx-auto" />
    </div>
    <!-- <router-link to="/explore" class="flex items-center mx-auto place-content-center rounded-t-2xl mb-8 -mt-8">
      <div class="flex flex-row opacity-100 hover:opacity-70 transition-opacity duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        <span class="ml-2 overline text-gray-200">Go Back to Explore</span>
      </div>
    </router-link> -->
  </section>
  
</template>

<script>
// @ is an alias to /src
// import ItemComp from "@/components/Itemc.vue"
import Logo from "@/components/Logo.vue";
import { mapGetters, mapState } from 'vuex';

export default {
  name: "Head",
  components: {
    Logo,
  },
  computed: {
    ...mapState(['partner_types']),
    ...mapState('launchpad', ['launches']),
  },
  created() {
    if (this.launches) {
      let launches_data = this.launches.filter((launch) => launch.tokenAddr == this.$route.params.id)[0];
      this.model = {
        ...launches_data,
      }
    } else {
      return null;
    }
  }
};
</script>

<style scoped></style>
