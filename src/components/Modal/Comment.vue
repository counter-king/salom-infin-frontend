<script setup>
// Core
import {ref, unref, useModel, watch} from 'vue'
import { useVuelidate } from '@vuelidate/core'
import {useI18n} from "vue-i18n"
import { helpers, required } from '@vuelidate/validators'
// Components
import {InfoCircleBoldIcon} from "@/components/Icons"
import { FORM_TYPE_READ } from "@/constants/constants";
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
const { t } = useI18n()
// Reactive
const text = ref({
  message: null
})
const menuRef = ref(null)
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

// Methods
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.opRef.toggle(event)
}
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
<!--      <base-froala-editor-->
<!--        v-if="props.editorType === 'editor'"-->
<!--        v-model="$v.message.$model"-->
<!--        :error="$v.message"-->
<!--      />-->

      <base-tiny-editor
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
        :label="props.label"
        rounded
        @click="toggle"
      />

      <base-overlay-panel
        ref="menuRef"
        width="w-60"
        menu-class="bg-white mt-1 overflow-hidden"
      >
        <div class="flex items-center flex-col p-4">
          <base-iconify :icon="InfoCircleBoldIcon" class="text-warning-500 !w-10 !h-10" />
          <div class="text-xs font-semibold text-greyscale-900 text-center mt-2 mb-4">{{ t('all-signs-and-approvals-deleted') }}</div>

          <base-button
            :severity="props.createButtonColor"
            :loading="props.loading"
            label="agree"
            size="small"
            rounded
            @click="create"
          />
        </div>
      </base-overlay-panel>

    </template>
  </base-dialog>
</template>
