<script setup>
// Core
import {computed, onBeforeMount, onMounted} from "vue"
import {useRoute, useRouter} from "vue-router"
import {useI18n} from "vue-i18n"
// Store
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store"
// Components
import BaseTemplate from "@/modules/Documents/components/BaseTemplate.vue"
import {LayoutWithTabsCompose} from "@/components/DetailLayout"
import SigningProcessTimeline from "@/modules/Documents/components/SigningProcessTimeline.vue"
import { EyeIcon, Pen2Icon } from "@/components/Icons"
import {TreeUsers} from "@/components/Tree"
// Enums
import { COMPOSE_DOCUMENT_SUB_TYPES, CONTENT_TYPES } from "@/enums"

const SDStore = useSDStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// Computed
const isChangeable = computed(() => {
  return SDStore.detailModel
})
const title = computed(() => {
  return route.params?.document_type ? SDStore.SD_TOOLBAR_MENU_LIST.find(item => item.document_type === route.params?.document_type).label : SDStore.SD_TOOLBAR_MENU_LIST[0].label
})

const fillOnMount = computed(() => {
  return route.params?.document_sub_type === COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_DECREE_LOCAL
})

// Methods
const openUpdatePage = () => {
  router.push({
    name: 'SendDocumentsUpdate',
    params: {
      id: route.params.id,
      document_type: route.params.document_type,
      document_sub_type: route.params.document_sub_type,
    },
    query: {
      trip_notice_id: SDStore.detailModel.trip_notice_id || null
    }
  })
}

onBeforeMount(async () => {
  SDStore.detailLoading = true;
  const response = await SDStore.actionGetDocumentDetail(route.params.id);
  if (response){
    if (fillOnMount.value && response?.data?.trip_notice_id) {
      try {
        const { data } = await SDStore.actionGetDocumentDetailForCustomUse(response.data.trip_notice_id)
        SDStore.detailModel = {
          ...response.data,
          notices: data.notices,
          trip_notice_register_number: data?.register_number
        }
      } catch (err) {

      } finally {
        setTimeout(() => {
          SDStore.detailLoading = false
        }, 1000)
      }
    } else {
      setTimeout(() => {
        SDStore.detailLoading = false
      }, 1000)
    }
  }
})
</script>

<template>
  <template v-if="SDStore.detailLoading">
    <base-spinner />
  </template>

  <template v-else>
<!--    <pre>{{ isChangeable }}</pre>-->
    <layout-with-tabs-compose
      :title="title"
      :object-id="SDStore.detailModel?.id"
      :content-type="SDStore.detailModel?.content_type"
      :files="SDStore.detailModel?.files"
    >
      <template #header-end>
<!--        <base-button-->
<!--          color="bg-white hover:bg-greyscale-100 text-primary-dark"-->
<!--          border-color="border-transparent"-->
<!--          label="watch-process"-->
<!--          :icon-left="EyeIcon"-->
<!--          icon-height="16"-->
<!--          icon-width="16"-->
<!--          icon-color="#767994"-->
<!--          rounded-->
<!--          shadow-->
<!--          type="button"-->
<!--        />-->

        <base-button
          v-if="!SDStore.detailModel?.registered_document"
          color="bg-white hover:bg-greyscale-100 text-primary-dark"
          border-color="border-transparent"
          label="update"
          :icon-left="Pen2Icon"
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
        <div class="p-6 w-full overflow-y-auto !h-[calc(100vh-250px)]">
          <signing-process-timeline :compose-model="SDStore.detailModel" />

          <template v-if="SDStore.detailModel?.registered_document && SDStore.tree">
            <div class="text-base font-semibold text-primary-900 mt-4 mb-2">{{ t('process') }}</div>

            <div class="bg-greyscale-50 rounded-xl overflow-y-auto">
              <tree-users
                v-if="SDStore.tree"
                :tree-items="SDStore?.tree"
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
              :compose-model="SDStore.detailModel"
              class="overflow-hidden"
            />
          </div>
        </div>
      </template>
    </layout-with-tabs-compose>
  </template>
</template>

<style scoped>

</style>
