<template>
<div class="w-full">
    <div class="time text-sm text-gray-100 font-semibold uppercase mb-2">
      TIME 
    </div>
    <div class="h-4 mt-1 bg-gray-700 rounded-md max-w-96 mx-auto overflow-hidden">
      <div class="w-full rounded-md bg-gray-100 to-launchpad_primary-dark h-full from-launchpad_primary" v-bind:style="`width:${progress}%`"></div>
    </div>
    <div v-if="status === 'TIME'" class="time text-sm text-gray-100 font-semibold uppercase mt-3">
        {{days}}D - {{ hours }}H - {{ minutes }}M - {{ seconds }}S
    </div>
    <div v-else class="time text-sm text-gray-100 font-semibold uppercase mt-3">
      {{ status }}
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "TimeLine",
  props: {
    startTime: Date,
    endTime: Date,
    launch: Object,
  },
  computed: {
    ...mapState(['nowTime']),
    status() {
      if(this.nowTime > this.endTime || this.launch.isFinalized === true) return 'ENDED';
      if(this.nowTime > this.startTime && this.nowTime < this.endTime && this.launch.isFinalized === false) return 'TIME';
      return 'NOT STARTED';
    },
    leftTime() {
      return Math.floor((this.endTime - this.nowTime) / 1000);
    },
    days() {
      return Math.floor(this.leftTime / (24 * 3600));
    },
    hours() {
      return Math.floor((this.leftTime % (24 * 3600)) / 3600);
    },
    minutes() {
      return Math.floor((this.leftTime % (3600)) / 60);
    },
    seconds() {
      return Math.floor(this.leftTime % (60));
    },
    progress() {
      return ((1.0 * (this.nowTime - this.startTime) / (this.endTime - this.startTime)) * 100).toFixed(2);
    },
  }
};
</script>

