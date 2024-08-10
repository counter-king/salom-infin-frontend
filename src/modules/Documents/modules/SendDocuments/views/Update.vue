<script setup>
// Core
import {computed} from "vue";
import {useRoute} from "vue-router";
// Components
import {InnerForm, ApplicationForm, BusinessTripNoticeForm} from "@/modules/Documents/modules/SendDocuments/views/forms/index";
// Constants
import {FORM_TYPE_UPDATE} from "@/constants/constants";
import {COMPOSE_DOCUMENT_SUB_TYPES} from "@/enums";

const route = useRoute();
const formValues  = {
  [COMPOSE_DOCUMENT_SUB_TYPES.SERVICE_LETTER]: InnerForm,
  [COMPOSE_DOCUMENT_SUB_TYPES.LABOR_LEAVE]: ApplicationForm,
  [COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP]: BusinessTripNoticeForm,
}
const selectedComponent = computed(
  () => {
    return formValues[route.params.document_sub_type] || InnerForm
  })
</script>

<template>
  <component
    :is="selectedComponent"
    :formType="FORM_TYPE_UPDATE"
  />
</template>

<style scoped>

</style>
