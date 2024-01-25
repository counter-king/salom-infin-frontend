<script setup>
// Core
import { computed } from 'vue'
// Enums
import { FILE_ACTIONS } from '@/enums'
// Macros
const props = defineProps({
  type: {
    type: Object,
    default: () => {}
  }
})
// Computed
const current = computed(() => {
  const active = Object.values(FILE_ACTIONS).find(type => type === props.type.action)

  if(!active) {
    return {
      icon: 'QuestionIcon',
      color: 'bg-critic-500',
      text: 'Не известный статус'
    }
  }

  return {
    icon: 'XIcon',
    color: props.type.description?.color,
    text: props.type.description?.description
  }

  /*switch(props.type.action) {
    case FILE_ACTIONS.CREATED: // Файл создан
      return {
        icon: 'DownloadMinimalistic',
        color: 'bg-primary-500',
        text: props.type.description?.description
      }
    case FILE_ACTIONS.UPDATED: // Файл изменен
      return {
        icon: 'DownloadMinimalistic',
        color: 'bg-warning-500',
        text: props.type.description?.description
      }
    case FILE_ACTIONS.UPLOADED: // Файл загружен
      return {
        icon: 'DownloadMinimalistic',
        color: 'bg-warning-500',
        text: props.type.description?.description
      }
    case FILE_ACTIONS.DELETED: // Файл удален
      return {
        icon: 'XIcon',
        color: 'bg-critic-500',
        text: props.type.description?.description
      }
    case FILE_ACTIONS.FORWARD: // Документ перенаправлен
      return {
        icon: 'ForwardIcon',
        color: 'bg-primary-500',
        text: props.type.description?.description
      }
    default: // Пользователь выполнил
      return {
        icon: 'UserIcon',
        color: 'bg-success-500',
        text: props.type.description?.description
      }
  }*/
})
</script>

<template>
  <div
    class="action-chip-view flex items-center justify-center w-[22px] h-[22px] rounded-full border-2 border-white absolute -right-2 -bottom-1"
    :style="{ background: current.color }"
    v-tooltip.right="{
      value: `<h4 class='text-xs text-white -my-1'>${ current.text }</h4>`,
      escape: true,
      autoHide: false
    }"
  >
    <base-icon
      :name="current.icon"
      width="12"
      height="12"
      color="#fff"
    />
  </div>
</template>
