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
  bgRadio: {
    type: String,
    default: null
  },
  iconRadio: {
    type: String,
    default: null
  },
  inputRadio: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  },
  required: {
    type: Boolean
  },
  error: {
    type: Object,
    default: () => ({
      $error: false,
      $errors: []
    })
  }
})
const emit = defineEmits(['update:modelValue', 'emit:update:modelValue'])
// Composable
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
</script>

<template>
  <div class="app-radio">
    <base-label :label="props.label" :class="props.classLabel" :required="props.required" />

    <RadioButton
      v-model="modelValue"
      :inputId="props.inputId"
      :name="props.name"
      :value="props.value"
      @update:modelValue="(value) => emit('emit:update:modelValue', value)"
      :pt="{
        root: {
          class: ['flex !w-5 !h-5 rounded-full mr-2',  props.bgRadio]
        },
        input: {
          class: ['bg-greyscale-50 !w-5 !h-5 border-greyscale-200', props.bgRadio]
        },
        icon: {
          // class: ['text-white pt-0.5 pl-0.5 pi pi-check', props.iconRadio, props.bgRadio]
          class: ['!w-[10px] !h-[10px]', props.iconRadio, props.bgRadio]
        }
      }"
    />

    <template v-if="props.error.$errors.length">
      <div class="space-y-1 mt-2">
        <div
          v-for="element of props.error.$errors"
          :key="element.$uid"
        >
          <span class="block text-sm font-medium text-red-500">{{ element.$message }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style>
.p-inputtext.p-invalid.p-component {
  border-color: #e24c4c !important;
}
.my_icon::before{
  font-size: 8px !important;
  display: block;
}

.p-radiobutton .p-radiobutton-box.p-highlight {
  border-color: #6366F1 !important;
  background: #6366F1 !important;
}
</style>
