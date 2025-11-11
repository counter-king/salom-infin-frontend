<script setup>
import { computed } from "vue"
import { useI18n } from "vue-i18n"

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

const statusClasses = computed(() => {
  switch (props.title) {
    case 'in_review':
      return 'bg-warning-50 border-warning-100 text-warning-500'
    case 'approved':
      return 'bg-success-50 border-success-100 text-success-500'
    case 'rejected':
      return 'bg-critic-50 border-critic-100 text-critic-500'
    default:
      return 'bg-greyscale-50 border-greyscale-100 text-greyscale-500'
  }
})

const statusTitle = computed(() => {
  switch (props.title) {
    case 'in_review':
      return 'reviewers'
    case 'approved':
      return 'confirmed'
    case 'rejected':
      return 'rejected'
    case 'frozen':
      return 'frozen'
    default:
      return 'draft'
  }
})

const { t } = useI18n()
</script>

<template>
  <div
    class="px-2 py-1 w-fit rounded-[80px]  border  text-xs font-semibold"
    :class="statusClasses"
  >
    {{ t(statusTitle) }}
  </div>
</template>

<style scoped>

</style>
