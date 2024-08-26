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
  AltArrowLeftIcon,
  EyeIcon,
  ClockCircleIcon,
  ChatLineIcon,
  FileTextIcon,
  CloseSmIcon,
  CloseCircleBoldIcon
} from '@/components/Icons'
import FileTabs from './components/FileTabs.vue'
// Enums
import { CONTENT_TYPES } from '@/enums'
import {textDifference} from "@/utils";
import {formatDateHour} from "@/utils/formatDate";
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
        label: "Просмотр",
        name: "Preview",
        icon: EyeIcon,
        slot: "preview",
        component: "Preview",
        count: null
      },
      {
        label: "История",
        name: "History",
        icon: ClockCircleIcon,
        slot: "history",
        component: "History",
        count: null
      },
      {
        label: "Комментарии",
        name: "Comments",
        icon: ChatLineIcon,
        slot: "comments",
        component: "Comments",
        count: 2
      },
      {
        label: "Файлы",
        name: "Files",
        icon: FileTextIcon,
        slot: "files",
        component: "Files"
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
          <base-button
            v-tooltip.left="{
              value: `<h4 class='text-xs text-white -my-1'>Назад</h4>`,
              escape: true,
              autoHide: false
            }"
            size="small"
            :icon-left="AltArrowLeftIcon"
            icon-width="!w-4 !h-4"
            only-icon
            outlined
            shadow
            border-color="border-transparent"
            button-class="h-8"
            @click="router.go(-1)"
          />

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
            class="flex flex-col max-w-[690px] w-full border-l px-5"
          >
            <div class="flex justify-between relative">
              <span class="text-xs font-medium text-greyscale-500">{{ t('version-history') }}</span>
              <base-iconify
                v-if="SDStore.historyShow"
                :icon="CloseCircleBoldIcon"
                class="text-critic-500 cursor-pointer !w-6 !h-6 absolute right-0 top-2"
                @click="closeHistoryDetail"
              />
            </div>
            <div class="flex gap-x-1 overflow-x-auto">
              <div
                v-for="item in SDStore.versionHistoryList"
                v-tooltip.top="{
                  value: `<h4 class='text-xs text-white -my-1 !w-[250px]'>${t('author')}: ${item.created_by.full_name} <br> ${t('change-time')}: ${formatDateHour(item.created_date)}</h4>`,
                  escape: true,
                  autoHide: false
                }"
                class="flex justify-center items-center cursor-pointer w-[37px] h-[37px]"
                :class="item.active ? 'border-b-2 border-primary-500' : 'border-b-2'"
                @click="getVersionHistoryDetail(item)"
              >
                <base-iconify
                  :icon="FileTextIcon"
                  class="text-greyscale-900 !w-4 !h-4"
                  :class="item.active ? 'text-greyscale-900' : 'text-greyscale-500'"
                />
              </div>
            </div>
          </div>
          <!-- /Version history -->
        </div>

        <div class="flex flex-1">
          <slot :name="activeTabMenu.slot">
            <div class="flex-1 overflow-y-auto">
              <div class="h-[1px]">
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

          <div class="max-w-[690px] w-full ml-auto border-l">
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
