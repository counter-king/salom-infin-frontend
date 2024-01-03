<script setup>
// Core
import { ref, computed } from 'vue'
// Utils
import { dispatchNotify } from '@/utils/notify'
// Macros
const props = defineProps({
  content: {
    type: String,
    default: null
  },
  files: {
    type: Array,
    default: () => []
  },
  hasResolution: {
    type: Boolean
  },
  isDocumentSigned: {
    type: Boolean
  },
  isDoneDocument: {
    type: Boolean
  },
  createButtonFn: {
    type: Function,
    default: () => void 0
  }
})
const emit = defineEmits(['update:content', 'update:files'])
// Reactive
const modal = ref(false)
const loading = ref(false)
// Computed
const content = computed({
  get() {
    return props.content
  },
  set(value) {
    emit('update:content', value)
  }
})
const files = computed({
  get() {
    return props.files
  },
  set(value) {
    emit('update:files', value)
  }
})
// Methods
const openModal = () => {
  if(!props.hasResolution || !props.isDocumentSigned) {
    dispatchNotify(
      'Предупреждения',
      !props.hasResolution
        ? 'Сначала создайте резолюцию'
        : 'Сначала подпишите резолюцию',
      'warn'
    )
  }
  else {
    modal.value = true
  }
}
const create = async () => {
  if(!(content.value && content.value.trim())) return

  try {
    loading.value = true
    await props.createButtonFn()
    modal.value = false
    // Если идет выполнения документа
    if(!props.createButtonFn) {
      content.value = null
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="done-document-view">
    <base-button
      :severity="props.isDoneDocument ? 'warning' : 'primary'"
      :label="props.isDoneDocument ? 'change-performances' : 'execute-document'"
      rounded
      type="button"
      @click="openModal"
    />
  </div>

  <base-dialog
    v-model="modal"
    :label="props.isDoneDocument ? 'change-performances' : 'execute-document'"
    max-width="max-w-[610px]"
  >
    <template #content>
      <base-textarea
        v-model="content"
        label="enter-content"
      />
    </template>

    <template #footer>
      <base-button
        :severity="props.isDoneDocument ? 'warning' : 'primary'"
        :loading="loading"
        :label="props.isDoneDocument ? 'change-performances' : 'execute-document'"
        rounded
        @click="create"
      />
    </template>
  </base-dialog>
</template>
