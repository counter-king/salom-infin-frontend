<script setup>
// Enums
import { FORM_TYPE_CREATE } from "@/constants/constants"
import {LayoutWithTabs} from "@/components/DetailLayout";

const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
});
</script>

<template>
  <template v-if="false">
    <base-spinner/>
  </template>

  <template v-else>
    <layout-with-tabs
      :title="props.formType === FORM_TYPE_CREATE ? 'create-notice' : 'update-notice'"
    >
      <template #content>
        Raport Form
      </template>
    </layout-with-tabs>
  </template>
</template>

<style scoped>

</style>
