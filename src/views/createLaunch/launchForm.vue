<template>
  <div class="container mx-auto px-4 my-6 lg:my-8">
    <launch-form />
  </div>
</template>

<script>
// @ is an alias to /src
import launchForm from "@/views/createLaunch/components/launchForm";
import largeButton from "@/components/largeButton.vue";
import Logo from "@/components/Logo.vue";
export default {
  name: "createLaunch",
  components: {
    launchForm,
    largeButton,
    Logo,
  },
};
</script>
