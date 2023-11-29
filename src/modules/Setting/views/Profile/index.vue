
<script setup>
import { ref } from 'vue';

const tabItems = ref([
    { label: 'Персональный' },
    { label: 'Рабочий'}
]);

const profileTab = ref(0);
</script>
<template>
  <div class="flex mb-5 justify-between items-center">
    <h1 class="text-2xl font-bold text-primary-900">Профиль </h1>
  </div>

  <div class="px-3 py-3 rounded-xl bg-white cursor-pointer shadow-button w-4/6">
    <div class="flex items-center hover:cursor-pointer" @click="toggle">
      <base-avatar
        image="/images/avatars/1.jpg"
        shape="circle"
        avatar-classes="w-20 h-20"
      />

      <div class="ml-3 flex-1">
        <h1  class="text-primary-900 text-xl font-semibold mb-1">Абдуллаев Рустам</h1>
        <span class="block text-greyscale-500 text-sm">Администратор</span>
      </div>


      <base-tab-menu
        v-model="profileTab"
        :tab-items="tabItems"
        segment
        />
    </div>

    <template v-if="profileTab == 0">
      <div>
        salom
      </div>
    </template>
    <template v-if="profileTab  == 1">
      <div>
        salom 2
      </div>
    </template>

</div>
</template>
<style>

</style>
