<script setup>
// Core
import {useRoute} from "vue-router"
// Components
import { InnerLetterTemplate, ApplicationLetterTemplate, BusinessTripNoticeTemplate, OrderLetterTemplate, OrdinaryNoticeTemplate, DecreeTemplate, BusinessTripDecreeTemplate } from "@/components/Templates/index"
// Enums
import {computed} from "vue"
import {COMPOSE_DOCUMENT_SUB_TYPES} from "@/enums"
import {
  ApplicationForm,
  BusinessTripNoticeForm, DecreeForm,
  InnerForm,
  OrderForm,
  OrdinaryNoticeForm
} from "@/modules/Documents/modules/SendDocuments/views/forms";

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
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_DECREE_FOREIGN]: DecreeTemplate,
  },
  APPLICATION: [
    COMPOSE_DOCUMENT_SUB_TYPES.LABOR_LEAVE,
    COMPOSE_DOCUMENT_SUB_TYPES.CHILD_CARE_LEAVE,
    COMPOSE_DOCUMENT_SUB_TYPES.VACATION_OWN_EXPENSE,
    COMPOSE_DOCUMENT_SUB_TYPES.EDUCATIONAL_LEAVE,
    COMPOSE_DOCUMENT_SUB_TYPES.MATERIAL_SUPPORT,
    COMPOSE_DOCUMENT_SUB_TYPES.APPLICATION,
  ],
  BUSINESS_TRIP: [
    COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP,
    COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_DECREE_LOCAL,
  ]
}
const selectedTemplate = computed(() => {
  const docSubType = route.params.document_sub_type
  if (formMap.APPLICATION.includes(docSubType)) {
    return ApplicationLetterTemplate
  }
  if (formMap.BUSINESS_TRIP.includes(docSubType)) {
    return BusinessTripDecreeTemplate
  }
  return formMap[docSubType] || InnerForm
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
