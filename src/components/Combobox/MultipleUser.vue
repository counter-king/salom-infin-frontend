<script setup>
// Macros
import BaseIcon from "@/components/UI/BaseIcon.vue";

const props = defineProps({
  border: {
    type: Boolean
  },
  optionLabel: {
    type: String,
    default: 'name'
  },
  placeholder: {
    type: String,
    default: 'create'
  },
  borderColor: {
    type: String
  },
  display: {
    type: String,
    default: 'comma',
    validator(value) {
      return ['comma', 'chip'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['x-small', 'small', 'normal', 'large'].includes(value)
    }
  },
})
</script>

<template>
  <base-multi-select
    v-bind="props"
    :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
  >
    <template #chip="{ value }">
      <div>
        {{ value.name }}
      </div>
    </template>

    <template #removetokenicon="{ click }">
      <base-icon name="XIcon" width="16" height="16" class="ml-[6px] hover:text-critic-500" />
    </template>
  </base-multi-select>
</template>

<style scoped>
</style>
