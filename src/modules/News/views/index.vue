<script setup>
import HeaderToolbar from '../components/HeaderToolbar.vue'
import TheFooter from '@/components/TheFooter.vue'

</script>

<template>
  <div class="news-view w-full p-10 pt-7 pb-2 overflow-y-scroll flex flex-col">
    <header-toolbar />
    <router-view/>
    <div class="mt-auto">
      <the-footer/>   
    </div>
  </div>
</template>