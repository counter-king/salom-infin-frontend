<script setup>
// core
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
// props
const props = defineProps({
  status: {
    type: [Object, Number],
    default: () => {},
    required: true
  }
})

const statusClass = (id)=> {
  switch(id){
    case 1:
      return 'bg-critic-50 text-red-500'  // Ошибка
    case 2:
      return 'bg-success-50 text-success-500' // Успешно
    default:
      return 'bg-success-50 text-success-500' // Успешно
  }
}

const getText = (id)=> {
  switch(id){
    case 1:
      return t('error')
    case 2:
      return t('success')
    default:
      return t('success')
  }
}
</script>
<template>
  <div 
    class="flex items-center w-fit justify-center py-[6px] px-[8px] rounded-lg text-xs font-medium"
    :class="statusClass(props.status.id)"
    >
    {{ getText(props.status.id) }}
  </div>
</template>