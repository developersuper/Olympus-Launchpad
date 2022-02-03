<template>
<SwitchGroup as="div" class="flex items-center justify-between">
  <span class="flex-grow flex flex-col">
    <SwitchLabel as="span" class="block text-sm font-semibold text-gray-100" passive>Enable Whitelisted</SwitchLabel>
  </span>
  <Switch
    v-model="whitelistEnabled"
    v-if="!isApproved"
    :class="[
      whitelistEnabled ? 'bg-launchpad_primary' : 'bg-gray-500',
      'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-1 focus:ring-launchpad_primary',
    ]"
  >
    <span aria-hidden="true" :class="[whitelistEnabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
  </Switch>
</SwitchGroup>
<div v-if="whitelistEnabled && !isApproved" class="py-4 bg-gray-900 rounded-lg text-center transform ring-0 transition ease-in-out duration-600">
  <div class="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
    <div class="bg-gray-800 shadow-lg border-b border-gray-700">
      <div class="flex-row flex justify-between h-12 pr-9 pl-6 items-center">
        <div>Address</div>
        <div>Action</div>
      </div>
    </div>
    <div class="max-h-80 overflow-scroll px-1 py-3 lg:py-3 lg:px-3">
      <div class="flex justify-between p-2 rounded-md hover:bg-opacity-50 hover:bg-gray-700" v-for="whitelistedAddr in whitelisted" :key="whitelistedAddr">
        <span class="hidden sm:block">{{ whitelistedAddr }}</span>
        <span class="sm:hidden">{{ whitelistedAddr.slice(0, 6) + '***************' + whitelistedAddr.slice(whitelistedAddr.length - 4, whitelistedAddr.length) }}</span>
        <span class="cursor-pointer" @click="removeWhitelisted(whitelistedAddr)" v-if="!isApproved"><i class="fa fa-trash"></i></span>
      </div>
    </div>
  </div>
  <div class="w-full flex justify-end mt-4">
    <button @click="showModal()" :disabled="isApproved" class="py-2 px-5 border-2 border-launchpad_primary text-launchpad_primary bg-launchpad_primary bg-opacity-0 hover:bg-opacity-20 rounded-lg font-semibold transition-all duration-200"><i class="fa fa-plus text-launchpad_primary"></i> Add</button>
    <button @click="clearWhitelisted()" :disabled="isApproved" class="py-2 ml-4 px-5 border-2 border-launchpad_primary text-launchpad_primary bg-launchpad_primary bg-opacity-0 hover:bg-opacity-20 rounded-lg font-semibold transition-all duration-200"><i class="fa fa-refresh text-launchpad_primary"></i> Clear</button>
  </div>
</div>
<Popup 
  v-if="showPopup"
  @close="showPopup = false" 
  @tokenAddress="setTokenAddress($event)"
/>
</template>
<script>
import { 
  SwitchGroup, 
  SwitchLabel,
  Switch
} from '@headlessui/vue';
import Popup from "./Popup.vue";

export default {
  props: {
    isApproved: Boolean,
  },
  components: {
    SwitchGroup,
    SwitchLabel,
    Switch,
    Popup,
  },
  data() {
    return {
      whitelistEnabled: false,
      whitelisted: [],
      showPopup: false,
    }
  },
  methods: {
    showModal() {
      console.log('here');
      this.openPopup();
    },
    closeModal() {
      this.showPopup = false;
    },
    openPopup() {
      this.showPopup = true;
    },
    removeWhitelisted(e) {
      const index = this.whitelisted.indexOf(e);
      if (index > -1) this.whitelisted.splice(index, 1);
      this.$emit('whitelisted', this.whitelisted);
    },
    clearWhitelisted() {
      this.whitelisted = [];
      this.$emit('whitelisted', this.whitelisted);
    },
    setTokenAddress(e) {
      this.whitelisted = [...e];
      this.$emit('whitelisted', this.whitelisted);
    },
  }
}
</script>