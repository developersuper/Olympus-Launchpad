<template>
    <div v-if="state === 1" class="time text-launchpad_primary font-semibold uppercase mb-1 md:text-base lg:text-xs lg:text-gray-100 lg:font-normal">
        {{ days }}D-{{ hours }}H-{{ minutes }}M-{{ seconds }}S
    </div>
    <div v-if="state === 2" class="time text-launchpad_primary font-semibold uppercase mb-1 md:text-base lg:text-xs  lg:text-gray-100 lg:font-normal">
        ENDED
    </div>
    <div v-if="state === 0" class="time text-launchpad_primary font-semibold uppercase mb-1 md:text-base lg:text-xs  lg:text-gray-100 lg:font-normal">
        NOT STARTED
    </div>
    <div class="hidden lg:block h-3 bg-gray-700 rounded-full w-full overflow-hidden">
      <div class="w-full rounded-md bg-gray-100 to-launchpad_primary-dark h-full from-launchpad_primary" v-bind:style="`width:${progress}%`"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "TimeLine1",
  props: {
    startTime: Date,
    endTime: Date,
    launch: Object,
  },
  date() {
    return {
    }
  },
  methods: {
  },
  mounted() {
    // console.log(this.startTime, this.endTime, this.nowTime, this.launch.isFinalized, this.state);
  },
  computed: {
    ...mapState(['nowTime']),
    state() {
      if(this.nowTime > this.endTime || this.launch.isFinalized === true) return 2;
      if(this.nowTime > this.startTime && this.nowTime < this.endTime && this.launch.isFinalized === false) return 1;
      return 0;
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
      return ((1.0 * this.launch.soldTokens / this.launch.totalTokens) * 100).toFixed(2);
    },
  }
};
</script>

