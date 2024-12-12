<script setup>
// Core
import { ref } from 'vue'
// Components
import HeaderToolbar from '../components/HeaderToolbar.vue'
import GroupTable from '../components/GroupTable.vue';
import TheFooter from '@/components/TheFooter.vue';

// Reactive
const users = ref([])
const totalCount = ref(null)
const isSearch = ref(false)

const handleEmitUp = (value,totalCountPage)=>{
  users.value = value;
  totalCount.value = totalCountPage
}
// Watch
</script>

<template>
  <div class="flex flex-col flex-1 overflow-y-auto">
    <div class="handbook-view w-full p-10 pt-7">
      <header-toolbar @emit:up="handleEmitUp" @emit:search="(value) => isSearch = value" />
        <div class="h-[calc(100vh-200px)] rounded-2xl bg-white shadow-button p-5">
          <group-table :value="users" :isSearch="isSearch" row-group-mode="subheader" :totalCount="totalCount"/>
        </div>
    </div>
    <div class="pl-10 pb-2">
      <the-footer/>
    </div>
  </div>
</template>
