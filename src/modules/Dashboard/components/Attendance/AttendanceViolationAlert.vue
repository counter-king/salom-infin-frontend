<script setup>
// core
import { useI18n } from 'vue-i18n'
// utils
import { formatDate } from '@/utils/formatDate'
import { computed } from 'vue'
// enums
import { KIND } from '@/modules/HR/modules/MyActivities/enums'
import { formatLateTime } from '@/utils'

// composables
const { t, locale } = useI18n()

// props
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// computed
// Minutlar (agar mavjud bo'lsa)
const minutes = computed(() => {
  if (props.data.kind === KIND.LATE) return props.data.late_minutes || 0
  if (props.data.kind === KIND.EARLY_LEAVE) return props.data.early_leave_minutes || 0
  return 0
})

// Soat ko'rsatish kerakmi?
const shouldShowMinutes = computed(() => {
  return [KIND.LATE, KIND.EARLY_LEAVE].includes(props.data.kind) && minutes.value > 0
})

// Xabar matni (daqiqasiz)
const messageText = computed(() => {
  const messages = {
    [KIND.LATE]: t('late'),
    [KIND.EARLY_LEAVE]: t('early-leave'),
    [KIND.ABSENT]: t('absent'),
    [KIND.MISSED_CHECKOUT]: t('missed-checkout'),
    [KIND.MISSED_CHECKIN]: t('missed-checkin')
  }
  return messages[props.data.kind] || ''
})

const expectionsRedTextColor = computed(() => {
  return [KIND.MISSED_CHECKOUT, KIND.MISSED_CHECKIN, KIND.ABSENT].includes(props.data.kind)
})
// Daqiqa matni
const minutesText = computed(() => {
  if (shouldShowMinutes.value) {
    return `${formatLateTime(minutes.value, locale.value, true)}`
  }
  return ''
})

</script>

<template>
  <div class="flex gap-x-3 items-center px-4 py-2 rounded-xl bg-warning-30 border border-warning-100">
    <img src="/images/dashboard/alarm-clock.svg" alt="alarm" class="w-8 h-8">
    <div class="text-sm text-greyscale-500 font-medium flex">
      <span class="text-primary-900">{{ formatDate(props.data?.date) }}</span>
      <span class="mx-1">{{ t('on-date') }}</span>
      
      <span v-if="shouldShowMinutes" class="text-critic-500">{{ minutesText }}</span>
     
      <span class="ml-1" :class="{
        '!text-critic-500': expectionsRedTextColor
      }">{{ messageText }}</span>
    </div>
  </div>
</template>