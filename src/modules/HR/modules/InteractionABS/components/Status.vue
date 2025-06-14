<script setup>
// core
import { useI18n } from 'vue-i18n'
// enum
import { STATUS_ABS } from '../enums'

const { t } = useI18n()
// props
const props = defineProps({
  status: {
    type: [Object, Number, String],
    default: () => {},
    required: true
  }
})

const statusClass = (status)=> {
  switch(status){
    case STATUS_ABS.SENT:
      return 'bg-greyscale-50 text-greyscale-500'  // Отправлено
    case STATUS_ABS.FAILED:
      return 'bg-critic-50 text-critic-500' // Ошибка
    case STATUS_ABS.CREATE:
      return 'bg-primary-50 text-primary-500' // Создано
    case STATUS_ABS.PROLONG:
      return 'bg-primary-50 text-primary-500' // Пролонгировано
    case STATUS_ABS.CANCEL:
      return 'bg-critic-50 text-critic-500' // Отменено
    default:
      return 'bg-success-50 text-success-500' // Успешно
  }
}


</script>
<template>
  <div 
    class="flex items-center w-fit justify-center py-[6px] px-[8px] rounded-lg text-xs font-medium"
    :class="statusClass(props.status)"
    >
    {{ t(props.status) }}
  </div>
</template>