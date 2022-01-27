<template>
  <section class="wow fadeInDown mb-10" data-wow-duration="0.6s" data-wow-delay="0.7s" style="margin-top:0px">
    <Head />
    <div class="bg-gray-900 rounded-2xl overflow-hidden max-w-2xl mx-auto border border-gray-700">
      <div class="bg-gray-800 border-b border-gray-700">
        <h3 class="gradient-text w-full py-6 text-center">CREATE {{model.name}}</h3>
      </div>
      <div class="sm:px-8 px-4 py-8 flex flex-col items-center" v-if="!isWalletConnected">
        <Button name="Connect Wallet" class="connectBtn w-full max-w-64" @click="$store.dispatch('wallet/connectWallet')" />
      </div>
      <div class="sm:px-8 px-4 pb-8" v-else>
        <!-- Logo upload -->
        <!-- Token address -->
        <div>
          <input
            class="bg-launchpad_primary overline bg-opacity-10 hover:shadow-launchpad_primary focus:shadow-launchpad_primary relative mt-8 border-launchpad_primary transition-all duration-200 placeholder-launchpad_primary text-launchpad_primary rounded-full border p-3 w-full text-center"
            placeholder="Enter token address"
            v-model="tokenAddress"
          />
          <div v-if="isValidAddress !== 'correct'" class="text-center text-error-red">{{ isValidAddress }}</div>
        </div>
        <div class="mt-4" v-if="isValidAddress === 'correct'">
          <p class="text-sm mt-2 mb-4 font-semibold text-center ">TOKEN ICON (500px - 500px)</p>
          <div class="max-w-24 m-auto flex justify-center px-6 pt-5 pb-6 border-2 border-gray-500 border-dashed rounded-xl">
            <div class="space-y-2 text-center">
              <div class="flex text-sm text-gray-400 rounded-full">
                <label for="file-upload" class="rounded-full relative cursor-pointer bg-gray-700 px-3 py-1 rounded-md font-medium text-indigo-600 hover:text-white focus-within:outline-none focus-within:ring-1 focus-within:ring-launchpad_primary">
                  <span><i class="fa fa-plus text-base text-gray-200 hover:text-gray-100"></i></span>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div v-if="isValidAddress === 'correct'" class="caption my-8 space-y-6 rounded-lg p-4">
          <!-- Token select -->
          <Listbox as="div" v-model="selected" class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div class="w-full lg:w-3/5 mt-1 block text-sm font-semibold text-gray-100">
              Buyers participate with
            </div>
            <div class="w-full lg:w-2/5 mt-1 relative">
              <ListboxButton class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-200 sm:text-sm">
                <span class="flex items-center">
                  <img :src="selected.logo" alt="" class="flex-shrink-0 h-6 w-6 rounded-full" />
                  <span class="ml-3 block truncate">{{ selected.name }}</span>
                </span>
                <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ListboxOptions class="absolute z-10 mt-1 w-full bg-gray-900 shadow-lg max-h-56 rounded-2xl py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  <ListboxOption as="template" v-for="token in tokens" :key="token.id" :value="token" v-slot="{ active, selected }">
                    <li :class="[active ? 'text-white bg-gray-800' : 'text-gray-100', 'cursor-default select-none relative py-2 pl-3 pr-9']">
                      <div class="flex items-center">
                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                          {{ token.name }}
                        </span>
                      </div>

                      <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
          <!-- Pair created -->
          <div class="flex flex-col mt-1 lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <label class="w-full lg:w-3/5 block text-sm font-semibold text-gray-100">
              PancakeSwap V2 pair to be created
            </label>
            <div class="w-full lg:w-2/5 mt-1 relative w-full">
              <div class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm">
                <span class="flex items-center">
                  <div class="relative flex-none h-6 w-10 items-center">
                    <img class="w-6 h-6 absolute border-launchpad_primary border-2 rounded-full" src="@/assets/icons/olympus.svg" alt="Logo" />
                    <img class="w-6 h-6 absolute left-4 shadow-smooth border-launchpad_primary border-2 rounded-full" src="@/assets/icons/bnb.svg" alt="Logo" />
                  </div>
                  <span class="text-sm inline-block ml-2">{{ selected.name }} / {{ tokenName }}</span>
                </span>
              </div>
            </div>
          </div>
          <!-- Presale owner -->
          <div class="flex flex-col mt-1 lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <label class="w-full lg:w-2/5 block text-sm font-semibold text-gray-100">
              Presale owner
            </label>
            <div class="w-full lg:w-3/5 mt-1 relative w-full">
              <div class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-2 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm">
                <span class="flex justify-between">
                  <span class="overflow-hidden mr-2 text-sm inline-block ml-2">{{ address }}</span>
                  <div class="relative flex-none h-6 w-11">
                    <i class="fa fa-paste text-base text-gray-200 hover:text-gray-100"></i>
                    <a :href="'https://testnet.bscscan.com/address/' + address" target="_blank"><i class="fa fa-external-link text-base ml-2 text-gray-200 hover:text-gray-100"></i></a>
                  </div>
                </span>
              </div>
              <p class="text-xs mt-2">This account will be the only account with  the ability of creating and editing presale contract parameters.</p>
            </div>
          </div>
          <!-- Lock tokens -->
          <!-- 
          <SwitchGroup as="div" class="flex items-center justify-between">
            <span class="flex-grow flex flex-col">
              <SwitchLabel as="span" class="block text-sm font-semibold text-gray-100" passive>Lock Tokens with the Locker of Ananke</SwitchLabel>
            </span>
            <Switch
              v-model="lockEnabled"
              :class="[
                lockEnabled ? 'bg-launchpad_primary' : 'bg-gray-500',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-1 focus:ring-launchpad_primary',
              ]"
            >
              <span aria-hidden="true" :class="[lockEnabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
            </Switch>
          </SwitchGroup>
          -->
          <!-- Enable Whitelisted -->
          <SwitchGroup as="div" class="flex items-center justify-between">
            <span class="flex-grow flex flex-col">
              <SwitchLabel as="span" class="block text-sm font-semibold text-gray-100" passive>Enable Whitelisted</SwitchLabel>
            </span>
            <Switch
              v-model="whitelistEnabled"
              :class="[
                whitelistEnabled ? 'bg-launchpad_primary' : 'bg-gray-500',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-1 focus:ring-launchpad_primary',
              ]"
            >
              <span aria-hidden="true" :class="[whitelistEnabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
            </Switch>
          </SwitchGroup>
          <div v-if="whitelistEnabled" class="py-4 bg-gray-900 rounded-lg text-center transform ring-0 transition ease-in-out duration-600">
            <div class="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
              <div class="bg-gray-800 shadow-lg border-b border-gray-700">
                <div class="flex-row flex justify-between h-12 pr-9 pl-6 items-center">
                  <div>Address</div>
                  <div>Action</div>
                </div>
              </div>
              <div class="max-h-80 overflow-scroll px-1 py-3 lg:py-3 lg:px-3">
                <div class="flex justify-between p-2 rounded-md hover:bg-opacity-50 hover:bg-gray-700" v-for="whitelisted in enable_whitelisted_list" :key="whitelisted.id">
                  <span class="hidden sm:block">{{ whitelisted.address }}</span>
                  <span class="sm:hidden">{{ whitelisted.address.slice(0, 28) }}</span>
                  <span class="cursor-pointer"><i class="fa fa-trash"></i></span>
                </div>
              </div>
            </div>
            <div class="w-full flex justify-end mt-4">
              <button @click="showModal()" class="py-2 px-5 border-2 border-launchpad_primary text-launchpad_primary bg-launchpad_primary bg-opacity-0 hover:bg-opacity-20 rounded-lg font-semibold transition-all duration-200"><i class="fa fa-plus text-launchpad_primary"></i> Add</button>
            </div>
          </div>
          <!-- Tokens available -->
          <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <label class="w-full lg:w-3/5 mt-1 block text-sm font-semibold text-gray-100">
              How many tokens are available for presale?
            </label>
            <div class="w-full lg:w-2/5 mt-1 flex items-center relative">
              <div class="w-full bg-gray-600 border border-gray-300 rounded-2xl cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-200">
                <div class="rounded-2xl text-gray-200 text-right pt-2 pr-2 text-xs">BALANCE: {{ tokenBalance }}</div>
                <input
                  v-model="availableTokens"
                  style="height: 42px;"
                  type="text"
                  class="relative w-full bg-gray-600 rounded-2xl shadow-sm pl-3 pr-10 py-2 text-left sm:text-sm"
                />
              </div>
              <div class="absolute font-semibold text-gray-100 right-3 top-8">{{ tokenName }}</div>
            </div>
          </div>
          <div v-if="isValidAvailablePresale !== ''" class="text-center text-error-red error-msg">{{ isValidAvailablePresale }}</div>
          <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div class="w-full">
              <label class="block text-sm font-semibold text-gray-100">
                Hardcap
              </label>
              <div class="mt-1 flex items-center relative">
                <input
                  v-model="hardCap"
                  style="height: 42px;"
                  type="number"
                  class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-14 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-200 sm:text-sm"
                />
                <div class="absolute font-semibold text-gray-100 right-3">BNB</div>
              </div>
            </div>
            <div class="w-full">
              <label class="block text-sm font-semibold text-gray-100">
                Softcap
              </label>
              <div class="mt-1 flex items-center relative">
                <input
                  v-model="softCap"
                  style="height: 42px;"
                  type="number"
                  class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-14 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-200 sm:text-sm"
                />
                <div class="absolute font-semibold text-gray-100 right-3">BNB</div>
              </div>
            </div>
          </div>
          <div v-if="isValidCap !== ''" class="text-center text-error-red error-msg">{{ isValidCap }}</div>
          <!-- Presale rate -->
          <div class="p-4 bg-gray-700 rounded-lg text-center">
            <div class="font-semibold">PRESALE RATE</div>
            <div v-if="!isEditRate" class="text-xl font-bold gradient-text mt-1" @click="setEditRate()">1 BNB = {{ presaleRate }}  {{ tokenName }}</div>
            <div v-if="isEditRate" class="flex flex-col sm:flex-row sm:justify-between w-full sm:w-4/5 m-auto">
              <div class="mt-1 w-full mb-4 sm:mb-0 sm:w-3/4 flex items-center relative">
                <input
                  v-model="presaleRate"
                  id="presaleRate"
                  style="height: 42px;"
                  type="text"
                  class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-200 sm:text-sm"
                />
                <div class="absolute font-semibold text-gray-100 right-3">{{ tokenName }}</div>
              </div>
              <button @click="saveEditRate()" class="py-1 px-4 border-2 border-launchpad_primary text-launchpad_primary bg-launchpad_primary bg-opacity-0 hover:bg-opacity-20 rounded-2xl font-semibold transition-all duration-200"><i class="fa fa-save text-launchpad_primary"></i> Save</button>
            </div>
            <div v-if="isValidPresaleRate !== ''" class="text-center text-error-red error-msg">{{ isValidPresaleRate }}</div>
          </div>
          <!-- Percent slider -->
          <label class="block text-lg font-semibold text-gray-100 text-center">PERCENT OF RAISED WBNB FOR LIQUIDITY</label>
          <div class="flex flex-row items-center justify-between">
            <span class="text-lg font-semibold text-launchpad_primary">0%</span>
            <span class="text-lg font-semibold text-launchpad_primary">{{ percentageRaised }}%</span>
          </div>
          <vue3-slider class="slider custom-slider" ref="portfolioSlider" v-model="percentageRaised" :data="sliderRange" :height="12" trackColor="#081A2E" color="#EFBD28" :min="min" :max="max" :step="1" :orientation="orientation" />
          <!-- BNB limit -->
          <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <label class="w-full block text-sm font-semibold text-gray-100">
              BNB limit per user
            </label>
            <div class="w-full mt-1 flex items-center relative">
              <input
                v-model="bnbLimit"
                style="height: 42px;"
                type="text"
                class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-200 sm:text-sm"
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
                v-model="bnbMax"
                style="height: 42px;"
                type="text"
                class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-200 sm:text-sm"
              />
              <div class="absolute font-semibold text-gray-100 right-3">BNB</div>
            </div>
          </div>
          <div v-if="isValidBNBPerUser !== ''" class="text-center text-error-red error-msg">{{ isValidBNBPerUser }}</div>
          <!-- Dates -->
            <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div class="w-full">
                <label class="block text-sm font-semibold text-gray-100">START DATE</label>
                <flat-pickr
                  class="bg-launchpad_primary overline bg-opacity-10 hover:shadow-launchpad_primary text-center focus:shadow-launchpad_primary relative mt-4 border-launchpad_primary transition-all duration-200 placeholder-launchpad_primary text-launchpad_primary rounded-2xl border py-3 px-6 w-full cursor-pointer"
                  placeholder="Start Date"
                  name="date"
                  :config="config"
                  v-model="startDate"
                />
              </div>
              <div class="w-full">
                <label class="block text-sm font-semibold text-gray-100">END DATE</label>
                <flat-pickr
                  class="bg-launchpad_primary overline bg-opacity-10 hover:shadow-launchpad_primary text-center focus:shadow-launchpad_primary relative mt-4 border-launchpad_primary transition-all duration-200 placeholder-launchpad_primary text-launchpad_primary rounded-2xl border py-3 px-6 w-full cursor-pointer"
                  placeholder="End Date"
                  name="date"
                  :config="config"
                  v-model="endDate"
                />
              </div>
            </div>
            <div v-if="isValidTime !== ''" class="text-center text-error-red error-msg">{{ isValidTime }}</div>
        </div>

        <div class="caption my-8 bg-gray-800 rounded-lg p-4">
          <launch-summary />
        </div>

        <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <button @click="approve()" v-wave class="p-6 border-2 border-launchpad_primary text-launchpad_primary bg-launchpad_primary bg-opacity-0 hover:bg-opacity-20 rounded-lg w-full font-semibold transition-all duration-200">
            {{ isApproved ? 'APPROVED' : 'APPROVE' }}
          </button>
          <button @click="createLaunch(address)" v-wave :class="[!isApproved ? 'cursor-not-allowed opacity-70 bg-gray-400' : 'hover:bg-opacity-80', 'p-6 bg-launchpad_primary text-gray-900 rounded-lg w-full font-semibold transition-all duration-200']">
            CREATE LAUNCH
          </button>
        </div>
        <div v-if="!isValidAll" class="text-center text-error-red error-msg">Some fields are missing now.</div>
      </div>
    </div>
  </section>

  <popup @close="showPopup = false" v-if="showPopup" @tokenAddress="setTokenAddress($event)"></popup>
</template>

<script>
import Popup from "./Popup.vue";
import Button from "@/components/Button.vue";
import launchSummary from "./launchSummary.vue";
import {
  detectAddress, 
  getName,  
  createPresale, 
  addWhitelist, 
  getBalanceOfToken,
  approve,
} from "@/js/web3.js";
import { ref } from "vue";
import slider from "vue3-slider";
import Head from "./Head.vue";
import { mapGetters, mapState } from 'vuex';
import { Switch, SwitchDescription, SwitchGroup, SwitchLabel, Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

const tokens = [
  {
    id: 1,
    name: "BNB",
    logo: require("@/assets/icons/bnb.svg"),
  },
  // {
  //   id: 2,
  //   name: "BUSD",
  //   logo: require("@/assets/icons/bnb.svg"),
  // },
];

export default {
  components: {
    Button,
    Head,
    Popup,
    launchSummary,
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    SelectorIcon,
    Switch,
    SwitchDescription,
    SwitchGroup,
    SwitchLabel,
    "vue3-slider": slider,
  },
  setup() {
    const selected = ref(tokens[0]);

    return {
      tokens,
      selected,
    };
  },
  created() {
    let launches_type = this.launche_types.filter((launch) => launch.id == this.$route.params.id)[0];
    this.model = {
      ...launches_type,
    },
    this.startDate = Date.now() + 1000000;
    this.endDate = this.startDate + 1000000000;
  },
  data() {
    return {
      min: 0,
      max: 100,
      step: 1,
      orientation: "horizontal",
      expand: false,
      showInputs: false,
      sticky: false,
      repeat: false,
      flip: false,
      isEditRate: false,
      showPopup: false,

      isApproved: false,
      isValidAddress: '',
      isValidAll: true,

      config: {
        enableTime: true,
        enableSeconds: true,
        altFormat: "M j, Y",
        dateFormat: 'Y-m-d H:i:s',
        time_24hr: true
      },

      lockEnabled: false,
      whitelistEnabled: false,
      presaleOwner: null,
      tokenAddress: null,
      tokenName: "--",
      startDate: "2022-01-01",
      endDate: "2022-12-12",
      tokenBalance: 0,
      availableTokens: 0,
      presaleRate: 1,
      hardCap: 100,
      softCap: 51,
      percentageRaised: 70,
      bnbLimit: 0.1,
      bnbMax: 1.5,
    };
  },
  watch: {
    tokenAddress: async function(val) {
      if (val.length == 42 && await detectAddress(val) == "0x" && await getName(val) != "") {
        this.isValidAddress = 'correct';
        this.tokenName = await getName(val);
        this.tokenBalance = await getBalanceOfToken(val, this.address);
        this.availableTokens = this.tokenBalance;
        this.hardCap = this.availableTokens / this.presaleRate;
        this.softCap = this.hardCap / 2 + 1;
      } else {
        this.isValidAddress = 'Invalid token address!  Please try with correct address.';
        this.tokenName = "--";
      }
    },
  },
  methods: {
    async approve() {
      if (
        this.isValidAddress === 'correct' && 
        this.isValidAvailablePresale === '' && 
        this.isValidBNBPerUser === '' && 
        this.isValidCap === '' && 
        this.isValidPresaleRate === '' && 
        this.isValidTime === '' && 
        this.tokenAddress && 
        Number(this.availableTokens) > 0 && 
        Number(this.hardCap) > 0 && 
        Number(this.softCap) > 0 && 
        Number(this.presaleRate) > 0 && 
        Number(this.bnbLimit) > 0 && 
        Number(this.bnbMax) > 0
      ) {
        this.isValidAll = true;
        const result = await approve(this.tokenAddress, this.availableTokens);
        console.log('approve result', result);
        this.isApproved = true;
      } else {
        this.isValidAll = false;
      }
    },
    async createLaunch() {
      await createPresale(
        this.tokenAddress,
        this.address,
        this.softCap,
        this.hardCap,
        this.presaleRate,
        this.bnbLimit,
        this.bnbMax,
        this.percentageRaised,
        this.startDate,
        this.endDate,
        this.availableTokens,
        this.whitelistEnabled,
        true,
        []
      );
    },
    setApprovedFlag() {
      this.isApproved = true;
    },
    async setTokenAddress(e) {
      await addWhitelist(e).then(this.showPopup);
      console.log(e);
    },
    setEditRate() {
      this.isEditRate = true;
    },
    saveEditRate() {
      this.isEditRate = false;
    },
    openPopup: async function() {
      this.showPopup = true;
    },
    showModal() {
      this.openPopup();
    },
    closeModal() {
      this.showPopup = false;
    },
  },
  computed: {
    ...mapGetters('wallet', [
      'address',
      'isWalletConnected',
    ]),
    ...mapState(['launche_types', 'enable_whitelisted_list']),
    isValidCap() {
      if(this.softCap === 0 || this.hardCap === 0) return 'Softcap and Hardcap must not be 0.';
      if(this.softCap > this.hardCap) return 'Softcap must not exceed Hardcap.';
      if(this.softCap * 2 <= this.hardCap) return 'Hardcap must be smaller than 2 times of softCap.';
      return '';
    },
    isValidAvailablePresale() {
      if(this.availableTOkens === 0) return '*Must not be 0.';
      if(this.availableTokens > this.tokenBalance) return '*Must be smaller than balance.';
      return '';
    },
    isValidPresaleRate() {
      if(this.presaleRate === 0) return 'Presale rate must be bigger than 0.';
      if(this.availableTokens / this.presaleRate < this.hardCap) return 'Current presale rate couldn\'t reach hardcap.';
      return '';
    },
    isValidBNBPerUser() {
      if(this.bnbLimit > this.bnbMax) return 'BNB Min must be smaller than BNB Max.';
      return '';
    },
    isValidTime() {
      if(this.startDate < new Date()) return 'Start time passed current time.';
      if(this.startDate > this.endDate) return 'Start time must before end time.';
      return '';
    }
  },
};
</script>

<style scoped>
.error-msg {
  margin-top: 0.5rem !important;
}
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.checkbox {
  --border-color: #d2d6dc;
  --color: #3f83f8;
  display: flex;
  align-items: center;
}
.checkbox input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  vertical-align: middle;
  background-origin: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-shrink: 0;
  height: 1.5rem;
  width: 1.5rem;
  color: #fff;
  background-color: #3bd0f51f;
  border-color: #3bd0f5;
  border-width: 1px;
  border-radius: 0.25rem;
  border-style: solid;
}
.checkbox input[type="checkbox"]:checked {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L7 8.586 5.707 7.293z'/%3E%3C/svg%3E");
  border-color: transparent;
  background-color: #3bd0f5;
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
}
@media not print {
  .checkbox input[type="checkbox"]::-ms-check {
    border-width: 1px;
    color: transparent;
    background: inherit;
    border-color: inherit;
    border-radius: inherit;
  }
}
.checkbox input[type="checkbox"]:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
  border-color: #a4cafe;
}
.checkbox input[type="checkbox"]:checked:focus {
  border-color: transparent;
}
.checkbox label {
  margin-left: 0.5rem;
  display: block;
  line-height: 1.25rem;
}

input[type="date"],
input[type="time"] {
  display: block;

  /* Solution 1 */
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  min-height: 32px;
  width: 100%;
}
</style>
