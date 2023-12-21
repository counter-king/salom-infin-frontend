<script setup>
import Skeleton from 'primevue/skeleton';
</script>
<template>
   <div class="py-1 mt-[114px] bg-greyscale-50 h-full w-full">
      <div v-for="(_, index) in 10" :key="index" class="bg-white px-5 h-14 rounded-lg flex flex-col justify-center items-center mb-2">
         <div class="w-full h-full flex items-center justify-center gap-4">
            <skeleton v-for="(_, index) in 5" :key="index" height="16px" />
         </div>
      </div>
   </div>
</template>
<style>
</style>