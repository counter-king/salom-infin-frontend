<script setup>
// Core
import { useModel } from 'vue'
import { useI18n } from 'vue-i18n'
import RadioButton from 'primevue/radiobutton';
// Macros
const props = defineProps({
  modelValue: {
    type: Array,
  },
  name: {
    type: [Number, String]
  },
  value: {
    type: [Number, String]
  },
  inputId: {
    type: [Number, String]
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
        :pt="{
          root: {
            class: ['mr-2 text-sm/[3px] rounded-full', props.bgRadio]
          },
          input: {
            class: ['border-none', props.bgRadio]
          },
          icon: {
            class: ['text-white my_icon pt-0.5 pl-0.5 pi pi-check', props.iconRadio, props.bgRadio]
          }
        }"
      />

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
.my_icon::before{
  font-size: 8px !important;
  display: block;
}

</style>
