<script setup>
// Core
import { ref, shallowRef, watch, defineAsyncComponent, computed } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useI18n } from "vue-i18n"
// Store
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store"
// Components
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
import {
  EyeIcon,
  ClockCircleIcon,
  ChatLineIcon,
  FileTextIcon,
  CloseCircleBoldIcon,
  FolderWithFilesIcon
} from '@/components/Icons'
import FileTabs from './components/FileTabs.vue'
import BackButton from "@/components/Actions/BackButton.vue"
// Enums
import { CONTENT_TYPES } from '@/enums'
import {textDifference} from "@/utils"
import {formatDateHour} from "@/utils/formatDate"
// Composable
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const SDStore = useSDStore()
// Macros
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  toolbar: {
    type: Boolean,
    default: true
  },
  tabItems: {
    type: Array,
    default: () => [
      {
        label: "preview-text",
        name: "Preview",
        icon: EyeIcon,
        slot: "preview",
        component: "Preview",
        count: null
      },
      {
        label: "history",
        name: "History",
        icon: ClockCircleIcon,
        slot: "history",
        component: "History",
        count: null
      },
      {
        label: "comments",
        name: "Comments",
        icon: ChatLineIcon,
        slot: "comments",
        component: "Comments",
        count: 2
      },
      {
        label: "files",
        name: "Files",
        icon: FileTextIcon,
        slot: "files",
        component: "Files"
      },
      {
        label: "linked-documents",
        name: "ConnectedDocuments",
        icon: FolderWithFilesIcon,
        slot: "connected-documents",
        component: "ConnectedDocuments"
      }
    ]
  },
  previewDetail: {
    type: Object,
    default: () => {}
  },
  objectId: {
    type: Number
  },
  headers: {
    type: Array,
    default: () => []
  },
  resolution: {
    type: Object,
    default: () => {}
  },
  treeItems: {
    type: Object,
    default: () => {}
  },
  contentType: {
    type: Number,
    default: CONTENT_TYPES.DOC_FLOW
  },
  files: {
    type: Array,
    default: () => []
  }
})
// Reactive
const activeTabMenuIndex = ref(0)
const activeTabComponent = shallowRef(null)
// Computed
const activeTabMenu = computed(() => props.tabItems[activeTabMenuIndex.value])
// Watch
watch(activeTabMenu, (value) => {
  activeTabComponent.value = defineAsyncComponent({
    loader: () => import(`./components/${value?.component}.vue`),
    loadingComponent: BaseSpinner,
    delay: 200
  })
}, { immediate: true })

// Methods
const getVersionHistoryDetail = async (item) => {
  SDStore.versionHistoryList.forEach(i => i.active = i.id === item.id)
  SDStore.historyContent = textDifference(item.old_text, item.new_text)
  SDStore.historyShow = true
}
const closeHistoryDetail = () => {
  SDStore.historyShow = false
  SDStore.versionHistoryList.forEach(i => i.active = false)
}
</script>

<template>
  <div class="grid-with-tabs-view flex flex-col flex-1 h-full">
    <template v-if="props.toolbar">
      <div class="flex items-center justify-between h-10 mb-5">
        <div class="flex items-center gap-3">

          <back-button />

          <h1 class="font-bold text-xl text-primary-900">{{ props.title ? t(props.title) : t('title-document') }}</h1>
        </div>

        <div class="flex items-center gap-2">
          <slot name="header-end" />
        </div>
      </div>
    </template>

    <div class="detail-layout-content flex flex-col flex-1 bg-white overflow-hidden shadow-button rounded-2xl">
      <slot name="content">
        <div class="flex justify-between border-b">
          <base-tab-menu v-model="activeTabMenuIndex" :tab-items="props.tabItems" />

          <!-- Version history -->
          <div
            v-if="SDStore.versionHistoryList.length"
            class="flex flex-col max-w-[670px] w-full border-l px-5"
          >
            <div class="flex justify-between relative">
<!--              <span class="text-xs font-medium text-greyscale-500">{{ t('version-history') }}</span>-->
              <base-iconify
                v-if="SDStore.historyShow"
                :icon="CloseCircleBoldIcon"
                class="text-critic-500 cursor-pointer !w-8 !h-8 absolute right-0 top-2"
                @click="closeHistoryDetail"
              />
            </div>
              <div class="flex gap-x-3 overflow-x-auto h-full max-w-[80%]">
                <div
                  v-for="item in SDStore.versionHistoryList"
                  v-tooltip.top="{
                    value: `<h4 class='text-xs text-white -my-1 !w-[250px]'> ${t('change-history')} <br> ${t('author')}: ${item.created_by.full_name} <br> ${t('change-time')}: ${formatDateHour(item.created_date)}</h4>`,
                    escape: true,
                    autoHide: false
                  }"
                  class="flex justify-center items-center cursor-pointer w-12 h-full"
                  @click="getVersionHistoryDetail(item)"
                >
                <div class="flex flex-col gap-y-1 h-full items-center">
                  <div
                    class="text-[10px]"
                    :class="item.active ? 'text-primary-500' : 'text-greyscale-900'"
                  >
                    {{ t('updated') }}
                  </div>
                  <base-iconify
                    :icon="FileTextIcon"
                    class="text-greyscale-900 !w-4 !h-4"
                    :class="item.active ? 'text-primary-500' : 'text-greyscale-500'"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- /Version history -->

        </div>

        <div class="flex flex-1">
          <slot :name="activeTabMenu.slot">
            <div class="flex-1 overflow-y-auto">
              <div class="h-full">
                <component
                  :is="activeTabComponent"
                  :preview-detail="props.previewDetail"
                  :object-id="props.objectId"
                  :headers="props.headers"
                  :tree-items="props.treeItems"
                  :content-type="props.contentType"
                  :files="props.files"
                >
                  <template #preview-actions>
                    <slot name="preview-actions" />
                  </template>
                </component>
              </div>
            </div>
          </slot>

          <div class="max-w-[670px] w-full ml-auto border-l">
            <slot name="template">
              <file-tabs :resolution="props.resolution" />
            </slot>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>

</style>
