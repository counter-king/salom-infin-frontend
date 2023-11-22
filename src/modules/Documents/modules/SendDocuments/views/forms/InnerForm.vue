<script setup>
import {FORM_TYPE_CREATE} from "@/constants/constants";
import {LayoutWithTabs} from "@/components/DetailLayout";

const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
})
</script>

<template>
  <layout-with-tabs
    :title="props.formType === FORM_TYPE_CREATE ? 'create-sd-inner' : 'update-sd-inner'"
  >
    <template #content>
      sdsdsdsd
    </template>
  </layout-with-tabs>
</template>

<style scoped>

</style>
