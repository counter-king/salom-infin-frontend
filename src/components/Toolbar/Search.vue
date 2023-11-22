<script setup>
// Core
import { ref } from 'vue'
// Components
import SearchFilter from './SearchFilter.vue'
// Reactive
const model = ref();
</script>
<template>
  <div class="flex w-[748px]   rounded-full bg-greyscale-800 hover:bg-greyscale-900 border-greyscale-800 ">
    <base-input
      class="!mb-0 flex-1 p-input-icon-left search_input"
      inputClass="h-9 text-white bg-inherit border-transparent
      !focus:outline-none focus:ring-0  focus:border-inherit focus-visible:border-inherit"
      v-model="model"
      placeholder="document-number"
      >
      <template #input-icon-left>
        <base-icon name="MagniferIcon" width="16" height="16" class="text-white -mt-2"/>
      </template>
    </base-input>

    <search-filter></search-filter>
  </div>
</template>
<style>
.search_input .p-inputtext {
  border: initial !important;
}
</style>
