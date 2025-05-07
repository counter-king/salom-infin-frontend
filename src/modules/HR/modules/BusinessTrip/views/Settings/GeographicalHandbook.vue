<script setup>
// core
// components
import { CityList, CountryList } from './components/GeographicalHandbook'

</script>
<template>
  <div class="flex min-h-[520px]">
    <!-- left country -->
    <CountryList />
    <!-- separator -->
    <div class="!w-[1px] self-stretch bg-greyscale-100"></div>
    <!-- right city -->
    <CityList />
  </div>
</template>
<style scoped>
</style>