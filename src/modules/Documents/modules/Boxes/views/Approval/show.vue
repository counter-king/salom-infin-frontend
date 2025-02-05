<script setup>
// Core
import {computed, onMounted, ref} from "vue"
import {useRoute, useRouter} from "vue-router"
import {useI18n} from "vue-i18n"
// Service
import { fetchRejectApprovalDocument } from "@/modules/Documents/modules/Boxes/services/approval.service"
// Store
import { useCountStore } from "@/stores/count.store"
import { useAuthStore } from "@/modules/Auth/stores"
import { useBoxesApprovalStore } from "@/modules/Documents/modules/Boxes/stores/approval.store"
import { useSDStore } from "@/modules/Documents/modules/SendDocuments/stores/index.store"
// Components
import { Pen2Icon, XMarkSolidIcon } from '@/components/Icons'
import Approve from "@/components/Modal/Approve.vue"
import SendToSigning from "@/modules/Documents/modules/Boxes/components/SendToSigning.vue"
import { LayoutWithTabsCompose } from "@/components/DetailLayout"
import { ModalComment } from "@/components/Modal"
import SigningProcessTimeline from "@/modules/Documents/components/SigningProcessTimeline.vue"
// Enums
import BaseTemplate from "@/modules/Documents/components/BaseTemplate.vue"
import {TreeUsers} from "@/components/Tree"
import { COMPOSE_DOCUMENT_SUB_TYPES } from "@/enums";

// Composable
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const approvalStore = useBoxesApprovalStore()
const countStore = useCountStore()
const authstore = useAuthStore()
const sdStore = useSDStore()

// Reactive
const rejectModal = ref(false)
const changeModal = ref(false)
const confirmModal = ref(false)
const tabValue = ref('notice')

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
  await approvalStore.actionGetApprovalDetail(route.params.id)
}
const onApprove = async () => {
  await getDetail()
  await countStore.actionCountList()
}
const onReject = async (comment) => {
  await fetchRejectApprovalDocument({ id: route.params.id, comment })
  rejectModal.value = false;
  await getDetail()
  await countStore.actionCountList()
}
const openConfirmModal = () => {
  confirmModal.value = true
}
const onChangeDocument = async (text) => {
  const id = tabValue.value === 'decree' ? approvalStore.detailModel?.compose?.decree_id : route.query.compose_id
  await sdStore.actionCustomUpdate({ id, body: { content: text } })
  changeModal.value = false
  await countStore.actionCountList()
  await router.go(-1)
}
const onItemClick = (item) => {
  tabValue.value = item.slot
}

// Hooks
onMounted(  () => {
  getDetail()
})
</script>

<template>
  <template v-if="approvalStore.detailLoading">
    <base-spinner />
  </template>

  <template v-else>
    <layout-with-tabs-compose
      :content-type="approvalStore.detailModel?.compose?.content_type"
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
	        v-if="approved === null"
          severity="danger"
          label="not-agree"
          :icon-left="XMarkSolidIcon"
          icon-height="!w-4"
          icon-width="!h-4"
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
        <div class="p-6 w-full overflow-y-auto !h-[calc(100vh-250px)]">
          <signing-process-timeline
	          v-if="approvalStore.detailModel && approvalStore.detailModel.compose"
	          :compose-model="approvalStore.detailModel?.compose"
          />

          <template v-if="approvalStore.detailModel?.compose?.registered_document && approvalStore.tree">
            <div class="text-base font-semibold text-primary-900 mt-4 mb-2">{{ t('process') }}</div>

            <div class="bg-greyscale-50 rounded-xl overflow-y-auto">
              <tree-users
                v-if="approvalStore.tree"
                :tree-items="approvalStore?.tree"
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
          <div
            class="min-h-full shadow-block border-[0.095rem] border-greyscale-200"
            :class="approvalStore?.detailModel?.compose?.document_sub_type?.id === Number(COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_NOTICE_V2) ? '' : 'p-10'"
          >
            <base-template
              v-if="approvalStore.detailModel && approvalStore.detailModel.compose"
              :compose-model="approvalStore.detailModel?.compose"
              class="overflow-hidden"
              @emit:on-item-click="onItemClick"
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
		  :editor-value="tabValue === 'decree' ? approvalStore.detailModel?.compose?.decree_content : approvalStore.detailModel?.compose?.content"
      :loading="sdStore.customUpdateLoading"
	  />
	  <!-- /CHANGE TEXT MODAL -->

    <!-- CONFIRM CHANGE MODAL -->
    <base-dialog
      v-model="confirmModal"
      label="props.headerText ? props.headerText : props.label"
      max-width="max-w-[750px]"
      :draggable="false"
    >
      <template #content>
        sdsdsdsdsds
      </template>

      <template #footer>
        aaaaaaaaaa
      </template>
    </base-dialog>
    <!-- /CONFIRM CHANGE MODAL -->
  </template>
</template>

<style scoped>

</style>
