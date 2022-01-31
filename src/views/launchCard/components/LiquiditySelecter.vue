<template>
  <p class="text-gray-200 font-semibold text-sm mb-4">ADD YOUR BNB TO LAUNCH</p>
  <div class="flex bg-gray-900 justify-between pr-6 pl-6">
    <span class="overline text-gray-200 cursor-pointer hover:text-launchpad_primary transition-colors duration-200" @click="setPercentageRaised(1)">1%</span>
    <span class="overline text-gray-200 cursor-pointer hover:text-launchpad_primary transition-colors duration-200" @click="setPercentageRaised(25)">25%</span>
    <span class="overline text-gray-200 cursor-pointer hover:text-launchpad_primary transition-colors duration-200" @click="setPercentageRaised(50)">50%</span>
    <span class="overline text-gray-200 cursor-pointer hover:text-launchpad_primary transition-colors duration-200" @click="setPercentageRaised(75)">75%</span>
    <span class="overline text-gray-200 cursor-pointer hover:text-launchpad_primary transition-colors duration-200" @click="setPercentageRaised(100)">100%</span>
  </div>
  <div class="lg:flex-row flex-col w-full items-center flex lg:space-y-0 space-y-4 lg:space-x-4">
      <div class="relative w-full">
        <vue3-slider 
          class="slider z-50 mt--1" 
          ref="portfolioSlider" 
          v-model="percentageRaised" 
          :data="sliderRange" 
          :height="9" 
          trackColor="#507194" 
          color="#EFBD28" 
          :min="0" 
          :max="100" 
          :step="5" 
          :orientation="orientation" 
          @change="setPercentageRaised"
        />
        <div class="bg-gray-600 border border-gray-300 rounded-2xl cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-200">
          <div class="rounded-2xl w-full text-gray-200 text-right pt-3 pr-2 text-xs">BALANCE: {{ balance }} </div>
          <input
            v-model="addAmount"
            placeholder="Amount to add"
            style="height: 42px;"
            type="number"
            :max="max"
            :min="min"
            class="relative w-full bg-gray-600 border border-gray-600 rounded-2xl shadow-sm pl-3 pr-14 py-2 text-left cursor-default sm:text-sm"
            @change="updateAddAmount"
          />
        </div>
        <div class="absolute font-semibold text-gray-100 right-3 top-9">BNB</div>
      </div>
  </div>
</template>
<script>
import slider from "vue3-slider";

export default {
  components: {
    "vue3-slider": slider,
  },
  props: {
    balance: Object,
    min: Number,
    max: Number,
  },
  data() {
    return {
      addAmount: 0,
      percentageRaised: 0,
    }
  },
  methods: {
    setPercentageRaised(e) {
      this.percentageRaised = e;
      this.addAmount = this.balance * this.percentageRaised / 100;
      console.log(e, this.percentageRaised, this.addAmount);
      this.$emit('update', this.addAmount);
    },
    updateAddAmount(e) {
      if(isNaN(e.target.value)) return;
      this.addAmount = e.target.value;
      this.percentageRaised = e.target.value / this.balance * 100;
      this.$emit('update', this.addAmount);
    },
  },
  computed: {
  },
}
</script>