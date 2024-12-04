<script setup>
// Core
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
// Components
import Notification from './Notification.vue'
// Utils
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Composable
const { t } = useI18n()
// Methods
const isOnline = () => navigator.onLine
// Hooks
onMounted(() => {
  window.addEventListener('online', () => {
    if(isOnline()) {
      dispatchNotify(null, 'Интернет подключен', COLOR_TYPES.SUCCESS)
    }
  })

  window.addEventListener('offline', () => {
    if(!isOnline()) {
      dispatchNotify(null, 'Интернет отключен', COLOR_TYPES.ERROR)
    }
  })
})
</script>

<template>
  <notification />
</template>

<style scoped>

</style>
