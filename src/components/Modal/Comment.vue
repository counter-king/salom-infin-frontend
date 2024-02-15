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
const text = ref(null)
// Methods
const create = async () => {
  if(!(text.value && text.value.trim())) return

  try {
    await props.createButtonFn(text.value)
    text.value = null
    emit('update:modelValue', false)
  }
  finally {

  }
}

watch(modelValue, newVal => {
  if (newVal === true && props.editorType === 'editor' && props.editorValue){
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
        v-if="props.editorType === 'editor'"
        v-model="text"
      />

	    <div
		    v-else-if="props.editorType === 'comment'"
		    class="flex bg-greyscale-50 p-2 rounded-lg h-[200px] overflow-y-auto text-sm"
	    >
		   <span v-html="props.editorValue" />
	    </div>

      <base-textarea
        v-else
        v-model="text"
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
