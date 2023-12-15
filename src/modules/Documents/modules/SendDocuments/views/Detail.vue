<script setup>
// Core
import {onMounted} from "vue";
import {useRoute} from "vue-router";
// Store
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store";
import {LayoutWithTabs} from "@/components/DetailLayout";

const SDStore = useSDStore();
const route = useRoute();

onMounted(async () => {
  await SDStore.actionGetDocumentDetail(route.params.id);
})
</script>

<template>
  <layout-with-tabs
    title="asdasdadad"
  >
    <template #preview>
      asdsd3333
    </template>

    <template #history>
      asdsdqqq
    </template>

    <template #comments>
      asdsdwww
    </template>

    <template #files>
      asdsdssss
    </template>
  </layout-with-tabs>
</template>

<style scoped>

</style>
