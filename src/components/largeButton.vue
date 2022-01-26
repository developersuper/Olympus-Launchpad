<template>
  <router-link class="w-full hover:-translate-y-1 duration-500 ease-in-out transform rounded-2xl overflow-hidden shadow-launchpad_primary" :to="{ path: '/' + routername }">
    <div class="bg-gray-900 text-center flex place-content-center border-2 border-launchpad_primary rounded-2xl w-full p-4 lg:p-8">
      <div class="flex flex-row w-full justify-between lg:flex-col items-center">
        <p class="text-white font-bold lg:text-xl">{{ name }}</p>
        <span class="text-xs py-0.5 lg:text-sm sm:text-xs sm:py-1 lg:py-0.5 lg:mt-4 text-white font-bold px-3 lg:px-4 bg-orange bg-opacity-20 rounded-full">
          {{ btnname }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script>
// @ is an alias to /src
// import ItemComp from "@/components/Itemc.vue";
export default {
  name: "largeButton",
  props: {
    name: String,
    btnname: String,
    routername: String,
  },
};
</script>

<style>
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 #1973bc;
  }
}
</style>
