<script setup>
// Core
import {useRoute} from "vue-router"
// Components
import { InnerLetterTemplate, ApplicationLetterTemplate, BusinessTripNoticeTemplate } from "@/components/Templates/index"
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
  [COMPOSE_DOCUMENT_SUB_TYPES.LABOR_LEAVE]: ApplicationLetterTemplate,
  [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP]: BusinessTripNoticeTemplate,
}

const selectedTemplate = computed(
  () => {
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
