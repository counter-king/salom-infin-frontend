<script setup>
// Core
import { ref } from 'vue'
// Components
import TheNavigation from '@/components/TheNavigation.vue'
import { ClipboardCheckIcon, NotesIcon } from '@/components/Icons'
// Reactive
const navs = ref([
  {
    title: 'Категория документа',
    icon: ClipboardCheckIcon,
    link: 'AgreementCategoty',
  },
  {
    title: 'Вид документа',
    icon: NotesIcon,
    link: 'AgreementType',
  },
])
</script>

<template>
  <div class="settings-view">
    <the-navigation :navs="navs" />

    <router-view />
  </div>
</template>
