
<template>
  <div class="mt-4 sm:col-span-2">
    <div class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-500 border-dashed rounded-md">
      <div class="space-y-2 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="flex text-sm text-gray-400">
          <label for="file-upload" class="relative cursor-pointer bg-gray-700 px-3 py-1 rounded-md font-medium text-indigo-600 hover:text-white focus-within:outline-none focus-within:ring-1 focus-within:ring-launchpad_primary">
            <span>Upload token icon</span>
            <input id="file-upload" name="file-upload" type="file" class="sr-only" />
          </label>
        </div>
        <p class="text-xs text-gray-300">
          In .png format
        </p>
      </div>
    </div>
  </div>
</template>

<script></script>
