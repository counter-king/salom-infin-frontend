<script setup>
// Core
import {useRoute} from "vue-router"
// Components
import {
  InnerLetterTemplate,
  ApplicationLetterTemplate,
  BusinessTripNoticeTemplate,
  OrderLetterTemplate,
  OrdinaryNoticeTemplate,
  DecreeTemplate,
  BusinessTripDecreeTemplate,
  BasePOA,
  BusinessTripTemplate,
  MultipleTemplates
} from "@/components/Templates/index"
// Enums
import {computed} from "vue"
import {COMPOSE_DOCUMENT_SUB_TYPES} from "@/enums"
import { BusinessTripOrderTemplate } from "@/components/Templates";

const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  }
})

const route = useRoute()

const formMap = {
  ...{
    [COMPOSE_DOCUMENT_SUB_TYPES.SERVICE_LETTER]: InnerLetterTemplate,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP]: BusinessTripNoticeTemplate,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_ORDER]: OrderLetterTemplate,
    [COMPOSE_DOCUMENT_SUB_TYPES.ORDINARY_NOTICE]: OrdinaryNoticeTemplate,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_DECREE_V2]: DecreeTemplate,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP]: BusinessTripNoticeTemplate,
    [COMPOSE_DOCUMENT_SUB_TYPES.EXTEND_BUSINESS_TRIP_NOTICE]: MultipleTemplates,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_DECREE_LOCAL]: DecreeTemplate,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_ORDER_LOCAL]: BusinessTripOrderTemplate,
    [COMPOSE_DOCUMENT_SUB_TYPES.NOTICE_FOR_EMPLOYMENT]: OrdinaryNoticeTemplate,
    [COMPOSE_DOCUMENT_SUB_TYPES.ORDER_FOR_EMPLOYMENT]: OrderLetterTemplate,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_NOTICE_V2]: MultipleTemplates
  },
  APPLICATION: [
    COMPOSE_DOCUMENT_SUB_TYPES.LABOR_LEAVE,
    COMPOSE_DOCUMENT_SUB_TYPES.CHILD_CARE_LEAVE,
    COMPOSE_DOCUMENT_SUB_TYPES.VACATION_OWN_EXPENSE,
    COMPOSE_DOCUMENT_SUB_TYPES.EDUCATIONAL_LEAVE,
    COMPOSE_DOCUMENT_SUB_TYPES.MATERIAL_SUPPORT,
    COMPOSE_DOCUMENT_SUB_TYPES.APPLICATION,
  ],
  POA: [
    COMPOSE_DOCUMENT_SUB_TYPES.POA_FOR_LEGAL_SERVICES,
    COMPOSE_DOCUMENT_SUB_TYPES.POA_ACTING_FILIAL_MANAGER,
    COMPOSE_DOCUMENT_SUB_TYPES.POA_DEPUTY_FILIAL_MANAGER,
  ]
}
const selectedTemplate = computed(() => {
  const docSubType = route.params.document_sub_type
  if (formMap.APPLICATION.includes(docSubType)) {
    return ApplicationLetterTemplate
  }
  if (formMap.POA.includes(docSubType)) {
    return BasePOA
  }
  return formMap[docSubType] || InnerLetterTemplate
})
</script>

<template>
  <component
    :is="selectedTemplate"
    :compose-model="props.composeModel"
  />
</template>

<style scoped>

</style>
