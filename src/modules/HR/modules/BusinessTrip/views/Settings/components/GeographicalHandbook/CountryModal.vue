<script setup>
// core
import { useI18n } from 'vue-i18n'
import { onMounted, reactive, useModel, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// components
import BaseDialog from '@/components/UI/BaseDialog.vue'
import CountryForm from './CountryForm.vue'
// services
import { fetchCreateCountry, fetchUpdateCountryById, fetchGetCountryById } from '../../../../services'
// stores
import { useSettingsStore } from '@/modules/HR/modules/BusinessTrip/stores/settings.store'

const settingsStore = useSettingsStore()
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

// emit
const emit = defineEmits(['update:modelValue'])
//  composables
const modelValue = useModel(props, 'modelValue')

// reactives
const formValue = reactive({
  name: null,
  status : true
})
const isGetCountryLoading = ref(false)
const isSubmitLoading = ref(false)
// form rules
const rules = {
  name: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  status: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}
// validattor
const $v = useVuelidate(rules, formValue)

const submitForm = async () => {
  const isValid = await $v.value.$validate()
  if(!isValid) return

  try {
    isSubmitLoading.value = true
    if(props.id){
      await fetchUpdateCountryById(props.id, {...formValue, status: formValue.status ? "A" : "P"})
    } else{
      await fetchCreateCountry({...formValue, status: formValue.status ? "A" : "P"})
    }
    emit('update:modelValue', false)
    settingsStore.actionGetCountryList()
  } catch (err) {
    console.log(err)
  } finally {
    isSubmitLoading.value = false
  }
}
const onCloseModal = () => {
  modelValue.value = false
}

onMounted(async () => {

  if(props.id){
    isGetCountryLoading.value = true
   try{
     const { data } =  await fetchGetCountryById(props.id)
     formValue.name = data.name
     formValue.status = data.status == "A" ? true : false
   } catch(err){
    console.log(err)
   } finally{
    isGetCountryLoading.value = false
   }
  }
})

</script>
<template>
  <base-dialog
    v-model="modelValue"
    :label="t(props.label)"
    :max-width="props.maxWidth"
    content-classes="p-6 pb-14"
  >
    <template #content>
        <div v-if="isGetCountryLoading" class="flex h-[120px] items-center justify-center">
          <base-spinner/>
        </div>
        <template v-else>
          <CountryForm v-model:formValue="formValue" v-model:validator="$v" formId="country-form" />
        </template>
    </template>
    <template #footer>
      <div>
        <base-button
          :disabled="isSubmitLoading"
          @click="onCloseModal"
          label="cancel"
          button-class="!py-[14px] !px-8 !rounded-[120px]"
          border-color="border-transparent"
          shadow
          outlined
        />
        <base-button
          :loading="isSubmitLoading"
          type="submit"
          form="country-form"
          :label="props.id ? 'edit' : 'add'"
          button-class="!py-[14px] !px-8 !rounded-[120px]"
          @click="submitForm"
        />
      </div>
    </template>
  </base-dialog>
</template>
