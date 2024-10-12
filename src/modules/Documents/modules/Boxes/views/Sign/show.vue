<script setup>
// Core
import { computed, onMounted, ref } from "vue"
import {useRoute, useRouter} from "vue-router"
import {useI18n} from "vue-i18n"
// Service
import {fetchRejectSignDocument, fetchSignDocument} from "@/modules/Documents/modules/Boxes/services/sign.service"
// Store
import { useBoxesSignStore } from "@/modules/Documents/modules/Boxes/stores/sign.store"
import { useDocumentCountStore } from "@/modules/Documents/stores/count.store"
import { useSDStore } from "@/modules/Documents/modules/SendDocuments/stores/index.store"
// Components
import { Pen2Icon, XMarkSolidIcon } from '@/components/Icons'
import { LayoutWithTabsCompose } from "@/components/DetailLayout"
import { ModalComment } from "@/components/Modal"
import SigningProcessTimeline from "@/modules/Documents/components/SigningProcessTimeline.vue"
import ResolutionPerformersModal from "@/modules/Documents/modules/Boxes/components/ResolutionPerformersModal.vue"
import SendForApproval from "@/modules/Documents/modules/Boxes/components/SendForApproval.vue"
import { TreeUsers } from '@/components/Tree'
import Eimzo from "@/components/EIMZO/Eimzo.vue"
// Enums
import {SIGNER_TYPES} from "@/enums"
import BaseTemplate from "@/modules/Documents/components/BaseTemplate.vue"

const signStore = useBoxesSignStore()
const countStore = useDocumentCountStore()
const sdStore = useSDStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const rejectModal = ref(false)
const changeModal = ref(false)
const resolutionModal = ref(null)
const buttonLoading = ref(false)

// Computed
const signed = computed(() => {
	return signStore.detailModel?.is_signed
})

// Methods
const onReject = async (comment) => {
  await fetchRejectSignDocument({ id: route.params.id, comment })
  rejectModal.value = false;
  await signStore.actionGetSignDetail(route.params.id)
  await countStore.actionDocumentCountList()
}
const onChangeDocument = async (text) => {
  await sdStore.actionCustomUpdate({ id: route.query.compose_id, body: { content: text } })
  changeModal.value = false
  await countStore.actionDocumentCountList()
  await router.replace({
    name: "SignIndex"
  })
}
const sign = async (pkcs7) => {
	try {
    buttonLoading.value = true
    await fetchSignDocument({ id: route.params.id, body: { pkcs7 } })
    await signStore.actionGetSignDetail(route.params.id)
    await countStore.actionDocumentCountList()
  }
  catch (err) {

  }
  finally {
    buttonLoading.value = false
  }
}
const signDocumentWithResolution = async (body) => {
  try {
    await fetchSignDocument({ id: route.params.id, body })
    resolutionModal.value.buttonLoading = false
    resolutionModal.value.dialog = false
    await signStore.actionGetSignDetail(route.params.id)
    await countStore.actionDocumentCountList()
  } catch (err) {

  }
  finally {
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
      :content-type="signStore.detailModel?.compose?.content_type"
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
          :icon-left="Pen2Icon"
          icon-height="!w-4"
          icon-width="!h-4"
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
          :icon-left="XMarkSolidIcon"
          icon-height="!w-4"
          icon-width="!h-4"
          rounded
          shadow
          type="button"
          @click="rejectModal = true"
        />

        <template v-if="signed === null">

<!--          <base-button
            v-if="signStore.detailModel.type !== SIGNER_TYPES.BASIC_SIGNER"
            border-color="border-transparent"
            label="sign"
            :icon-left="CheckCircleIcon"
            icon-height="!w-4"
            icon-width="!h-4"
            rounded
            shadow
            type="button"
            @click="sign"
          />-->

<!--          <send-for-approval />-->

          <eimzo
            v-if="signStore.detailModel.type !== SIGNER_TYPES.BASIC_SIGNER"
            type="sign"
            data="sign-in-basic"
            input-classes="bg-white !rounded-3xl min-w-[200px]"
            :button-loading="buttonLoading"
            @emit:onGetPkcs7="(pkcs7) => sign(pkcs7)"
          />

          <resolution-performers-modal
            v-else
            ref="resolutionModal"
            :performers="signStore?.detailModel?.performers"
            :resolution-text="signStore?.detailModel?.resolution_text"
            :resolution-type="signStore?.detailModel?.resolution_type"
            :deadline="signStore?.detailModel?.deadline"
            @emit:on-sign="signDocumentWithResolution"
          />
        </template>

      </template>

      <template #preview>
        <div class="p-6 w-full overflow-y-auto !h-[calc(100vh-250px)]">
          <signing-process-timeline
	          v-if="signStore.detailModel && signStore.detailModel.compose"
	          :compose-model="signStore.detailModel?.compose"
          />

          <template v-if="signStore.detailModel?.compose?.registered_document && signStore.tree">
            <div class="text-base font-semibold text-primary-900 mt-4 mb-2">{{ t('process') }}</div>

            <div class="bg-greyscale-50 rounded-xl overflow-y-auto">
              <tree-users
                v-if="signStore.tree"
                :tree-items="signStore?.tree"
                root-classes="mt-0"
              />
            </div>
          </template>
        </div>
      </template>

      <template #template>
        <div
          class="p-4 overflow-y-auto"
          style="height: calc(100vh - 250px)"
        >
          <div class="p-10 pl-[80px] min-h-full shadow-block border-[0.095rem] border-greyscale-200">
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
