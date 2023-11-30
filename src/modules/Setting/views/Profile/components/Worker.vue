
<script setup>
import { ref } from 'vue';


const items = ref([
  {
    label: "Фамилия",
    data: "Абдуллаев"
  },
  {
    label: "Имя",
    data: "Рустам"
  },
  {
    label: "Отчество",
    data: "Азимжон угли"
  },
  {
    label: "Дата рождения",
    data: "05.12.1997"
  },
  {
    label: "Эл. почта",
    data: "rustam1997@gmail.com"
  },
  {
    label: "Адресь",
    data: "Ташкент, Юнусабад  дом 2"
  },
  {
    label: "Пол",
    data: "Мужчина"
  },
  {
    label: "Мобилный номер",
    data: "Мужчина +998 93 126 24 66"
  },
]);
</script>

<template>
  <div  class="bg-primary-50 px-6 py-2 mx-6 rounded-lg divide-y">
    <div
      v-for="item in items" :key="item.label"
      class="w-full flex justify-between p-3"
      >
      <p>{{ item.label }}</p>
      <p>{{ item.data }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
