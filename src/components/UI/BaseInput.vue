<script setup>
// Core
import { useModel, useSlots } from 'vue'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
// Macros
const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: "enter-reg-number"
  },
  required: {
    type: Boolean
  },
  inputClass:{
    type: String,
  },
  iconLeft: {
    type: String,
    default: null
  },
  error: {
    type: Object,
    default: () => ({
      $error: false,
      $errors: []
    })
  }
})
// Composable
const modelValue = useModel(props, 'modelValue')
const slots = useSlots()
const { t } = useI18n()
</script>

<template>
  <div class="app-input">
    <base-label :label="props.label" :required="props.required" />

    <div v-if="slots['input-icon-left'] || props.iconLeft" class="asdasdasdasd">
      <slot name="input-icon-left">
        <base-icon :name="props.iconLeft" />
      </slot>
    </div>

    <InputText
      v-model="modelValue"
      type="text"
      size="small"
      :placeholder="t(props.placeholder)"
      :pt="{
        root: {
          class: [
            'w-full rounded-xl bg-greyscale-50 border-greyscale-50 focus:border-primary-500',
            {
              'p-invalid !shadow-none': props.error.$error
            },
            props.inputClass
          ]
        }
      }"
    />

    <slot name="input-icon-right" />

    <div>
      <template v-if="props.error.$errors.length">
        <div class="mt-1"
          v-for="element of props.error.$errors"
          :key="element.$uid"
        >
          <span class="block text-sm font-medium text-red-500">{{ element.$message }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.p-inputtext.p-invalid.p-component {
  border-color: #e24c4c !important;
}
</style>
