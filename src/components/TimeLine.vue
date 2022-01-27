<template>
<div class="w-full">
    <div class="time text-sm text-gray-100 font-semibold uppercase mb-2">
        TIME{{ model.status }} 
    </div>
    <div class="h-4 mt-1 bg-gray-700 rounded-md max-w-96 mx-auto">
      <div class="w-full rounded-md bg-gray-100 to-launchpad_primary-dark h-full from-launchpad_primary" v-bind:style="`width:${model.progress}%`"></div>
    </div>
    <div class="time text-sm text-gray-100 font-semibold uppercase mt-3">
        {{model.day}}D - {{ model.hours }}H - {{ model.minutes }}M - {{ model.seconds }}S
    </div>
</div>
</template>

<script>

export default {
  name: "TimeLine",
  props: {
    starttime: String,
    endtime: String,
  },
  created() {
    let start =this.starttime;
    let end = this.endtime;
    let now = new Date().getTime();
    let dist = end - start;
    if ((now - end) >= 0) {
      this.progress = 100;
      this.status = " - Ended";
    } else {
      this.day = Math.floor((end - now) / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(((end - now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor(((end - now) % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor(((end - now) % (1000 * 60)) / 1000);
      this.progress = Math.floor((now - start)*100 / dist);
    }
    this.model = {
      day: this.day,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
      progress: this.progress,
      status: this.status
    }
  },
};
</script>

