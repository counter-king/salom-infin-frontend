<script setup>
// Core
import { ref } from 'vue'
// Components
import { ActionToolbar } from '@/components/Actions'
import ProfileCard from '../components/ProfileCard.vue'
// Reactive
const items = ref([
  {
    label: 'Филиал',
    data: 'Bosh ofis'
  },
  {
    label: 'Департамент',
    data: 'Axborot texnologiyalari'
  },
  {
    label: 'Управления',
    data: 'Innovation texnologiyalar boshqarmasi'
  },
  {
    label: 'Отдел',
    data: 'Dasturiy taminotlarni ishlab chiqish'
  },
  {
    label: 'Должность',
    data: 'Администратор'
  },
  {
    label: 'status',
    data: 'Рабочие'
  },
  {
    label: 'Cisco',
    data: '17-93'
  },
  {
    label: 'Табелный номер',
    data: '669213'
  },
])
</script>

<template>
  <div class="work-view">
    <action-toolbar title="Рабочий">
      <template #filters>
        <span></span>
      </template>
    </action-toolbar>

    <profile-card :items="items" />
  </div>
</template>
