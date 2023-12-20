<script setup>
// Core
import {useRoute} from "vue-router";
// Components
import { InnerLetterTemplate } from "@/components/Templates/index";
// Enums
import {SD_TYPE_INNER} from "@/modules/Documents/modules/SendDocuments/constants";
import {computed} from "vue";

const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  }
})

const route = useRoute();

const templateValues  = {
  [SD_TYPE_INNER]: InnerLetterTemplate
}

const selectedTemplate = computed(
  () => {
    return templateValues[route.params.type] || InnerLetterTemplate
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
