
<script setup>
import { ref } from 'vue';
import Personal from "./components/Personal.vue";
import Worker from "./components/Worker.vue";
const tabItems = ref([
  { label: 'Персональный' },
  { label: 'Рабочий'}
]);
const profileTab = ref(0);
</script>
<template>
  <div class="flex flex-col h-full">
    <div class="flex mb-5 justify-between items-center">
      <h1 class="text-2xl font-bold text-primary-900">Профиль </h1>
    </div>
    <div class="flex-col h-full detail-layout-content bg-white overflow-hidden shadow-button rounded-2xl w-4/6 pb-6">
      <div class="flex items-center hover:cursor-pointer p-8">
        <base-avatar
          avatar-classes="w-20 h-20"
          image="/images/avatars/1.jpg"
          shape="circle"
        />
        <div class="ml-3 flex-1">
          <h1  class="text-primary-900 text-xl font-semibold mb-1">Абдуллаев Рустам</h1>
          <span class="block text-greyscale-500 text-sm">Администратор</span>
        </div>
        <base-tab-menu
          :tab-items="tabItems"
          segment
          v-model="profileTab"
          />
      </div>
      <template v-if="profileTab == 0">
        <personal></personal>
      </template>
      <template v-if="profileTab  == 1">
        <worker></worker>
      </template>
    </div>
  </div>
</template>
<style></style>