<script setup>
// Core
import { ref, useModel, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
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
	editorType: {
		type: String,
		default: "textarea",
		validator(value) {
			return ['textarea', 'editor', 'comment'].includes(value)
		}
	},
  maxWidth: {
    type: String,
    default: 'max-w-[610px]'
  },
  editorValue: {
    type: String,
    default: ""
  },
	footer: {
		type: Boolean,
		default: true
	},
  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])
// Composable
const modelValue = useModel(props, 'modelValue')
// Reactive
const text = ref({
  message: null
})
// Non-reactive
const rules = {
  message: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}
// Composable
const $v = useVuelidate(rules, text)
// Methods
const create = async () => {
  const valid = await $v.value.$validate()

  if(!valid) {
    return
  }

  try {
    await props.createButtonFn(text.value.message)
    text.value.message = null
    emit('update:modelValue', false)
  }
  finally {

  }
}

watch(modelValue, newVal => {
  if (newVal === true && props.editorType === 'editor' && props.editorValue){
    text.value.message = props.editorValue;
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
        v-if="props.editorType === 'editor'"
        v-model="$v.message.$model"
        :error="$v.message"
      />

	    <div
		    v-else-if="props.editorType === 'comment'"
		    class="flex bg-greyscale-50 p-2 rounded-lg h-[200px] overflow-y-auto text-sm"
	    >
		   <span v-html="props.editorValue" />
	    </div>

      <base-textarea
        v-else
        v-model="$v.message.$model"
        :error="$v.message"
        label="enter-content"
      />
    </template>

    <template v-if="props.footer" #footer>
      <base-button
        :severity="props.createButtonColor"
        :loading="props.loading"
        :label="props.label"
        rounded
        @click="create"
      />
    </template>
  </base-dialog>
</template>
