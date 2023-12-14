<script setup>
// Core
import {computed} from "vue";
import {useRoute} from "vue-router";
// Components
import {InnerForm, OutgoingForm} from "@/modules/Documents/modules/SendDocuments/views/forms/index";
// Constants
import {FORM_TYPE_CREATE} from "@/constants/constants";
import {SD_TYPE_INNER, SD_SD_TYPE_OUTGOING} from "@/modules/Documents/modules/SendDocuments/constants";

const route = useRoute();
const formValues  = {
  [SD_TYPE_INNER]: InnerForm,
  [SD_SD_TYPE_OUTGOING]: OutgoingForm
}
const selectedComponent = computed(
  () => {
    return formValues[route.params.type] || InnerForm
})
</script>

<template>
  <component
    :is="selectedComponent"
  />
</template>

<style scoped>

</style>
