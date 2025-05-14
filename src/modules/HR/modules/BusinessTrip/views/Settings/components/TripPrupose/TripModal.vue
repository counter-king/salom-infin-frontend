<script setup>
// core
import { useI18n } from 'vue-i18n'
import { onMounted, reactive, useModel, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// components
import BaseDialog from '@/components/UI/BaseDialog.vue'
import Form from './Form.vue'
// services
import { fetchGetTagById, fetchUpdateTagById, fetchCreateTag } from '@/modules/HR/modules/BusinessTrip/services'
// stores
import { useSettingsStore } from '@/modules/HR/modules/BusinessTrip/stores/settings.store'

const { t } = useI18n() 
const settingsStore = useSettingsStore()
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
  document_sub_type: null,
  name: null,
})
const isLoading = ref(false)

// form rules
const rules = {
  name: { required: helpers.withMessage(`Поле не должен быть пустым`, required)},
  document_sub_type: { required: helpers.withMessage(`Поле не должен быть пустым`, required)},
}
// validattor
const $v = useVuelidate(rules, formValue)

const submitForm = async () => {
  const isValid = await $v.value.$validate()
  if(!isValid) return
  if(props.id){
    isLoading.value = true
    try {
      await fetchUpdateTagById(props.id, formValue)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  } else {
    isLoading.value = true
    try {
      await fetchCreateTag(formValue)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }
  settingsStore.actionGetTripPurposeList()
  emit('update:modelValue', false)
}
const onCloseModal = () => {
  modelValue.value = false
}

onMounted(async () => {
  if(props.id){
    isLoading.value = true
    try {
      const { data } = await fetchGetTagById(props.id)
      formValue.name = data.name
      formValue.document_sub_type = data.document_sub_type.id
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
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
      <div v-if="isLoading" class="flex h-[120px] items-center justify-center">
        <base-spinner/>
      </div>
      <template v-else>
        <Form v-model:formValue="formValue" v-model:validator="$v" formId="trip-purpose-form" />
      </template>
    </template>
    <template #footer>
      <div>
        <base-button
          @click="onCloseModal"
          label="cancel"
          button-class="!py-[14px] !px-8 !rounded-[120px]"
          border-color="border-transparent"
          shadow
          :disabled="isLoading"
          outlined
        />
        <base-button
          type="submit"
          :loading="isLoading"
          form="trip-purpose-form"
          :label="props.id ? 'update' : 'add'"
          button-class="!py-[14px] !px-8 !rounded-[120px]"
          @click="submitForm"
        />
      </div>
    </template>
  </BaseDialog>
</template>