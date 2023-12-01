
<script setup>
import { ref } from 'vue';
// Composable
const visible = ref(false);
const items = ref([
  {
    nameDevices: "Samsung SM-J510FN MSM8916",
    brend: "Мобильное приложение",
    date:"07.07.2023 11:42",
  },
  {
    nameDevices: "Windows 10 Chrome 91.04472124",
    brend: "Веб-приложение",
    date:"07.07.2023 11:42",
  },
  {
    nameDevices: "Samsung SM-J510FN MSM8916",
    brend: "Мобильное приложение",
    date:"07.07.2023 11:42",
  },
  {
    nameDevices: "Windows 10 Chrome 91.04472124",
    brend: "Веб-приложение",
    date:"07.07.2023 11:42",
  },
  {
    nameDevices: "Windows 10 Chrome 91.04472124",
    brend: "Веб-приложение",
    date:"07.07.2023 11:42",
  },
]);
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex mb-5 justify-between items-center">
      <h1 class="text-2xl font-bold text-primary-900">Мои устройства</h1>
    </div>

    <div  class="flex-col h-full detail-layout-content  bg-white overflow-hidden shadow-button rounded-2xl p-6">
      <div
        v-for="item in items" :key="item.nameDevices"
        @click="visible = true"
        class="my-devices w-full flex justify-between items-center p-3 rounded-lg cursor-pointer group"
        >
        <div>
          <div class="text-primary-900 text-base font-semibold group-hover:text-primary-500">{{ item.nameDevices }} <span class="font-medium text-greyscale-500">({{ item.brend }})</span></div>
          <p class="text-sm font-medium text-greyscale-500">{{ item.date }}</p>
        </div>
        <base-icon  width="24"  height="24" name="TrashIcon" class="text-red-500 transition-all duration-[400ms] mr-2" />
      </div>
    </div>
  </div>

  <base-dialog
    v-model:visible="visible"
    headerClasses="!hidden"
    contentClasses="rounded-t-2xl"
    max-width="!w-[374px]"
    >
    <template #content>
      <div class="w-20 h-20 mt-9 mx-auto flex items-center justify-center  rounded-full bg-red-100">
        <base-icon  width="32"  height="32" name="LaptopMinimalisticBoIdeIcon" class="text-red-500 transition-all durati" />
      </div>
      <div class="text-primary-900 text-base font-semibold text-center">Завершить этот сеанс?</div>
      <p class="text-sm font-medium text-greyscale-500 text-center px-8">Вы хотите завершить сеанс на этом устройстве?</p>
    </template>

    <template #footer>
      <div class="flex items-center justify-center  w-full">
        <base-button
          class="w-full"
          label="cancel"
          rounded
          outlined
          shadow
          color="text-primary-900"
          border-color="border-transparent"
          @click="visible = false"
        />

        <base-button
          class="w-full"
          label="complete"
          rounded
          @click="visible = false"
        />
      </div>
    </template>
  </base-dialog>
</template>

<style lang="scss" scoped>
.my-devices:nth-child(even) {
  background: initial;
}
.my-devices:nth-child(odd) {
  background:rgba(247, 247, 249, 1)
}
</style>
