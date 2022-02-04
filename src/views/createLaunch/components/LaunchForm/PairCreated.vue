<template>
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
          <span class="text-sm inline-block ml-2">{{ name }} / {{ tokenName }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    tokenName: String
  }
}
</script>