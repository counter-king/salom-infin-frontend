<script setup>
// Core
import {useModel} from 'vue'
import InputSwitch from 'primevue/inputswitch';
// Macros
const props = defineProps({
  modelValue: {
    type: [Array, Boolean],
  },
  name: {
    type: [Number, String]
  },
  label: {
    type: String,
    default: null
  },
  classLabel: {
    type: String,
    default: null
  },
  classSwitchRoot: {
    type: String,
    default: 'mr-4'
  },
  classSwitchSlider: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean
  },
  classBody: {
    type: String,
  },
  size: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['x-small', 'small', 'normal', 'large'].includes(value)
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: Object,
    default: () => ({
      $error: false,
      $errors: []
    })
  }
})
const emit = defineEmits(['update:modelValue', 'emit:change'])
// Composable
const modelValue = useModel(props, 'modelValue')
</script>

<template>
  <div class="app-switch">

    <div :class="props.classBody">
      <base-label :label="props.label" :class="props.classLabel" :required="props.required"/>

      <InputSwitch
        v-model="modelValue"
        :name="name"
        :disabled="props.disabled"
        :pt="{
          root: {
            class: [
              props.classSwitchRoot,
              props.size === 'small' ? 'h-5 w-8' : 'h-6 w-10'
             ]
          },
          slider: ({ context }) => ({
            class: [
              props.modelValue ? 'bg-green-500' : 'bg-greyscale-100',
              props.classSwitchSlider,
              { 'before:h-4 before:w-4 before:-mt-2' : props.size === 'small' },
              { 'before:translate-x-2' : props.size === 'small' && props.modelValue },
              { 'before:translate-x-4' : props.size === 'normal' && props.modelValue },
              props.size === 'small' && props.modelValue ? 'before:left-[6px]' : 'before:left-[1px]'
              ]
          })
        }"
        @change="emit('emit:change')"
      />
    </div>

    <template v-if="props.error.$errors.length">
      <div class="space-y-1 mt-1">
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
