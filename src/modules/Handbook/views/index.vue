<script setup>
// Core
import { ref } from 'vue'
// Components
import HeaderToolbar from '../components/HeaderToolbar.vue'
import GroupTable from '../components/GroupTable.vue'
// Reactive
const users = ref([])
// Watch
</script>

<template>
  <div class="handbook-view w-full p-10 pt-7">
    <header-toolbar @emit:up="(value) => users = value" />

    <div class="h-[calc(100vh-200px)] rounded-2xl bg-white shadow-button p-5">
      <group-table :value="users" />
    </div>
  </div>
</template>
