<script setup>
// Core
import {useRoute} from "vue-router"
// Components
import { InnerLetterTemplate, ApplicationLetterTemplate, BusinessTripNoticeTemplate, OrderLetterTemplate, OrdinaryNoticeTemplate, DecreeTemplate } from "@/components/Templates/index"
// Enums
import {computed} from "vue"
import {COMPOSE_DOCUMENT_SUB_TYPES} from "@/enums"

const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  }
})

const route = useRoute();

const templateValues  = {
  [COMPOSE_DOCUMENT_SUB_TYPES.SERVICE_LETTER]: InnerLetterTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP]: BusinessTripNoticeTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_ORDER]: OrderLetterTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.ORDINARY_NOTICE]: OrdinaryNoticeTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.ORDINARY_DECREE]: DecreeTemplate,
}

const selectedTemplate = computed(
  () => {
    const docSubType = route.params.document_sub_type
    if ([COMPOSE_DOCUMENT_SUB_TYPES.LABOR_LEAVE,
      COMPOSE_DOCUMENT_SUB_TYPES.CHILD_CARE_LEAVE,
      COMPOSE_DOCUMENT_SUB_TYPES.VACATION_OWN_EXPENSE,
      COMPOSE_DOCUMENT_SUB_TYPES.EDUCATIONAL_LEAVE,
      COMPOSE_DOCUMENT_SUB_TYPES.MATERIAL_SUPPORT,
      COMPOSE_DOCUMENT_SUB_TYPES.APPLICATION].includes(docSubType)) {
      return ApplicationLetterTemplate
    }
    return templateValues[route.params.document_sub_type] || InnerLetterTemplate
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
