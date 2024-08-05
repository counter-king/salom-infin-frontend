<script setup>
// Core
import {computed} from "vue";
import {useRoute} from "vue-router";
// Components
import {InnerForm, ApplicationForm} from "@/modules/Documents/modules/SendDocuments/views/forms/index"
// Constants
import {FORM_TYPE_CREATE} from "@/constants/constants"
import {
  SD_TYPE_INNER,
  SD_TYPE_APPLICATION
} from "@/modules/Documents/modules/SendDocuments/constants"

const route = useRoute()
const formValues  = {
  [SD_TYPE_INNER]: InnerForm,
  [SD_TYPE_APPLICATION]: ApplicationForm
}
const selectedComponent = computed(
  () => {
    return formValues[route.params.type] || InnerForm
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
