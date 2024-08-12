<script setup>
// Core
import { useModel, useSlots } from 'vue'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
import { vMaska } from 'maska'
// Macros
const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
  maskRule: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
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
  iconLeftClass:{
    type: String,
    default: null
  },
  iconRight: {
    type: String,
    default: null
  },
  iconRightClass:{
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

    <slot
      v-if="slots['input-icon-left'] || props.iconLeft"
      name="input-icon-left"
    >
      <base-iconify
        :icon="props.iconLeft"
        :class="props.iconLeftClass"
        class="!w-5 !h-5 -mt-[11px]"
      />
    </slot>

    <InputText
      v-model="modelValue"
      :disabled="props.disabled"
      :data-maska="props.maskRule"
      :placeholder="t(props.placeholder)"
      v-maska
      type="text"
      size="small"
      :pt="{
        root: {
          class: [
            'w-full text-greyscale-900 font-medium rounded-xl bg-greyscale-50 border-greyscale-50 focus:border-primary-500 placeholder:text-sm placeholder:font-regular placeholder:text-greyscale-400',
            {
              'p-invalid !shadow-none': props.error.$error
            },
            props.inputClass
          ]
        }
      }"
    />

    <slot
      v-if="slots['input-icon-right'] || props.iconRight"
      name="input-icon-right"
      class="!w-5 !h-5"
    >
      <base-iconify
        :icon="props.iconRight"
        :class="props.iconRightClass"
      />
    </slot>

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
</style>
