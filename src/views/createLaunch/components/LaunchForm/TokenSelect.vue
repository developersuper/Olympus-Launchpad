<template>
  <Listbox as="div" v-model="selected" class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
    <div class="w-full lg:w-3/5 mt-1 block text-sm font-semibold text-gray-100">
      Buyers participate with
    </div>
    <div class="w-full lg:w-2/5 mt-1 relative">
      <ListboxButton 
        class="relative w-full bg-gray-600 border border-gray-300 rounded-2xl shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-200 sm:text-sm">
        <span class="flex items-center">
          <img :src="selected.logo" alt="" class="flex-shrink-0 h-6 w-6 rounded-full" />
          <span class="ml-3 block truncate">{{ selected.name }}</span>
        </span>
        <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions 
          class="absolute z-10 mt-1 w-full bg-gray-900 shadow-lg max-h-56 rounded-2xl py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <ListboxOption 
            as="template" 
            v-for="token in tokens" :key="token.id" 
            :value="token" 
            v-slot="{ active, selected }"
          >
            <li :class="[active ? 'text-white bg-gray-800' : 'text-gray-100', 'cursor-default select-none relative py-2 pl-3 pr-9']">
              <div class="flex items-center">
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                  {{ token.name }}
                </span>
              </div>
              <span 
                v-if="selected" 
                :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
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
</template>
<script>
import { ref } from 'vue';
import { 
  CheckIcon, 
  SelectorIcon 
} from '@heroicons/vue/solid';
import { 
  Listbox, 
  ListboxButton, 
  ListboxOption, 
  ListboxOptions 
} from '@headlessui/vue';

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
  props: {
    tokenName: String
  },
  components: {
    CheckIcon, 
    SelectorIcon,
    Listbox, 
    ListboxButton, 
    ListboxOption, 
    ListboxOptions  
  },
  setup() {
    const selected = ref(tokens[0]);
    return {
      tokens,
      selected,
    };
  },
  methods: {
  }
}
</script>