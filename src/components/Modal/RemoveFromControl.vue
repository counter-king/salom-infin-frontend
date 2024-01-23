<script setup>
// Core
import { ref, computed } from 'vue'
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
  isControlRemoved: {
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
  <div class="remove-from-control-view">
    <base-button
      :severity="props.isControlRemoved ? 'warning' : 'primary'"
      :label="props.isControlRemoved ? 'update-from-control' : 'remove-from-control'"
      rounded
      type="button"
      @click="modal = true"
    />
  </div>

  <base-dialog
    v-model="modal"
    :label="props.isControlRemoved ? 'update-from-control' : 'remove-from-control'"
    max-width="max-w-[610px]"
  >
    <template #content>
      <base-textarea
        v-model="content"
        label="enter-content"
      />

      <base-file-upload
        :files="files"
        label="attach-file"
        @emit:file-upload="(_files) => files = _files"
      />
    </template>

    <template #footer>
      <base-button
        :severity="props.isControlRemoved ? 'warning' : 'primary'"
        :loading="loading"
        :label="props.isControlRemoved ? 'update-from-control' : 'remove-from-control'"
        rounded
        @click="create"
      />
    </template>
  </base-dialog>
</template>
