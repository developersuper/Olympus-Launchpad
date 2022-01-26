<template>
  <section class="container wow fadeInDown" data-wow-duration="0.6s" data-wow-delay="0.3s" style="margin-bottom:20px">
    <div class="heading">
      <h2 class="pb-2">
        My Launches
      </h2>
    </div>
    <Logo class="max-w-75 mx-auto" />
  </section>
</template>

<script>
import Logo from "@/components/Logo.vue";
export default {
  name: "Head",
  components: {
    Logo,
  },
};
</script>
