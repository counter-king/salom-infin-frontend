<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import SessionEndMessageBar from './SessionEndMessageBar.vue'
import { removeStorageItem, saveStorageItem } from '@/utils/storage'
import { ACCESS, CURRENT_ROUTE, EXPIRES, REDIRECT_AFTER_LOGIN, REFRESH } from '@/constants/storage'

const TIMEOUT_MS = 4 * 60 * 60 * 1000 // 4 hours
let timerId
const activityEvents = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'wheel',
  'scroll',
  'pointermove',
]

const showModal = ref(false)

const resetTimer = () => {
  if (showModal.value) return

  clearTimeout(timerId)
  timerId = setTimeout(() => {
    handleTimeout()
  }, TIMEOUT_MS)
}

const handleTimeout = () => {
  try {
    saveStorageItem(REDIRECT_AFTER_LOGIN, window.location.pathname)
    removeStorageItem(ACCESS)
    removeStorageItem(REFRESH)
    removeStorageItem(EXPIRES)
    removeStorageItem(CURRENT_ROUTE)
  } catch (e) {}

  showModal.value = true
  removeActivityListeners()
  clearTimeout(timerId)
}

const onActivity = () => {
  resetTimer()
}

const onVisibilityChange = () => {
  if (!document.hidden) {
    resetTimer()
  }
}

const addActivityListeners = () => {
  activityEvents.forEach(ev =>
    window.addEventListener(ev, onActivity, { passive: true })
  )
  document.addEventListener('visibilitychange', onVisibilityChange)
}

const removeActivityListeners = () => {
  activityEvents.forEach(ev =>
    window.removeEventListener(ev, onActivity)
  )
  document.removeEventListener('visibilitychange', onVisibilityChange)
}

onMounted(() => {
  addActivityListeners()
  resetTimer()
})

onBeforeUnmount(() => {
  removeActivityListeners()
  clearTimeout(timerId)
})
</script>

<template>
  <div class="inactivity-logout-view">
    <slot />

    <template v-if="showModal">
      <SessionEndMessageBar />
    </template>
  </div>
</template>

<style scoped>

</style>
