<script setup>
// core
import { useI18n } from 'vue-i18n'
import { onMounted, reactive, useModel, ref, inject } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// components
import BaseDialog from '@/components/UI/BaseDialog.vue'
import CityForm from './CityForm.vue'
// services
import { fetchCreateRegion, fetchUpdateRegionById, fetchGetRegionById } from '../../../../services'
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
//  composables
const modelValue = useModel(props, 'modelValue')
// emit
const emit = defineEmits(['update:modelValue'])
// inject
const activeSelectedCountry = inject('activeSelectedCountry')
// reactives
const formValue = reactive({
  name: null,
  status : true,
  country: activeSelectedCountry.value
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
  },
  country: {
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
      await fetchUpdateRegionById(props.id, {name: formValue.name, is_active: formValue.status, country: formValue.country.id })
    } else{
      await fetchCreateRegion({name: formValue.name, is_active: formValue.status, country: formValue.country.id })
    }
    emit('update:modelValue', false)
    settingsStore.actionGetCityList({ country: activeSelectedCountry.value?.id })
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
     const { data } =  await fetchGetRegionById(props.id)
     formValue.name = data.name
     formValue.status = data.is_active
   } catch(err){
    console.log(err)
   } finally{
    isGetCountryLoading.value = false
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
        <div v-if="isGetCountryLoading" class="flex h-[120px] items-center justify-center">
          <base-spinner/>
        </div>
        <template v-else>
          <CityForm v-model:formValue="formValue" v-model:validator="$v" formId="country-form" />
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
  </BaseDialog>
</template>