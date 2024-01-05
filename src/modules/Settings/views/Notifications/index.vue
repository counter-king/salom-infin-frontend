
<script setup>
import { ref, onMounted } from 'vue';
import axiosConfig from "@/services/axios.config";
const items = ref([
  {
    title: "Установить уведомления о платежах",
    description: "Получайте уведомления о важных изменениях в банковских счетах микродепозитов.",
    sidePanelSwitch: false
  },
  {
    title: "Установить уведомления о платежах",
    description: "Получайте уведомления о важных изменениях четах.",
    sidePanelSwitch: true
  },
  {
    title: "Установить уведомления о платежах",
    description: "Получайте уведомления ваших банковских счетах микродепозитов.",
    sidePanelSwitch: true
  },
  {
    title: "Установить уведомления о платежах",
    description: "Получайте уведомления о важных изменениях в банковских счетах микродепозитов.",
    sidePanelSwitch: false
  },
  {
    title: "Установить уведомления о платежах",
    description: "Получайте уведомления ваших банковских счетах микродепозитов.",
    sidePanelSwitch: true
  },
  {
    title: "Установить уведомления о платежах",
    description: "Получайте уведомления о важных изменениях в банковских счетах микродепозитов.",
    sidePanelSwitch: true
  },
  {
    title: "Установить уведомления о платежах",
    description: "Получайте уведомления о важных изменениях четах.",
    sidePanelSwitch: true
  }
]);
onMounted(() => {
  axiosConfig
    .get('notification-types/')
    .then(response => {
      console.log(response)
    })
    .catch(() => {
      console.log('error')
    })
})
</script>
<template>
  <div class="flex flex-col h-full">
    <div class="flex mb-5 justify-between items-center">
      <h1 class="text-2xl font-bold text-primary-900">Уведомления</h1>
    </div>
    <div  class="flex-col h-full detail-layout-content  bg-white overflow-hidden shadow-button rounded-2xl p-6">
      <div
        v-for="item in items" :key="item.title"
        class="my-devices w-full flex justify-between items-center p-3 rounded-lg"
        >
        <div>
          <div class="text-primary-900 text-base font-semibold">{{ item.title }}</div>
          <p class="text-sm font-medium text-greyscale-500">{{ item.description }}</p>
        </div>
        <base-switch
          v-model="item.sidePanelSwitch"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.my-devices:nth-child(even) {
  background: initial;
}
.my-devices:nth-child(odd) {
  background:rgba(247, 247, 249, 1)
}
</style>
