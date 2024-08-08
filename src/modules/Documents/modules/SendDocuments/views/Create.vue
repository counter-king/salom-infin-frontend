<script setup>
// Core
import {computed} from "vue";
import {useRoute} from "vue-router";
// Components
import {InnerForm, BusinessTripNoticeForm, ApplicationForm} from "@/modules/Documents/modules/SendDocuments/views/forms/index"
// Constants
import {FORM_TYPE_CREATE} from "@/constants/constants"
import {COMPOSE_DOCUMENT_TYPES} from "@/enums";

const route = useRoute()
const formValues  = {
  [COMPOSE_DOCUMENT_TYPES.INNER]: InnerForm,
  [COMPOSE_DOCUMENT_TYPES.NOTICE]: BusinessTripNoticeForm,
  [COMPOSE_DOCUMENT_TYPES.APPLICATION]: ApplicationForm
}
const selectedComponent = computed(
  () => {
    return formValues[route.params.document_type] || InnerForm
})
</script>

<template>
  <component
    :is="selectedComponent"
    :formType="FORM_TYPE_CREATE"
  />
</template>

<style scoped>

</style>
