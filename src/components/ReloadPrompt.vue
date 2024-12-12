<script setup>
// Core
import { ref, watch } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
// Components
import { RefreshCircleBoldIcon, ChevronDown20SolidIcon, ChevronUp20SolidIcon } from '@/components/Icons'
// Composable
const route = useRoute()
const { t } = useI18n()
// Reactive
const isMinimized = ref(false)
// Watch
watch(() => route.fullPath, () => isMinimized.value = false)
// Methods
const minimize = () => {
  isMinimized.value = !isMinimized.value
}

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

const { needRefresh, updateServiceWorker } = useRegisterSW({
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
</script>

<template>
  <div
    v-if="needRefresh"
    class="flex items-center justify-center fixed bottom-0 right-0 w-full transition-all duration-500 delay-500 max-w-[100vw] h-[156px] bg-greyscale-50 border-t border-t-greyscale-200 z-[99] p-3"
    :class="{
      '!h-16': isMinimized
    }"
  >
    <div
      class="flex items-center gap-5 max-w-[1000px] w-full transition-all duration-500 delay-500"
      :class="{ '!gap-4': isMinimized }"
    >
      <div
        class="flex items-center justify-center w-14 h-14 bg-success-500 rounded-full transition-all duration-500 delay-500"
        :class="{ '!w-10 !h-10': isMinimized }"
      >
        <base-iconify
          :icon="RefreshCircleBoldIcon"
          class="transition-all duration-500 delay-500 text-white"
          :class="{ '!w-8 !h-8': !isMinimized }"
        />
      </div>

      <div class="flex-1">
        <h1
          class="text-xl font-semibold text-greyscale-900 transition-all duration-500 delay-500"
          :class="{ '!text-base -mb-1': isMinimized }"
        >
          {{ t('text-new-version-available') }}
        </h1>

        <span
          class="text-sm text-greyscale-500 transition-all duration-500 delay-500"
          :class="{ '!text-[13px]': isMinimized }"
        >
          {{ t('text-new-version-available-sub') }}
        </span>
      </div>

      <base-button
        v-if="needRefresh"
        rounded
        :size="isMinimized ? 'small' : 'large'"
        @click="updateServiceWorker()"
      >
        <template #label>
          <span class="!text-sm">{{ t('renew') }}</span>
        </template>
      </base-button>
    </div>

    <div
      class="group flex items-center justify-center w-6 h-6 bg-white hover:bg-primary-500 rounded-[6px] absolute top-5 right-5 cursor-pointer"
      v-tooltip.left="{
        value: `<h4 class='text-xs text-white -my-1'>${ isMinimized ? t('expand') : t('collapse') }</h4>`,
        escape: true,
        autoHide: false
      }"
      @click="minimize"
    >
      <base-iconify
        :icon="isMinimized ? ChevronUp20SolidIcon : ChevronDown20SolidIcon"
        class="group-hover:text-white text-primary-500"
      />
    </div>
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
