<script setup>
// Core
import {onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
// Store
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store";
// Components
import BaseTemplate from "@/modules/Documents/components/BaseTemplate.vue";
import {LayoutWithTabs} from "@/components/DetailLayout";
import SigningProcessTimeline from "@/modules/Documents/components/SigningProcessTimeline.vue";
// Enums
import {CONTENT_TYPES} from "@/enums";

const SDStore = useSDStore();
const route = useRoute();
const router = useRouter();

// Methods
const openUpdatePage = () => {
  router.push({
    name: 'SendDocumentsUpdate',
    params: { id: route.params.id, type: SDStore.detailModel?.type }
  })
}

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
      :object-id="SDStore.detailModel?.id"
      :content-type="CONTENT_TYPES.SEND_DOCUMENT"
      :files="SDStore.detailModel?.files"
    >
      <template #header-end>
        <base-button
          color="bg-white hover:bg-greyscale-100 text-primary-dark"
          border-color="border-transparent"
          label="watch-process"
          icon-left="EyeIcon"
          icon-height="16"
          icon-width="16"
          icon-color="#767994"
          rounded
          shadow
          type="button"
        />

        <base-button
          color="bg-white hover:bg-greyscale-100 text-primary-dark"
          border-color="border-transparent"
          label="update"
          icon-left="PenIcon"
          icon-height="16"
          icon-width="16"
          icon-color="#767994"
          rounded
          shadow
          type="button"
          @click="openUpdatePage"
        />
      </template>

      <template #preview>
        <div class="p-6 w-full">
          <signing-process-timeline :compose-model="SDStore.detailModel" />
        </div>
      </template>

      <template #template>
        <div
          class="p-8 overflow-y-auto"
          style="height: calc(100vh - 250px)"
        >
          <base-template
            :compose-model="SDStore.detailModel"
            class="overflow-hidden"
          />
        </div>
      </template>
    </layout-with-tabs>
  </template>
</template>

<style scoped>

</style>
