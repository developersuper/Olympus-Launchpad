<template>
  <section class="container wow fadeInDown" data-wow-duration="0.6s" data-wow-delay="0.3s" style="margin-bottom:20px">
    <div class="heading">
      <h2 class="pb-2">
        Partner Endorsed Launches: {{ model.name }}
      </h2>
    </div>
    <div class="max-w-75 mx-auto">
        <img v-if="this.$route.params.id == 1" class="w-full h-full object-contain p-8 rounded-full" src="@/assets/icons/midas.jpg" />
        <img v-if="this.$route.params.id == 2" class="w-full h-full object-contain p-8 rounded-full" src="@/assets/icons/gollum.jpg" />
        <img v-if="this.$route.params.id == 3" class="w-full h-full object-contain p-8 rounded-full" src="@/assets/icons/defi.jpg" />
        <img v-if="this.$route.params.id == 4" class="w-full h-full object-contain p-8 rounded-full" src="@/assets/icons/apefam.jpg" />
        <img v-if="this.$route.params.id == 5" class="w-full h-full object-contain p-8 rounded-full" src="@/assets/icons/early.jpg" />
    </div>
  </section>
</template>

<script>
import Logo from "@/components/Logo.vue";
import { mapGetters, mapState } from 'vuex';

export default {
  name: "Head",
  components: {
    Logo,
  },
  computed: {
    ...mapState(['partner_types']),
  },
  created() {
    let partner_types_data = this.partner_types.filter((partner_type) => partner_type.id == this.$route.params.id)[0];
    
    this.model = {
      ...partner_types_data,
    }

  }
};
</script>
