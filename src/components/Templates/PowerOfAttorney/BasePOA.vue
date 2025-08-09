<script setup>
// Core
import { computed } from "vue"
import { useRoute } from "vue-router"
// Store
import { useAuthStore } from "@/modules/Auth/stores"
// Components
import {
  ForLegalServices,
  ActingFilialManagerTemplate,
  DeputyFilialManagerTemplate,
  SecondTypeBXMManagerTemplate,
  DeputyFilialManagerRetailTemplate,
  BSOManagerTemplate,
  BSOClientManagerTemplate, ElectronDigitalSignatureTemplate, OperativeGroupHeadTemplate, EmployerRepresentativeTemplate
} from "@/components/Templates/PowerOfAttorney/index"
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
  [COMPOSE_DOCUMENT_SUB_TYPES.POA_FOR_LEGAL_SERVICES]: ForLegalServices,
  [COMPOSE_DOCUMENT_SUB_TYPES.POA_ACTING_FILIAL_MANAGER]: ActingFilialManagerTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.POA_SECOND_TYPE_BSC_MANAGER]: SecondTypeBXMManagerTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.POA_DEPUTY_FILIAL_MANAGER_BUSINESS]: DeputyFilialManagerTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.POA_BSO_DEPUTY_MANAGER_BUSINESS]: DeputyFilialManagerTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.POA_DEPUTY_FILIAL_MANAGER_RETAIL]: DeputyFilialManagerRetailTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.POA_BSO_DEPUTY_MANAGER_RETAIL]: DeputyFilialManagerRetailTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.POA_BSO_CLIENT_MANAGER]: BSOClientManagerTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.POA_BSO_MANAGER]: BSOManagerTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.POA_ELECTRON_DIGITAL_SIGNATURE]: ElectronDigitalSignatureTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.POA_OPERATIVE_GROUP_HEAD]: OperativeGroupHeadTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.POA_EMPLOYER_REPRESENTATIVE]: EmployerRepresentativeTemplate,
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

const emp = computed(() => {
  if (props.preview) {
    return props.composeModel?.__user
  }
  return props.composeModel?.user
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

const parentDocument = computed(() => {
  return props.preview ? props.composeModel?.__parent : props.composeModel?.parent
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
    :parentDocument="parentDocument"
    :emp="emp"
  />
</template>

<style scoped>

</style>
