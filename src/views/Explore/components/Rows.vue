<template>
  <section style="margin-top:0px" class="container relative">
    <div class="w-full lg:mt-o mt-4 bg-gray-900 border border-gray-700 p-4 items-center rounded-2xl overflow-hidden flex flex-col wow fadeInDown mb-4" data-wow-duration="0.3s" data-wow-delay="0.6s">
      <h3 class="gradient-text">Filter by Token</h3>
      <input
        class="bg-launchpad_primary overline bg-opacity-10 hover:shadow-launchpad_primary focus:shadow-launchpad_primary relative filterByToken mt-4 border-launchpad_primary transition-all duration-200 placeholder-launchpad_primary-light text-launchpad_primary rounded-full border p-3 w-full text-center"
        placeholder="Search by token name or address"
      />
    </div>

    <div class="relative w-full h-164 mb-10 wow fadeInDown" data-wow-duration="0.3s" data-wow-delay="0.7s">
      <transition name="fadeFromBottom">
        <div class="absolute w-full" id="lockedliquidity">
          <div class="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
            <div class="bg-gray-800 shadow-lg border-b border-gray-700">
              <div class="flex-row flex justify-between h-12 pr-9 pl-6 items-center">
                <div class="lg:flex hidden overline text-gray-100 tokenName">Name</div>
                <div class="lg:flex hidden overline text-gray-100 launchRatio">Ratio</div>
                <div class="lg:flex hidden overline text-gray-100 launchParticipants">Participants</div>
                <div class="lg:flex hidden overline text-gray-100 launchType">Launch Type</div>
                <div class="lg:flex hidden overline text-gray-100 launchProgress">Progress</div>
                <div class="lg:flex hidden overline text-gray-100 launchEnds">Ends</div>
                <div class="lg:flex hidden overline text-gray-100 launchEnds pl-12">Active</div>
              </div>
            </div>
            <div class="h-154 overflow-scroll px-1 py-3 lg:py-3 lg:px-3">
              <div v-for="launch in launches" :key="launch.id">
                <Rowsingle :id="launch.id" :isLive="launch.isLive" :icon="launch.icon" :isOwned="launch.isOwned" :isPublic="launch.isPublic" :name="launch.name" :ratio="launch.ratio" :participants="launch.participants" :launchType="launch.launchType" :partnerType="launch.partnerType" :progress="launch.progress" :startDate="launch.startDate" :endDate="launch.endDate" />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import Rowsingle from "./Rowsingle.vue";
import Button from "@/components/Button.vue";
import Logo from "@/components/Logo.vue";
import Popper from "vue3-popper";
import { mapGetters, mapState } from 'vuex';

export default {
  name: "Rows",
  components: {
    Rowsingle,
    Button,
    Logo,
    Popper,
  },
  computed: {
    ...mapState(['launches']),
  },
};
</script>
