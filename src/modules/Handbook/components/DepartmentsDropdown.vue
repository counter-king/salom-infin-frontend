<script setup>
// Core
import { useModel } from 'vue'
// Macros
const props = defineProps({
  modelValue: {
    type: [String, Number, Array, Object]
  },
  items: {
    type: Array,
    default: () => []
  }
})
// Composable
const modelValue = useModel(props, 'modelValue')
</script>

<template>
  <div class="answer-menu-view">
    <base-dropdown
      v-model="modelValue"
      :options="props.items"
      option-label="name_ru"
      option-value="id"
      root-class="bg-white !rounded-[80px] shadow-button !h-10"
      input-class="leading-[14px] !py-3 !pl-4 "
    >
    </base-dropdown>
  </div>
</template>
