<script setup>
// core
import { useI18n } from 'vue-i18n'
import { onMounted, reactive, useModel } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// components
import BaseDialog from '@/components/UI/BaseDialog.vue'
import Form from './Form.vue'

const { t } = useI18n()
// props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false
  },
  label: {
    type: String,
    default: 'country'
  },
  maxWidth : {
    type: String,
    default: 'max-w-[544px]'
  }
})
//  composables
const modelValue = useModel(props, 'modelValue')

// emit
const emit = defineEmits(['update:modelValue'])

// reactives
const formValue = reactive({
  name: {
    uz: null,
    ru: null,
    en: null
  },
  status : false
})

// form rules
const rules = {
  name: {
    uz: {
      required: helpers.withMessage(`Поле не должен быть пустым`, required)
    },
    ru: {
      required: helpers.withMessage(`Поле не должен быть пустым`, required)
    },
    en: {
      required: helpers.withMessage(`Поле не должен быть пустым`, required)
    }
  },
  status: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}
// validattor
const $v = useVuelidate(rules, formValue)

const submitForm = async () => {
  const isValid = await $v.value.$validate()
  console.log("isValid", isValid)
  if(!isValid) return
  console.log(formValue)
  emit('update:modelValue', false)
}
const onCloseModal = () => {
  modelValue.value = false
}

onMounted(() => {
  console.log("mounted")
})

</script>
<template>
  <BaseDialog
    v-model="modelValue"
    :label="t(props.label)"
    :max-width="props.maxWidth"
    content-classes="p-6 pb-14"
  >
    <template #content>
        <Form v-model:formValue="formValue" v-model:validator="$v" formId="country-form" />
    </template>
    <template #footer>
      <div>
        <base-button
          @click="onCloseModal"
          label="cancel"
          button-class="!py-[14px] !px-8 !rounded-[120px]"
          border-color="border-transparent"
          shadow
          outlined
        />
        <base-button
          type="submit"
          form="country-form"
          label="add"
          button-class="!py-[14px] !px-8 !rounded-[120px]"
          @click="submitForm"
        />
      </div>
    </template>
  </BaseDialog>
</template>