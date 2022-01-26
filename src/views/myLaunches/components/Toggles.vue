<template>
  <div class="flex lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-4 max-w-150 mx-auto">
    <TabGroup class="lg:w-1/2">
      <TabList class="flex p-1 space-x-1 bg-gray-900 border border-gray-700 rounded-xl">
        <Tab v-for="type in types" as="template" :key="type" v-slot="{ selected }">
          <button
            :class="[
              'w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg',
              'focus:outline-none focus:ring-1 ring-white ring-opacity-60',
              selected ? 'bg-gradient-to-r font-semibold shadow-launchpad_primary from-launchpad_primary to-launchpad_primary-xtra_dark' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ type }}
          </button>
        </Tab>
      </TabList>
    </TabGroup>
    <TabGroup class="lg:w-1/2">
      <TabList class="flex p-1 space-x-1 bg-gray-900 border border-gray-700 rounded-xl">
        <Tab v-for="status in statuses" as="template" :key="status" v-slot="{ selected }">
          <button
            :class="[
              'w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg',
              'focus:outline-none focus:ring-1 ring-white ring-opacity-60',
              selected ? 'bg-gradient-to-r font-semibold shadow-launchpad_primary from-launchpad_primary to-launchpad_primary-xtra_dark' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ status }}
          </button>
        </Tab>
      </TabList>
    </TabGroup>
  </div>
</template>

<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

export default {
  data: function() {
    return {
      types: ["Created", "Joined"],
      statuses: ["Active", "Ended"],
    };
  },
  components: {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
};
</script>
