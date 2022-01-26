<template>
  <nav class="flex flex-col py-10 px-7 items-center">
    <div class="flex flex-row space-x-4 mb-6">
      <a href="https://mobile.twitter.com/olympus_token" target="_blank"
        >
        <div class="social h-12 w-12 rounded-full text-center pt-2.5 pl-0.5 mr-1"><i class="fab fa-twitter text-xl"></i></div>
      </a>
      <a href="https://www.instagram.com/olympusbsc/?hl=en" target="_blank"
        >
        <div class="social h-12 w-12 rounded-full text-center pt-2.5 mr-1"><i class="fab fa-instagram text-xl"></i></div>
      </a>
      <a href="https://t.me/OlympusOfficial" target="_blank"
        >
        <div class="social h-12 w-12 rounded-full text-center pt-2.5 mr-1"><i class="fab fa-telegram text-xl"></i></div>
      </a>
      <a href="mailto:contact@olympustoken.io" target="_blank"
        ><div class="social h-12 w-12 rounded-full text-center pt-2 pl-0.5 mr-1"><i class="fa fa-envelope text-xl"></i></div>
      </a>
    </div>
    <div class="flex flex-row mb-6">
      <span class="mr-2 py-1 text-2xl">FROM</span><img class="h-10" src="@/assets/olympus-logo.png" alt="Logo" />
    </div>
    <p class="mb-3 text-xl font-semibold">OLYMPUSTOKEN.IO</p>
  </nav>
</template>

<script>
// @ is an alias to /src
// import ItemComp from "@/components/Itemc.vue";
export default {
  name: "Footer",
};
</script>
<style>
p {
  font-family: "Open Sans", sans-serif;
  text-decoration: none !important;
}
.social {
  border: 1px solid #b1b5b7;
}
.social:hover {
  border: none;
  background-color: #bfbfbf;
}
</style>
