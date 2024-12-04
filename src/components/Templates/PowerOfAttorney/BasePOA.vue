<script setup>
// Core
import { computed } from "vue"
import { useRoute } from "vue-router"
// Store
import { useAuthStore } from "@/modules/Auth/stores"
// Components
import { ForLegalServices } from "@/components/Templates/PowerOfAttorney/index"
// Constants
import { COMPOSE_DOCUMENT_SUB_TYPES, SIGNER_TYPES } from "@/enums"
import { formatDate } from "@/utils/formatDate"

const route = useRoute()
const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  },
  preview: {
    type: Boolean,
    default: false
  }
})
const formMap = {
  [COMPOSE_DOCUMENT_SUB_TYPES.SERVICE_LETTER]: ForLegalServices
}

// Computed
const selectedTemplate = computed(() => {
  const docSubType = route.params.document_sub_type
  return formMap[docSubType] || ForLegalServices
})

const curators = computed(() => {
  if (props.preview) {
    return [props.composeModel?.__curator]
  }
  const basicSigner = props.composeModel?.signers.find(item => item.type === SIGNER_TYPES.BASIC_SIGNER)
  return basicSigner ? [basicSigner] : [props.composeModel?.curator].filter(Boolean)
})

const curatorPosition = computed(() => {
  return curators.value.length && curators.value[0]?.user?.position?.name || curators.value[0]?.position?.name
})

const curatorFullName = computed(() => {
  return curators.value.length && curators.value[0]?.user?.full_name || curators.value[0]?.full_name
})

const empPositionFull = computed(() => {
  if (props.preview) {
    return `${props.composeModel?.__user?.top_level_department?.name} ${props.composeModel?.__user?.position?.name}`
  }
  return `${props.composeModel?.user?.top_level_department?.name} ${props.composeModel?.user?.position?.name}`
})

const empFullName = computed(() => {
  if (props.preview) {
    return props.composeModel?.__user?.full_name
  }
  return props.composeModel?.user?.full_name
})

const empPassportDetails = computed(() => {
  if (props.preview) {
    return `seriyasi va raqami ${props.composeModel?.__user?.passport_seria} ${props.composeModel?.__user?.passport_number}, ${formatDate(props.composeModel?.__user?.passport_issue_date)} yilda ${props.composeModel?.__user?.passport_issued_by} tomonidan berilgan`
  }
  return `seriyasi va raqami ${props.composeModel?.user?.passport_seria} ${props.composeModel?.user?.passport_number}, ${formatDate(props.composeModel?.user?.passport_issue_date)} yilda ${props.composeModel?.user?.passport_issued_by} tomonidan berilgan`
})

const author = computed(() => {
  return props.preview ? useAuthStore().currentUser : props.composeModel?.author
})
</script>

<template>
  <component
    :is="selectedTemplate"
    :compose-model="props.composeModel"
    :preview="props.preview"
    :curators="curators"
    :curator-position="curatorPosition"
    :curator-full-name="curatorFullName"
    :emp-position-full="empPositionFull"
    :emp-full-name="empFullName"
    :emp-passport-details="empPassportDetails"
    :author="author"
  />
</template>

<style scoped>

</style>
