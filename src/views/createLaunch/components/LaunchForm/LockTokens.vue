<template>
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
</template>
<script>
import { 
  SwitchGroup, 
  SwitchLabel,
  Switch
} from '@headlessui/vue';

export default {
  props: {
    value: Boolean,
  },
  components: {
    SwitchGroup,
    SwitchLabel,
    Switch
  },
  data() {
    return {
      lockEnabled: false,
    }
  }
}
</script>