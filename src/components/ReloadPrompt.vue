<script setup>
import { computed, ref } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

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
    return 'Приложение готово к работе офлайн'
  if (needRefresh.value)
    return 'Доступен новый контент, нажмите кнопку перезагрузки, чтобы обновить.'
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
    class="pwa-toast grid fixed right-0 bottom-0 bg-white rounded z-[9999] text-left m-4 p-3"
    aria-labelledby="toast-message"
    role="alert"
  >
    <div class="message">
      <span id="toast-message">
        {{ title }}
      </span>
    </div>
    <div class="buttons">
      <button v-if="needRefresh" type="button" class="reload" @click="updateServiceWorker()">
        Обновить
      </button>
      <button type="button" @click="close">
        Закрыть
      </button>
    </div>
  </div>
</template>

<style scoped>
.pwa-toast {
  border: 1px solid #8885;
  box-shadow: 3px 4px 5px 0 #8885;
}

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
