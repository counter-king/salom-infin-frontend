<script setup>
// Core
import { useModel } from "vue"
import { useI18n } from "vue-i18n"

// Props
const props = defineProps({
  modelValue: {
    type: [Boolean, Number, String],
  },
  label: {
    type: String,
    default: "",
  },
  binary: {
    type: Boolean,
    default: false,
  }
})

const modelValue = useModel(props, 'modelValue')
const {t} = useI18n()

const emit = defineEmits(['update:modelValue', 'emit:update:modelValue'])

const toggleCheckbox = () => {
  const newValue = !modelValue.value
  modelValue.value = newValue
  emit('emit:update:modelValue', newValue)
}
</script>

<template>
  <div class="flex gap-x-1 items-center">
    <Checkbox
      v-model="modelValue"
      :binary="binary"
      :pt="{
        root: { class: 'flex items-center' },
        input: { class: 'w-5 h-5 rounded-[6px]' }
      }"
      @update:modelValue="(value) => emit('emit:update:modelValue', value)"
    />

    <div
      class="flex-1 text-sm font-medium text-greyscale-900 cursor-pointer select-none"
      @click="toggleCheckbox"
    >
      {{ t(label) }}
    </div>
  </div>
</template>
