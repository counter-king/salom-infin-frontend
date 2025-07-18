<script setup>
// Core
import {computed} from "vue"
import {useRoute} from "vue-router"
// Components
import {
  InnerForm,
  BusinessTripNoticeForm,
  ApplicationForm,
  OrderForm,
  OrdinaryNoticeForm,
  DecreeForm,
  PowerOfAttorneyForm,
  BusinessTripForm,
  BusinessTripDecreeForm,
  ExtendBusinessTripForm
} from "@/modules/Documents/modules/SendDocuments/views/forms/index"
// Constants
import {FORM_TYPE_CREATE} from "@/constants/constants"
import {COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES} from "@/enums"

const route = useRoute()
const formMap = {
  ...{
    [COMPOSE_DOCUMENT_SUB_TYPES.SERVICE_LETTER]: InnerForm,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_ORDER]: OrderForm,
    [COMPOSE_DOCUMENT_SUB_TYPES.ORDINARY_NOTICE]: OrdinaryNoticeForm,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_DECREE_V2]: DecreeForm,
    [COMPOSE_DOCUMENT_SUB_TYPES.NOTICE_FOR_EMPLOYMENT]: OrdinaryNoticeForm,
    [COMPOSE_DOCUMENT_SUB_TYPES.ORDER_FOR_EMPLOYMENT]: OrderForm,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_NOTICE_V2]: BusinessTripForm,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_NOTICE_FOREIGN]: BusinessTripForm,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_DECREE_LOCAL]: BusinessTripDecreeForm,
    [COMPOSE_DOCUMENT_SUB_TYPES.EXTEND_BUSINESS_TRIP_NOTICE]: ExtendBusinessTripForm,
  },
  APPLICATION: [
    COMPOSE_DOCUMENT_SUB_TYPES.LABOR_LEAVE,
    COMPOSE_DOCUMENT_SUB_TYPES.CHILD_CARE_LEAVE,
    COMPOSE_DOCUMENT_SUB_TYPES.VACATION_OWN_EXPENSE,
    COMPOSE_DOCUMENT_SUB_TYPES.EDUCATIONAL_LEAVE,
    COMPOSE_DOCUMENT_SUB_TYPES.MATERIAL_SUPPORT,
    COMPOSE_DOCUMENT_SUB_TYPES.APPLICATION,
    COMPOSE_DOCUMENT_SUB_TYPES.EXPLANATION_LETTER,
  ],
  BUSINESS_TRIP: [
    COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP,
    COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_ORDER_LOCAL
  ],
  POWER_OF_ATTORNEY: [
    COMPOSE_DOCUMENT_SUB_TYPES.POA_FOR_LEGAL_SERVICES,
    COMPOSE_DOCUMENT_SUB_TYPES.POA_ACTING_FILIAL_MANAGER,
    COMPOSE_DOCUMENT_SUB_TYPES.POA_DEPUTY_FILIAL_MANAGER
  ]
};
const selectedComponent = computed(() => {
  const docSubType = route.params.document_sub_type
  if (formMap.APPLICATION.includes(docSubType)) {
    return ApplicationForm
  }
  if (formMap.BUSINESS_TRIP.includes(docSubType)) {
    return BusinessTripNoticeForm
  }
  if (formMap.POWER_OF_ATTORNEY.includes(docSubType)) {
    return PowerOfAttorneyForm
  }
  return formMap[docSubType] || InnerForm
});
</script>

<template>
  <component
    :is="selectedComponent"
    :formType="FORM_TYPE_CREATE"
  />
</template>

<style scoped>

</style>
