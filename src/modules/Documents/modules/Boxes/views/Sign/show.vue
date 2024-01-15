<script setup>
// Core
import {onMounted, ref} from "vue";
import { useRoute } from "vue-router";
// Service
import { fetchRejectSignDocument } from "@/modules/Documents/modules/Boxes/services/sign.service";
// Store
import { useBoxesSignStore } from "@/modules/Documents/modules/Boxes/stores/sign.store";
// Components
import { LayoutWithTabs } from "@/components/DetailLayout";
import { ModalComment } from "@/components/Modal";
import SigningProcessTimeline from "@/modules/Documents/components/SigningProcessTimeline.vue";
// Enums
import { CONTENT_TYPES } from "@/enums";
import BaseTemplate from "@/modules/Documents/components/BaseTemplate.vue";

const signStore = useBoxesSignStore();
const route = useRoute();
const rejectModal = ref(false);
const changeModal = ref(false);

// Methods
const onReject = async (comment) => {
  await fetchRejectSignDocument({ id: route.params.id, comment });
  rejectModal.value = false;
  await signStore.actionGetSignDetail(route.params.id);
}
const onChangeDocument = (text) => {
  console.log(text)
}

// Hooks
onMounted( async () => {
  await signStore.actionGetSignDetail(route.params.id);
})
</script>

<template>
  <template v-if="signStore.detailLoading">
    <base-spinner />
  </template>

  <template v-else>
    <layout-with-tabs
      :content-type="CONTENT_TYPES.SEND_DOCUMENT"
      :files="signStore.detailModel?.compose?.files"
      :object-id="signStore.detailModel?.compose?.id"
      :title="signStore.detailModel?.compose?.title"
    >
      <template #header-end>
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
          @click="changeModal = true"
        />

        <base-button
          v-if="signStore.detailModel?.is_signed !== false"
          severity="danger"
          label="reject"
          icon-left="XIcon"
          icon-height="16"
          icon-width="16"
          rounded
          shadow
          type="button"
          @click="rejectModal = true"
        />

        <base-button
          border-color="border-transparent"
          label="sign"
          icon-left="CheckCircleIcon"
          icon-height="16"
          icon-width="16"
          rounded
          shadow
          type="button"
        />
      </template>

      <template #preview>
        <div class="p-6 w-full">
          <signing-process-timeline :compose-model="signStore.detailModel?.compose" />
        </div>
      </template>

      <template #template>
        <div
          class="p-8 overflow-y-auto"
          style="height: calc(100vh - 250px)"
        >
          <base-template
            :compose-model="signStore.detailModel?.compose"
            class="overflow-hidden"
          />
        </div>
      </template>
    </layout-with-tabs>

    <!-- REJECT MODAL -->
    <modal-comment
      v-model="rejectModal"
      label="reject"
      :create-button-fn="onReject"
      create-button-color="danger"
    />
    <!-- /REJECT MODAL -->

    <!-- CHANGE TEXT MODAL -->
    <modal-comment
      v-model="changeModal"
      header-text="change-text"
      label="update"
      :create-button-fn="onChangeDocument"
      editor
      max-width="max-w-[750px]"
      :editor-value="signStore.detailModel?.compose?.content"
    />
    <!-- /CHANGE TEXT MODAL -->
  </template>
</template>

<style scoped>

</style>
