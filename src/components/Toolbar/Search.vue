<script setup>
// Core
import { ref,  inject  } from 'vue'
import { useRouter } from 'vue-router'
// Components
import { MagniferIcon } from '@/components/Icons'
import SearchFilter from './SearchFilter.vue'
// Composable
const router = useRouter();
// Reactive
const search = ref();
const openModal = inject('openModal', ref(false))
const navigateToRouter = () => {
  router.push({ path: '/search' })
  openModal.value = !openModal.value
};
</script>
<template>
  <div class="flex w-[748px] rounded-full bg-greyscale-800 hover:bg-greyscale-900 border-greyscale-800 ">
    <base-input
      v-model="search"
      :icon-left="MagniferIcon"
      placeholder="document-number"
      input-class="h-9 text-white bg-inherit border-transparent !focus:outline-none focus:ring-0  focus:border-inherit focus-visible:border-inherit"
      class="!mb-0 flex-1 p-input-icon-left search_input"
      @keyup.enter="navigateToRouter"
    />

    <search-filter />
  </div>
</template>
<style>
.search_input .p-inputtext {
  border: initial !important;
}
</style>
