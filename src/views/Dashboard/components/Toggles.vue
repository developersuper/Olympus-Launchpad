<template>
  <div>
    <TabGroup class="m-auto lg:w-100">
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
      statuses: ["POPULAR", "NEWEST", "ENDING SOON"],
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
