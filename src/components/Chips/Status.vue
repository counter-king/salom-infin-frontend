<script setup>
// Core
import { computed } from 'vue'
// Store
import { useCommonStore } from '@/stores/common'
// Utils
import { STATUS_TYPES } from '@/enums'
// Composable
const commonStore = useCommonStore()
// Macros
const props = defineProps({
  status: {
    type: Object,
    default: () => {},
    required: true
  },
  border: {
    type: Boolean
  },
  circle: {
    type: Boolean
  },
  rootClass: {
    type: String
  },
  type: {
    type: String,
    default: 'registration',
    validator(value) {
      return ['registration', 'compose'].includes(value)
    }
  }
})
// Computed
const statement = computed(() => {
  if (props.type === 'compose') {
    switch (props.status?.id) {
      case 3:                                                               // Для регистрации
        return "bg-primary-50 text-primary-500 border-primary-500"
      case 2:                                                               // Черновик
      case 1:                                                               // В ожидании
        return "bg-warning-50 text-warning-500 border-warning-500"
      case 5:                                                               // Одобренный
        return "bg-success-50 text-success-500 border-success-500"
      default:                                                              // Отклоненный
        return "bg-critic-50 text-critic-500 border-critic-500"
    }
  }else {
    switch (props.status?.id) {
      case STATUS_TYPES.TODO:                                               // TO DO
        return "bg-primary-50 text-primary-500 border-primary-500"
      case STATUS_TYPES.IN_PROGRESS:                                        // IN_PROGRESS
      case STATUS_TYPES.ON_HOLD:                                            // ON_HOLD
      case STATUS_TYPES.FOR_SIGNATURE:                                      // FOR_SIGNATURE
      case STATUS_TYPES.ON_REVIEW:                                          // ON_REVIEW
        return "bg-warning-50 text-warning-500 border-warning-500"
      case STATUS_TYPES.DONE:                                               // DONE
        return "bg-success-50 text-success-500 border-success-500"
      default:                                                              // CANCEL
        return "bg-critic-50 text-critic-500 border-critic-500"
    }
  }
})
const name = computed(() => {
  const active = props.type === 'compose' ?
    commonStore.composeStatusList.find(status => status.id === props.status?.id) :
    commonStore.statusList.find(status => status.id === props.status?.id)

  if(!active) {
    return 'Не известный статус'
  }

  return props.status.name
})

</script>

<template>
  <span
    class="px-2 py-1 text-xs font-semibold rounded-lg"
    :class="[
      statement,
      {
        'border': props.border,
        'rounded-[80px]': props.circle
      },
      props.rootClass
    ]"
  >
    <slot>
      {{ name }}
    </slot>
  </span>
</template>

<style scoped>

</style>
