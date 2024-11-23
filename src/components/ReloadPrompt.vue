<script setup>
// Core
import { computed, ref } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
// Components
import { RefreshCircleBoldIcon } from '@/components/Icons'
// Stores
import { useNavigationStore } from '@/stores/navigation.store'
// Composable
const route = useRoute()
const { t } = useI18n()
const navigationStore = useNavigationStore()
// periodic sync is disabled, change the value to enable it, the period is in milliseconds
// You can remove onRegisteredSW callback and registerPeriodicSync function
const period = 0

const swActivated = ref(false)
/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 * @param {string} swUrl
 * @param {ServiceWorkerRegistration} r
 */
function registerPeriodicSync(swUrl, r) {
  if (period <= 0) return

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine)
      return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      },
    })

    if (resp?.status === 200)
      await r.update()
  }, period)
}

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {

    if (period <= 0) return
    if (r?.active?.state === 'activated') {
      swActivated.value = true
      registerPeriodicSync(swUrl, r)
    } else if (r?.installing) {
      r.installing.addEventListener('statechange', (e) => {
        /** @type {ServiceWorker} */
        const sw = e.target
        swActivated.value = sw.state === 'activated'
        if (swActivated.value)
          registerPeriodicSync(swUrl, r)
      })
    }
  },
})

const title = computed(() => {
  if (offlineReady.value)
    return t('application-ready-work-offline')
  if (needRefresh.value)
    return t('text-new-version-available')
  return ''
})

function close() {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <div
    v-if="offlineReady || needRefresh"
    class=" flex gap-3 items-center fixed bottom-0 right-0 w-full max-w-[calc(100vw-250px)] bg-success-500 text-white z-[9999] py-[7px] px-6"
    :class="{
      'max-w-[calc(100vw-76px)]': navigationStore.sidebarCollapse,
      'max-w-[100vw]': route.name === 'Calendar' || route.name === 'DashboardIndex' || route.name === 'HandbookIndex'
    }"
  >
    <base-iconify :icon="RefreshCircleBoldIcon" class="!w-7 !h-7" />

    <span class="font-semibold mr-2">{{ t(title) }}</span>

    <base-button
      v-if="needRefresh"
      severity="success"
      rounded
      size="small"
      button-class="!bg-[#8ACB6E] shadow-[0px_1px_3px_0px_#00000026] !border-none"
      @click="updateServiceWorker()"
    >
      <template #label>
        <span class="!text-sm">{{ t('renew') }}</span>
      </template>
    </base-button>
<!--    <div class="message">-->
<!--      <span id="toast-message">-->
<!--        {{ title }}-->
<!--      </span>-->
<!--    </div>-->
<!--    <div class="buttons">-->
<!--      <button v-if="needRefresh" type="button" class="reload" @click="updateServiceWorker()">-->
<!--        Обновить-->
<!--      </button>-->
<!--      <button type="button" @click="close">-->
<!--        Закрыть-->
<!--      </button>-->
<!--    </div>-->
  </div>
</template>

<style scoped>
.pwa-toast .message {
  margin-bottom: 8px;
}

.pwa-toast .buttons {
  display: flex;
}

.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}

.pwa-toast button.reload {
  display: block;
}
</style>
