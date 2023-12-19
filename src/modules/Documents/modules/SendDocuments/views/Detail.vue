<script setup>
// Core
import {onMounted} from "vue";
import {useRoute} from "vue-router";
// Store
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store";
// Components
import {LayoutWithTabs} from "@/components/DetailLayout";
import InnerLetterTemplate from "@/components/Templates/InnerLetterTemplate.vue";
import SigningProcessTimeline from "@/modules/Documents/components/SigningProcessTimeline.vue";

const SDStore = useSDStore();
const route = useRoute();

onMounted(async () => {
  SDStore.detailLoading = true;
  const response = await SDStore.actionGetDocumentDetail(route.params.id);
  if (response){
    setTimeout(() => {
      SDStore.detailLoading = false;
    }, 1000)
  }
})
</script>

<template>
  <template v-if="SDStore.detailLoading">
    <base-spinner />
  </template>

  <template v-else>
    <layout-with-tabs
      :title="SDStore.detailModel?.title"
    >
      <template #template>
        <inner-letter-template class="m-8" />
      </template>
      <template #preview>
        <div class="p-6 w-full">
          <signing-process-timeline :compose-model="SDStore.detailModel" />
        </div>
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
</template>

<style scoped>

</style>
