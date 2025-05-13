<script setup>
// core
import { useI18n } from 'vue-i18n'
import { onMounted, reactive, useModel } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// components
import BaseDialog from '@/components/UI/BaseDialog.vue'
import Form from './Form.vue'
// services
import { fetchGetTagById, fetchUpdateTagById, fetchCreateTag } from '@/modules/HR/modules/BusinessTrip/services'
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
  },
  id: {
    type: Number,
    default: null
  }
})
//  composables
const modelValue = useModel(props, 'modelValue')

// emit
const emit = defineEmits(['update:modelValue'])

// reactives
const formValue = reactive({
  doc_sub_type: null,
  name: null,
})

// form rules
const rules = {
  name: { required: helpers.withMessage(`Поле не должен быть пустым`, required)},
  doc_sub_type: { required: helpers.withMessage(`Поле не должен быть пустым`, required)},
}
// validattor
const $v = useVuelidate(rules, formValue)

const submitForm = async () => {
  const isValid = await $v.value.$validate()
  if(!isValid) return
  if(props.id){
    await fetchUpdateTagById(props.id, formValue)
  } else {
    await fetchCreateTag(formValue)
  }
  emit('update:modelValue', false)
}
const onCloseModal = () => {
  modelValue.value = false
}

onMounted(async () => {
  if(props.id){
    const data = await fetchGetTagById(props.id)
    console.log("data", data)
  }
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
        <Form v-model:formValue="formValue" v-model:validator="$v" formId="trip-purpose-form" />
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
          form="trip-purpose-form"
          label="add"
          button-class="!py-[14px] !px-8 !rounded-[120px]"
          @click="submitForm"
        />
      </div>
    </template>
  </BaseDialog>
</template>