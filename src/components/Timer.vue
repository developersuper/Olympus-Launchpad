<template>
  <div>
    <div v-show="statusType !== 'expired'" class="timerouter">
      <div class="day timeinner">
        <span class="number">{{ days }}</span>
        <div class="format">{{ wordString.day }}</div>
      </div>
      <div class="hour timeinner">
        <span class="number">&nbsp;{{ hours }}</span>
        <div class="format">{{ wordString.hours }}</div>
      </div>
      <div class="min timeinner">
        <span class="number">&nbsp;{{ minutes }}</span>
        <div class="format">{{ wordString.minutes }}</div>
      </div>
    </div>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import ItemComp from "@/components/Itemc.vue";
export default {
  name: "Timer",
  props: {
    starttime: String,
    endtime: String,
    trans: String,
  },

  data: function() {
    return {
      timer: "",
      wordString: {},
      start: "",
      end: "",
      interval: "",
      days: "",
      minutes: "",
      hours: "",
      seconds: "",
      message: "",
    };
  },
  created: function() {
    this.wordString = JSON.parse(this.trans);
  },
  mounted() {
    this.start = this.starttime;
    this.end = this.endtime;
    // Update the count down every 1 second
    this.timerCount(this.start, this.end);
    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end);
    }, 1000);
  },
  methods: {
    timerCount: function(start, end) {
      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = start - now;
      var passTime = end - now;

      if (distance < 0 && passTime < 0) {
        this.message = this.wordString.expired;
        this.statusType = "expired";
        clearInterval(this.interval);
        return;
      } else if (distance < 0 && passTime > 0) {
        this.calcTime(passTime);
        this.statusType = "running";
      } else if (distance > 0 && passTime > 0) {
        this.calcTime(distance);
        this.statusType = "upcoming";
      }
    },
    calcTime: function(dist) {
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
    },
  },
};
</script>

<style scoped>
.timerouter {
  display: flex;
}
.timeinner {
  display: flex;
}
</style>
