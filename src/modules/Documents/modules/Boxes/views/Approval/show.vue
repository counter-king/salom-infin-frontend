<script setup>
// Core
import {onMounted, ref} from "vue";
import { useRoute } from "vue-router";
// Service
import { fetchRejectApprovalDocument } from "@/modules/Documents/modules/Boxes/services/approval.service";
// Store
import { useBoxesApprovalStore } from "@/modules/Documents/modules/Boxes/stores/approval.store";
// Components
import Approve from "@/components/Modal/Approve.vue";
import { LayoutWithTabs } from "@/components/DetailLayout";
import { ModalComment } from "@/components/Modal";
import SigningProcessTimeline from "@/modules/Documents/components/SigningProcessTimeline.vue";
// Enums
import { CONTENT_TYPES } from "@/enums";
import BaseTemplate from "@/modules/Documents/components/BaseTemplate.vue";
import CancelSign from "@/components/Modal/CancelSign.vue";

const approvalStore = useBoxesApprovalStore();
const route = useRoute();
const rejectModal = ref(false)



// Methods
const getDetail = async () => {
  await approvalStore.actionGetApprovalDetail(route.params.id);
}
const onApprove = () => {
  getDetail();
}
const onReject = async (comment) => {
  await fetchRejectApprovalDocument({ id: route.params.id, comment });
  rejectModal.value = false;
  await getDetail();
}

// Hooks
onMounted(  () => {
  getDetail();
})
</script>

<template>
  <template v-if="approvalStore.detailLoading">
    <base-spinner />
  </template>

  <template v-else>
    <layout-with-tabs
      :content-type="CONTENT_TYPES.SEND_DOCUMENT"
      :files="approvalStore.detailModel?.compose?.files"
      :object-id="approvalStore.detailModel?.compose?.id"
      :title="approvalStore.detailModel?.compose?.title"
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
        />

        <base-button
          v-if="approvalStore.detailModel?.is_approved !== false"
          severity="danger"
          label="not-agree"
          icon-left="XIcon"
          icon-height="16"
          icon-width="16"
          rounded
          shadow
          type="button"
          @click="rejectModal = true"
        />

        <approve
          @emit:on-approve="onApprove"
        />

      </template>

      <template #preview>
        <div class="p-6 w-full">
          <signing-process-timeline :compose-model="approvalStore.detailModel?.compose" />
        </div>
      </template>

      <template #template>
        <div
          class="p-8 overflow-y-auto"
          style="height: calc(100vh - 250px)"
        >
          <base-template
            :compose-model="approvalStore.detailModel?.compose"
            class="overflow-hidden"
          />
        </div>
      </template>
    </layout-with-tabs>

    <modal-comment
      v-model="rejectModal"
      label="not-agree"
      :create-button-fn="onReject"
      create-button-color="danger"
    />
  </template>
</template>

<style scoped>

</style>
