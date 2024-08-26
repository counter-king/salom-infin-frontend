<script setup>
// Core
import { useModel, computed } from 'vue'
// Macros
const props = defineProps({
  modelValue: {
    type: [String, Number, Array, Object]
  },
  options: {
    type: Array,
    default: () => []
  },
  apiUrl: {
		type: String,
		default: null
	},
  apiParams: {
		type: Object,
		default: () => ({
      page_size: 100
    })
	},
})
const emit = defineEmits(['update:options'])
// Composable
const modelValue = useModel(props, 'modelValue')
// Coomputed
const options = computed({
	get() {
		return props.options
	},
	set(value) {
		emit('update:options', value)
	}
})
</script>

<template>
  <div class="answer-menu-view">
    <base-dropdown
      v-model="modelValue"
      v-model:options="options"
      :api-url="props.apiUrl"
      :api-params="props.apiParams"
      searchable
      option-label="name_ru"
      option-value="id"
      root-class="bg-white !rounded-[80px] shadow-button !h-10"
      input-class="leading-[14px] !py-3 !pl-4"
      wrapper-class="!max-h-[240px]"
      item-class="!py-[10px]"
    >
    </base-dropdown>
  </div>
</template>
