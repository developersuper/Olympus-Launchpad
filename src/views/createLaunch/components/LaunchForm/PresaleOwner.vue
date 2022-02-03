<template>
<div class="flex flex-col mt-1 lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
  <label class="w-full lg:w-2/5 block text-sm font-semibold text-gray-100">
    Presale owner
  </label>
  <div class="w-full lg:w-3/5 mt-1 relative w-full">
    <div class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-2 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm">
      <input 
        v-on:focus="$event.target.select()" 
        ref="myinput" 
        readonly
        class="overflow-hidden mr-2 text-sm inline-block ml-2"   
        :value="address"/>  
      <span class="absolute left-2 py-1 sm:py-0 bg-gray-600 mr-2 text-sm inline-block ml-2">{{ address.slice(0, 7) + '********' + address.slice(address.length - 7, address.length) }}</span>
      <div class="absolute right-2 top-2 h-6 w-11">
        <i @click="copy" class="fa fa-paste text-base text-gray-200 hover:text-gray-100"></i>
        <a :href="'https://testnet.bscscan.com/address/' + address" target="_blank"><i class="fa fa-external-link text-base ml-2 text-gray-200 hover:text-gray-100"></i></a>
      </div>
    </div>
    <p class="text-xs mt-2">This account will be the only account with  the ability of creating and editing presale contract parameters.</p>
  </div>
</div>
</template>
<script>
// import { ref } from 'vue';

export default {
  props: {
    address: String,
  },
  methods: {
    copy() {
      this.$refs.myinput.focus();
      document.execCommand('copy');
    },
  }
}
</script>