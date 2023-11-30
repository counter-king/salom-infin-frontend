<script setup>
// Core
import { ref,  inject  } from 'vue'
import { useRouter } from 'vue-router'
// Components
import SearchFilter from './SearchFilter.vue'
// Composable
const router = useRouter();
// Reactive
const search = ref();
const openModal = inject('openModal', ref(false));
const navigateToRouter = () => {
  router.push({ path: "/search" });
  openModal.value = !openModal.value;
};
</script>
<template>
  <div class="flex w-[748px] rounded-full bg-greyscale-800 hover:bg-greyscale-900 border-greyscale-800 ">
    <base-input
      class="!mb-0 flex-1 p-input-icon-left search_input"
      inputClass="h-9 text-white bg-inherit border-transparent
      !focus:outline-none focus:ring-0  focus:border-inherit focus-visible:border-inherit"
      v-model="search"
      placeholder="document-number"
      iconLeft="MagniferIcon"
      iconLeftClass="-mt-2"
      @keyup.enter="navigateToRouter"
      >
    </base-input>

    <search-filter></search-filter>
  </div>
</template>
<style>
.search_input .p-inputtext {
  border: initial !important;
}
</style>
