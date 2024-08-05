<script setup>
// Core
import {computed, onMounted, ref} from "vue";
import { useRoute } from "vue-router";
// Service
import { fetchRejectApprovalDocument } from "@/modules/Documents/modules/Boxes/services/approval.service";
// Store
import { useAuthStore } from "@/modules/Auth/stores";
import { useBoxesApprovalStore } from "@/modules/Documents/modules/Boxes/stores/approval.store";
import { useDocumentCountStore } from "@/modules/Documents/stores/count.store";
import { useSDStore } from "@/modules/Documents/modules/SendDocuments/stores/index.store";
// Components
import Approve from "@/components/Modal/Approve.vue";
import SendToSigning from "@/modules/Documents/modules/Boxes/components/SendToSigning.vue"
import CancelSign from "@/components/Modal/CancelSign.vue";
import { LayoutWithTabsCompose } from "@/components/DetailLayout";
import { ModalComment } from "@/components/Modal";
import SigningProcessTimeline from "@/modules/Documents/components/SigningProcessTimeline.vue";
// Enums
import { CONTENT_TYPES } from "@/enums";
import BaseTemplate from "@/modules/Documents/components/BaseTemplate.vue";

const approvalStore = useBoxesApprovalStore();
const countStore = useDocumentCountStore();
const authstore = useAuthStore()
const sdStore = useSDStore();
const route = useRoute();
const rejectModal = ref(false);
const changeModal = ref(false);

// Computed
const approved = computed(() => {
	return approvalStore.detailModel?.is_approved
})
/** **/
const isAssistant = computed(() => {
  return approvalStore.detailModel?.compose?.curator?.assistant === authstore.currentUser?.id
})

// Methods
const getDetail = async () => {
  await approvalStore.actionGetApprovalDetail(route.params.id);
}
const onApprove = async () => {
  await getDetail();
  await countStore.actionDocumentCountList();
}
const onReject = async (comment) => {
  await fetchRejectApprovalDocument({ id: route.params.id, comment });
  rejectModal.value = false;
  await getDetail();
  await countStore.actionDocumentCountList();
}
const onChangeDocument = async (text) => {
  await sdStore.actionCustomUpdate({ id: route.query.compose_id, body: { content: text } });
  changeModal.value = false;
  await getDetail();
  await countStore.actionDocumentCountList();
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
    <layout-with-tabs-compose
      :content-type="CONTENT_TYPES.SEND_DOCUMENT"
      :files="approvalStore.detailModel?.compose?.files"
      :object-id="approvalStore.detailModel?.compose?.id"
      :title="approvalStore.detailModel?.compose?.title?.name"
    >
      <template #header-end>
        <base-button
	        v-if="approved === null"
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
          :loading="sdStore.customUpdateLoading"
          @click="changeModal = true"
        />

        <base-button
	        v-if="approved === null"
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

        <template v-if="approved === null">
          <send-to-signing
            v-if="isAssistant"
            @emit:on-send-to-signing="onApprove"
          />

          <approve
            v-else
            @emit:on-approve="onApprove"
          />
        </template>
      </template>

      <template #preview>
        <div class="p-6 w-full">
          <signing-process-timeline
	          v-if="approvalStore.detailModel && approvalStore.detailModel.compose"
	          :compose-model="approvalStore.detailModel?.compose"
          />
        </div>
      </template>

      <template #template>
        <div
          class="p-4 overflow-y-auto"
          style="height: calc(100vh - 250px)"
        >
          <div class="py-4 px-6 min-h-full shadow-block border-[0.095rem] border-greyscale-200 rounded-2xl">
            <base-template
              v-if="approvalStore.detailModel && approvalStore.detailModel.compose"
              :compose-model="approvalStore.detailModel?.compose"
              class="overflow-hidden"
            />
          </div>
        </div>
      </template>
    </layout-with-tabs-compose>

	  <!-- REJECT MODAL -->
    <modal-comment
      v-model="rejectModal"
      label="not-agree"
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
		  editor-type="editor"
		  max-width="max-w-[750px]"
		  :editor-value="approvalStore.detailModel?.compose?.content"
      :loading="sdStore.customUpdateLoading"
	  />
	  <!-- /CHANGE TEXT MODAL -->
  </template>
</template>

<style scoped>

</style>
