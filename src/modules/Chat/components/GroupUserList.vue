<script setup>
// components
import GroupUserItem from './GroupUserItem.vue';


</script>
<template>
 <div class="px-6 overflow-y-auto"  style="height: calc(100vh - 540px)">
  <GroupUserItem v-for="item in 10" :key="item" />
 </div>
</template>