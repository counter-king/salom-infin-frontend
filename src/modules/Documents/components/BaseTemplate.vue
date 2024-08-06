<script setup>
// Core
import {useRoute} from "vue-router";
// Components
import { InnerLetterTemplate, ApplicationLetterTemplate } from "@/components/Templates/index";
// Enums
import {SD_TYPE_INNER} from "@/modules/Documents/modules/SendDocuments/constants";
import {computed} from "vue";
import {COMPOSE_DOCUMENT_TYPES} from "@/enums";

const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  }
})

const route = useRoute();

const templateValues  = {
  [COMPOSE_DOCUMENT_TYPES.INNER]: InnerLetterTemplate,
  [COMPOSE_DOCUMENT_TYPES.APPLICATION]: ApplicationLetterTemplate,
}

const selectedTemplate = computed(
  () => {
    return templateValues[route.params.journal] || InnerLetterTemplate
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
