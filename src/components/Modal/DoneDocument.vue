<script setup>
// Core
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Utils
import { dispatchNotify } from '@/utils/notify'
// Macros
const props = defineProps({
  content: {
    type: Object,
    default: () => {}
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
// Non-reactive
const rules = {
  content: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}
// Composable
const $v = useVuelidate(rules, props.content)
// Computed
const content = computed({
  get() {
    return props.content
  },
  set(value) {
    emit('update:content', value.content)
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
      null,
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
  const valid = await $v.value.$validate()

  if(!valid) {
    return
  }

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
        v-model="$v.content.$model"
        :error="$v.content"
        label="enter-content"
        class="mb-4"
      />

      <base-file-upload
        :files="files"
        label="attach-file"
        @emit:file-upload="(_files) => files = _files"
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
