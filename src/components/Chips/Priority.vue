<script setup>
// Core
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
// Store
import { useCommonStore } from '@/stores/common'
// Utils
import { PRIORITY_TYPES } from '@/enums'
// Composable
const { t } = useI18n()
const commonStore = useCommonStore()
// Macros
const props = defineProps({
  id: {
    type: Number,
  },
  textClass: {
    type: String
  },
  onlyImage: {
    type: Boolean
  }
})
// Computed
const current = computed(() => {
  const active = commonStore.prioryList.find(priority => priority.id === props.id)

  if(!active) {
    return {
      text: '-'
    }
  }

  switch(props.id) {
    case PRIORITY_TYPES.HIGH: // Высокий
      return {
        text: active.name,
        img: '/images/priorities/high.svg'
      }
    case PRIORITY_TYPES.MIDDLE: // Средний
      return {
        text: active.name,
        img: '/images/priorities/medium.svg'
      }
    default: // Низкий
      return {
        text: active.name,
        img: '/images/priorities/low.svg'
      }
  }
})
</script>

<template>
  <div class="flex items-center gap-2">
    <img
      v-if="current.img"
      :src="current.img"
      :alt="current.text"
      class="w-4 h-4"
    />

	  <span v-if="!onlyImage" :class="[textClass]">
	    {{ current.text }}
    </span>
  </div>
</template>

<style scoped>

</style>
