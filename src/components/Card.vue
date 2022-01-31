<template>
  <div class="relative w-full bg-gray-900 p-6 shadow-smooth border-gray-600 border rounded-2xl flex flex-col items-center">
    <img v-if="launch?.partnerType == 1" class="absolute z-20 w-10 h-10 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/defiapetalk.png" alt="Logo" />
    <img v-if="launch?.partnerType == 2" class="absolute z-20 w-10 h-10 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/madlab.png" alt="Logo" />
    <img v-if="launch?.partnerType == 3" class="absolute z-20 w-10 h-10 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/gollum.png" alt="Logo" />
    <img v-if="launch?.partnerType == 4" class="absolute z-20 w-10 h-10 right-6 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/smalcalls.png" alt="Logo" />
    <h4 class="mb-4">{{ launch.tokenName }}</h4>
    <div class="relative">
      <img class="center-card z-10 w-32 h-32 border-launchpad_primary border-2 rounded-full" src="@/assets/icons/olympus.svg" alt="Logo" />
      <vc-donut 
        :size="160" 
        background="#081A2E" 
        foreground="#2F455C" 
        :thickness="8" 
        :sections="[{ value: launch.soldTokens * 100 / launch.totalTokens, color: '#EFBD28' }]" 
      />
    </div>
    <div class="countdown mt-4 text-center pr-4 pl-4 lg:w-full">
      <TimeLine :starttime="launch.startTime" :endTte="launch.endTime" />
    </div>
    <button 
      @click="$router.push(`/launchcard/${launch.tokenAddr}`)" 
      class="py-2 px-4 bg-gray-600 hover:bg-gray-500 font-semibold mt-4 rounded-full"
    >View</button>
  </div>
</template>
<script>

import TimeLine from "@/components/TimeLine.vue";

export default {
  name: 'Card',
  components: {
    TimeLine,
  },
  props: {
    launch: Object,
  },
  mounted() {
    console.log(this.launch);
  }
}
</script>

<style scoped>
.center-card {
  position: absolute;
  top: 10%;
  right: 10%;
}
</style>
