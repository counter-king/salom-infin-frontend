<script setup>
// Core
import {computed} from "vue";
import {useRoute} from "vue-router";
// Components
import {InnerForm, ApplicationForm} from "@/modules/Documents/modules/SendDocuments/views/forms/index";
// Constants
import {FORM_TYPE_UPDATE} from "@/constants/constants";
import {COMPOSE_JOURNALS} from "@/enums";

const route = useRoute();
const formValues  = {
  [COMPOSE_JOURNALS.INNER]: InnerForm,
  [COMPOSE_JOURNALS.APPLICATION]: ApplicationForm
}
const selectedComponent = computed(
  () => {
    return formValues[route.params.journal] || InnerForm
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
