<template>
  <!-- BNB limit -->
  <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
    <label class="w-full block text-sm font-semibold text-gray-100">
      BNB limit per user
    </label>
    <div class="w-full mt-1 flex items-center relative">
      <input
        :value="bnbLimit"
        @change="setBnbLimit"
        :disabled="disabled"
        min="0"
        style="height: 42px;"
        type="number"
        class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-14 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-200 sm:text-sm"
      />
      <div class="absolute font-semibold text-gray-100 right-3">BNB</div>
    </div>
  </div>
  <!-- BNB Max -->
  <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
    <label class="w-full block text-sm font-semibold text-gray-100">
      BNB max per user
    </label>
    <div class="w-full mt-1 flex items-center relative">
      <input
        :value="bnbMax"
        @change="setBnbMax"
        :disabled="disabled"
        min="0"
        style="height: 42px;"
        type="number"
        class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-14 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-200 sm:text-sm"
      />
      <div class="absolute font-semibold text-gray-100 right-3">BNB</div>
    </div>
  </div>
  <div v-if="error !== ''" class="text-center text-error-red error-msg">{{ error }}</div>
</template>
<script>
// import { ref } from 'vue';

export default {
  props: {
    bnbLimit: Number,
    bnbMax: Number,
    disabled: Boolean,
    error: String,
  },
  methods: {
    setBnbLimit(e) {
      this.$emit('bnbLimit', e.target.value);
    },
    setBnbMax(e) {
      this.$emit('bnbMax', e.target.value);
    }
  }
}
</script>