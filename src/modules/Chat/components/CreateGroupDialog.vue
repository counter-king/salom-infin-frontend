<script setup>
// core 
import { useModel } from 'vue';
// components
import BaseDialog from '@/components/UI/BaseDialog.vue';

const props = defineProps({
 modelValue: {
  type: Boolean,
 },
});

const modelValue = useModel(props, 'modelValue');
</script>
<template>
  <base-dialog
    v-model="modelValue"
    label="create-groups"
    max-width="max-w-[608px]"
  >
    <template #content>
      <slot />
    </template>
  </base-dialog>
</template>