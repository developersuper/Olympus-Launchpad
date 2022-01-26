<template>
  <section class="container" style="margin-bottom:20px">
    <div class="heading wow fadeInDown" data-wow-duration="0.3s" data-wow-delay="0s">
      <h2 class="pb-2">
        Explore Launches
      </h2>
       <Logo class="max-w-75 mx-auto self-center" />
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
// import ItemComp from "@/components/Itemc.vue"
import Logo from "@/components/Logo.vue";

export default {
  name: "Head",
  components: {
    Logo,
  },
};
</script>

<style scoped></style>
