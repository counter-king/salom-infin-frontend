<script setup>
import Skeleton from 'primevue/skeleton';
</script>
<template>
   <div class="bg-primary-50 w-full h-full overflow-hidden absolute left-0 top-0">
      <div v-for="(_, index) in 10" :key="index" class="bg-white px-5 h-14 rounded-xl flex flex-col justify-center items-center mb-1">
         <div class="w-full h-full flex items-center justify-center gap-4">
            <skeleton v-for="(_, index) in 5" :key="index" height="16px" />
         </div>
      </div>
   </div>
</template>
<style>
</style>