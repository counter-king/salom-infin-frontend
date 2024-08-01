<script setup>
// Core
import { ref } from 'vue'
// Components
import { ActionToolbar } from '@/components/Actions'
import ProfileCard from '../components/ProfileCard.vue'
// Reactive
const items = ref([
  {
    label: 'Фамилия',
    data: 'Абдуллаев'
  },
  {
    label: 'Имя',
    data: 'Рустам'
  },
  {
    label: 'Отчество',
    data: 'Азимжон угли'
  },
  {
    label: 'Дата рождения',
    data: '05.12.1997'
  },
  {
    label: 'Эл. почта',
    data: 'rustam1997@gmail.com'
  },
  {
    label: 'Адресь',
    data: 'Ташкент, Юнусабад  дом 2'
  },
  {
    label: 'Пол',
    data: 'Мужчина'
  },
  {
    label: 'Мобилный номер',
    data: 'Мужчина +998 93 126 24 66'
  },
])
</script>

<template>
  <div class="personal-view">
    <action-toolbar title="Персональный">
      <template #filters>
        <span></span>
      </template>
    </action-toolbar>

    <profile-card :items="items" />
  </div>
</template>
