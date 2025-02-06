<script setup>
// Core
import { useI18n } from "vue-i18n"
// Components
import { RefreshIcon } from "@/components/Icons"


// Composable
const { locale } = useI18n()

// Methods
const refresh = () => {
  if ('caches' in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });
  }

  location.reload(true)
}
</script>

<template>
  <base-button
    v-tooltip.bottom="{
      value: `<h4 class='text-xs text-white -my-1'>${locale === 'uz' ? 'Sahifani yangilash' : 'Обновить'}</h4>`,
      escape: true,
      autoHide: false
    }"
    color="bg-greyscale-800 hover:bg-greyscale-900"
    border-color="border-greyscale-800"
    :icon-left="RefreshIcon"
    onlyIcon
    rounded
    @click="refresh"
  />
</template>

<style scoped>

</style>
