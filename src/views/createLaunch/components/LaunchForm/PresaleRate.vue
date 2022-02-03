<template>
  <div class="p-4 bg-gray-700 rounded-lg text-center">
    <div class="font-semibold">PRESALE RATE</div>
    <div 
      v-if="!isEditRate || disabled" 
      class="text-xl font-bold gradient-text mt-1" 
      @click="setEditRate()">
      1 BNB = {{ presaleRate }}  {{ tokenName }}
    </div>
    <div v-else class="flex flex-col sm:flex-row sm:justify-between w-full sm:w-4/5 m-auto">
      <div class="mt-1 w-full mb-4 sm:mb-0 sm:w-3/4 flex items-center relative">
        <input
          :value="presaleRate"
          @change="setPresaleRate"
          id="presaleRate"
          style="height: 42px;"
          type="number"
          class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-200 sm:text-sm"
        />
        <div class="absolute font-semibold text-gray-100 right-3">{{ tokenName }}</div>
      </div>
      <button 
        @click="saveEditRate()" 
        class="
        py-1 px-4 border-2 border-launchpad_primary 
        text-launchpad_primary bg-launchpad_primary 
        bg-opacity-0 hover:bg-opacity-20 rounded-2xl 
        font-semibold transition-all duration-200"
      >
        <i class="fa fa-save text-launchpad_primary">
        </i> Save
      </button>
    </div>
    <div v-if="error !== ''" class="text-center text-error-red error-msg">{{ error }}</div>
  </div>
</template>
<script>
// import { ref } from 'vue';

export default {
  props: {
    presaleRate: Number,
    tokenName: String,
    disabled: Boolean,
    error: String,
  },
  data() {
    return {
      isEditRate: false,
    }
  },
  methods: {
    setPresaleRate(e) {
      this.$emit('presaleRate', e.target.value);
    },
    setEditRate() {
      console.log(this.isEditRate);
      this.isEditRate = true;
    },
    saveEditRate() {
      this.isEditRate = false;
    },
  }
}
</script>