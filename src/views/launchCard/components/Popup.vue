<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <DialogOverlay class="fixed z-20 inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-30 overflow-y-auto">
        <div class="min-h-screen text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle">
            &#8203;
          </span>

          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <div class="inline-block w-full bg-gray-800 max-w-md sm:max-w-xl overflow-hidden text-left align-middle transition-all transform">
              <div class="relative p-6 rounded-2xl border border-launchpad_primary">
                <div class="mt-1 flex flex-col items-center relative">
                  <input
                    class="bg-launchpad_primary overline bg-opacity-10 hover:shadow-launchpad_primary focus:shadow-launchpad_primary relative my-8 border-launchpad_primary transition-all duration-200 placeholder-launchpad_primary text-launchpad_primary rounded-full border p-3 w-full text-center"
                    placeholder="Enter token address"
                    v-model="tokenAddress"
                  />
                  <div class="flex w-1/2 mb-8 justify-around">
                    <button @click="passTokenAddr()" class="py-2 px-5 border-2 border-launchpad_primary text-launchpad_primary bg-launchpad_primary bg-opacity-0 hover:bg-opacity-20 rounded-lg font-semibold transition-all duration-200"><i class="fa fa-plus text-launchpad_primary"></i> Add</button>
                  </div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from "vue";
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from "@headlessui/vue";

export default {
  data() {
    return {
      tokenAddress: "",
    };
  },
  setup() {
    const isOpen = ref(true);
    return {
      isOpen,
      closeModal() {
        isOpen.value = false;
      },
      openModal() {
        isOpen.value = true;
      },
    };
  },
  methods: {
    passTokenAddr() {
      this.$emit('tokenAddress', this.tokenAddress);
    }
  },
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
  },
};
</script>

