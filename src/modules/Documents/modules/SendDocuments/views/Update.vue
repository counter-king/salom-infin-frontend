<script setup>
// Core
import {computed} from "vue";
import {useRoute} from "vue-router";
// Components
import {
  InnerForm,
  ApplicationForm,
  BusinessTripNoticeForm,
  OrderForm,
  OrdinaryNoticeForm,
  DecreeForm
} from "@/modules/Documents/modules/SendDocuments/views/forms/index";
// Constants
import {FORM_TYPE_UPDATE} from "@/constants/constants";
import {COMPOSE_DOCUMENT_SUB_TYPES} from "@/enums";

const route = useRoute();
const formMap = {
  ...{
    [COMPOSE_DOCUMENT_SUB_TYPES.SERVICE_LETTER]: InnerForm,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP]: BusinessTripNoticeForm,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_ORDER]: OrderForm,
    [COMPOSE_DOCUMENT_SUB_TYPES.ORDINARY_NOTICE]: OrdinaryNoticeForm,
    [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_DECREE_FOREIGN]: DecreeForm,
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
};
const selectedComponent = computed(() => {
  const docSubType = route.params.document_sub_type
  if (formMap.APPLICATION.includes(docSubType)) {
    return ApplicationForm
  }
  if (formMap.BUSINESS_TRIP.includes(docSubType)) {
    return BusinessTripNoticeForm
  }
  return formMap[docSubType] || InnerForm
});
</script>

<template>
  <component
    :is="selectedComponent"
    :formType="FORM_TYPE_UPDATE"
  />
</template>

<style scoped>

</style>
