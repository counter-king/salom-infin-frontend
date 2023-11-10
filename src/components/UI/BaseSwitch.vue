<script setup>
// Core
import { useModel } from 'vue'
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
  required: {
    type: Boolean
  },
  classBody: {
    type: String,
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
</script>

<template>
  <div class="app-input">

    <div :class="props.classBody">
      <base-label :label="props.label" :class="props.classLabel" :required="props.required" />
      <InputSwitch
        v-model="modelValue"
        :name="name"
        :pt="{
          root: {
            class: ['mr-4']
          },
          slider: ({ props }) => ({
            class: props.modelValue ? 'bg-green-500' : 'bg-greyscale-100',
          }),
        }"
      />
    </div>

    <div class="mt-1">
      <template v-if="props.error.$errors.length">
        <div
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
