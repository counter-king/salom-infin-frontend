<script setup>
// Core
import {ref, useModel} from "vue";
import Editor from 'primevue/editor';

const props = defineProps({
  modelValue: {
    type: String,
  }
})

const modelValue = useModel(props, 'modelValue');
const emit = defineEmits(['update:modelValue'])

</script>

<template>
  <Editor v-model="modelValue" editor-style="height: 320px" />
</template>

<style scoped>

</style>
