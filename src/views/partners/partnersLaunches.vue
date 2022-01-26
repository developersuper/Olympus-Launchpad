<template>
  <div class="container mx-auto px-4 my-6 lg:my-8">
    <Head/>
    <Rows/>
    <div class="container flex lg:flex-row flex-col wow fadeInDown lg:space-y-0 space-y-4 lg:space-x-4" data-wow-duration="0.6s" data-wow-delay="0.9s">
      <largeButton name="EXPLORE LAUNCHES" btnname="EXPLORE" routername="explore" />
      <largeButton name="CREATE LAUNCH" btnname="CREATE" routername="create" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Rows from "./components/Rows.vue";
import Head from "./components/Head.vue";
import largeButton from "@/components/largeButton.vue";
export default {
  name: "myLaunches",
  components: {
    Rows,
    Head,
    largeButton,
  },
};
</script>

<style>

</style>
