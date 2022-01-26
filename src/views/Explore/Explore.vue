<template>
  <div class="container mx-auto px-4 my-6 lg:my-8">
    <Head />
    <Rows />
    <div class="container flex lg:flex-row flex-col wow fadeInDown lg:space-y-0 space-y-4 lg:space-x-4" data-wow-duration="0.6s" data-wow-delay="0.9s">
      <largeButton name="EXPLORE LAUNCHES" btnname="EXPLORE" routername="explore" />
      <largeButton name="MY LAUNCHES" btnname="MY LAUNCH" routername="mylaunches" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Rows from "./components/Rows.vue";
import Head from "./components/Head.vue";
import largeButton from "@/components/largeButton.vue";
export default {
  name: "Explore",
  components: {
    Rows,
    Head,
    largeButton,
  },
};
</script>

<style>
/* .largeButtonrow{
  display: flex;
  justify-content: space-between;
}
.largeButtonrow .locker:nth-child(2){
  border: 4px solid #3781f5;
  box-shadow:0px 0px 15px 10px rgba(55, 129, 245, 0.2);
}
.largeButtonrow .locker:nth-child(2) button{
 background-color: #3781f5 !important;
}
.largeButtonrow .locker:nth-child(3){
  border: 4px solid #39bbf5;
  box-shadow:0px 0px 15px 10px rgba(57, 187, 245, 0.2);
}
.largeButtonrow .locker:nth-child(3) button{
 background-color: #39bbf5;
} */
</style>
