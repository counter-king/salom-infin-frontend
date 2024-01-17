<script setup>
// Core
import {onMounted, ref, useModel, watch} from 'vue'
import BaseEditor from "@/components/UI/BaseEditor.vue";
// Macros
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  label: {
    type: String,
    default: 'delete-resolutions'
  },
  headerClasses: {
    type: String,
  },
  contentClasses: {
    type: String,
    default: 'py-6 px-8'
  },
  createButtonColor: {
    type: String,
    default: 'primary'
  },
  createButtonFn: {
    type: Function,
    default: () => void 0
  },
  headerText: {
    type: String,
    default: null
  },
  editor: {
    type: Boolean,
    default: false
  },
  maxWidth: {
    type: String,
    default: 'max-w-[610px]'
  },
  editorValue: {
    type: String,
    default: ""
  }
})
const emit = defineEmits(['update:modelValue'])
// Composable
const modelValue = useModel(props, 'modelValue')
// Reactive
const text = ref(null)
const loading = ref(false)
// Methods
const create = async () => {
  if(!(text.value && text.value.trim())) return

  try {
    loading.value = true
    await props.createButtonFn(text.value)
    text.value = null
    emit('update:modelValue', false)
  }
  finally {
    loading.value = false
  }
}

watch(modelValue, newVal => {
  if (newVal === true && props.editor && props.editorValue){
    text.value = props.editorValue;
  }
})
</script>

<template>
  <base-dialog
    v-model="modelValue"
    v-bind="props"
    :label="props.headerText ? props.headerText : props.label"
    :max-width="props.maxWidth"
    :draggable="false"
  >
    <template #content>
      <base-froala-editor
        v-if="props.editor"
        v-model="text"
      />
      <base-textarea
        v-else
        v-model="text"
        label="enter-content"
      />
    </template>

    <template #footer>
      <base-button
        :severity="props.createButtonColor"
        :loading="loading"
        :label="props.label"
        rounded
        @click="create"
      />
    </template>
  </base-dialog>
</template>
