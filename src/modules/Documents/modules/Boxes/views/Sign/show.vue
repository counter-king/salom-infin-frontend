<script setup>
// Core
import { computed, onMounted, ref } from "vue";
import {useRoute, useRouter} from "vue-router";
// Service
import {fetchRejectSignDocument, fetchSignDocument} from "@/modules/Documents/modules/Boxes/services/sign.service";
// Store
import { useBoxesSignStore } from "@/modules/Documents/modules/Boxes/stores/sign.store";
import { useDocumentCountStore } from "@/modules/Documents/stores/count.store";
import { useSDStore } from "@/modules/Documents/modules/SendDocuments/stores/index.store";
// Components
import { LayoutWithTabsCompose } from "@/components/DetailLayout";
import { ModalComment } from "@/components/Modal";
import SigningProcessTimeline from "@/modules/Documents/components/SigningProcessTimeline.vue";
import ResolutionPerformersModal from "@/modules/Documents/modules/Boxes/components/ResolutionPerformersModal.vue";
// Enums
import { CONTENT_TYPES } from "@/enums";
import BaseTemplate from "@/modules/Documents/components/BaseTemplate.vue";

const signStore = useBoxesSignStore();
const countStore = useDocumentCountStore();
const sdStore = useSDStore();
const route = useRoute();
const router = useRouter();
const rejectModal = ref(false);
const changeModal = ref(false);
const resolutionModal = ref(null)

// Computed
const signed = computed(() => {
	return signStore.detailModel?.is_signed
})

// Methods
const onReject = async (comment) => {
  await fetchRejectSignDocument({ id: route.params.id, comment });
  rejectModal.value = false;
  await signStore.actionGetSignDetail(route.params.id);
  await countStore.actionDocumentCountList();
}
const onChangeDocument = async (text) => {
  await sdStore.actionCustomUpdate({ id: route.query.compose_id, body: { content: text } });
  changeModal.value = false;
  await countStore.actionDocumentCountList();
  await router.replace({
    name: "SignIndex"
  })
}
const signTest = async () => {
	await fetchSignDocument({ id: route.params.id, body: { pkcs7: "test" } })
	await signStore.actionGetSignDetail(route.params.id)
  await countStore.actionDocumentCountList()
}
const signDocumentWithResolution = async (body) => {
  try {
    await fetchSignDocument({ id: route.params.id, body })
    resolutionModal.value.buttonLoading = false
    resolutionModal.value.dialog = false
    await signStore.actionGetSignDetail(route.params.id)
    await countStore.actionDocumentCountList()
  } catch (err) {
    resolutionModal.value.buttonLoading = false
  }
}

// Hooks
onMounted( async () => {
  await signStore.actionGetSignDetail(route.params.id)
})
</script>

<template>
  <template v-if="signStore.detailLoading">
    <base-spinner />
  </template>

  <template v-else>
    <layout-with-tabs-compose
      :content-type="CONTENT_TYPES.SEND_DOCUMENT"
      :files="signStore.detailModel?.compose?.files"
      :object-id="signStore.detailModel?.compose?.id"
      :title="signStore.detailModel?.compose?.title?.name"
    >
      <template #header-end>
        <base-button
	        v-if="signed === null"
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
	        v-if="signed === null"
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

        <template v-if="signed === null">
          <base-button
            v-if="signStore.detailModel.type !== 'basic_signer'"
            border-color="border-transparent"
            label="sign"
            icon-left="CheckCircleIcon"
            icon-height="16"
            icon-width="16"
            rounded
            shadow
            type="button"
            @click="signTest"
          />

          <resolution-performers-modal
            v-else
            ref="resolutionModal"
            :performers="signStore?.detailModel?.performers"
            :resolution-text="signStore?.detailModel?.resolution_text"
            @emit:on-sign="signDocumentWithResolution"
          />
        </template>

      </template>

      <template #preview>
        <div class="p-6 w-full">
          <signing-process-timeline
	          v-if="signStore.detailModel && signStore.detailModel.compose"
	          :compose-model="signStore.detailModel?.compose"
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
              v-if="signStore.detailModel && signStore.detailModel.compose"
              :compose-model="signStore.detailModel?.compose"
              class="overflow-hidden"
            />
          </div>
        </div>
      </template>
    </layout-with-tabs-compose>

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
      editor-type="editor"
      max-width="max-w-[750px]"
      :editor-value="signStore.detailModel?.compose?.content"
      :loading="sdStore.customUpdateLoading"
    />
    <!-- /CHANGE TEXT MODAL -->
  </template>
</template>

<style scoped>

</style>
