<script setup>
// Core
import { useModel } from 'vue'
import { useI18n } from 'vue-i18n'
import RadioButton from 'primevue/radiobutton';
// Macros
const props = defineProps({
  modelValue: {
    type: [String, Array],
  },
  name: {
    type: [Boolean, Number, String]
  },
  value: {
    type: [Boolean, Number, String]
  },
  inputId: {
    type: [String]
  },
  label: {
    type: String,
    default: null
  },
})
const emit = defineEmits(['update:modelValue', 'emit:update:modelValue'])
// Composable
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
</script>

<template>
  <div class="app-radio flex gap-3 items-center select-none">
    <RadioButton
      v-model="modelValue"
      :inputId="props.inputId"
      :name="props.name"
      :value="props.value"
      @update:modelValue="(value) => emit('emit:update:modelValue', value)"
      :pt="{
          root: { class: ['rounded-xl w-5 h-5'] },
          input: { class: ['w-5 h-5 min-w-[20px] min-h-[20px] border-greyscale-200 bg-greyscale-50 !shadow-none'] },
          icon: { class: ['w-[10px] h-[10px] bg-greyscale-50'] }
      }"  
    />
    <label :for="props.inputId" class=" font-medium text-[15px] text-greyscale-900 cursor-pointer"> {{ t(props.label) }} </label>
  </div>
</template>

<style>
.p-radiobutton .p-radiobutton-box.p-highlight {
  border-color: #635AFF !important;
  background: #FFFFFF !important;
}

.p-radiobutton-icon {
  background: #635AFF !important;
}
</style>
