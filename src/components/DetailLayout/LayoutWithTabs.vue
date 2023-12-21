<script setup>
// Core
import { ref, shallowRef, watch, defineAsyncComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import {useI18n} from "vue-i18n";
// Components
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
import FileTabs from './components/FileTabs.vue'
// Enums
import {CONTENT_TYPES} from "@/enums";
// Composable
const router = useRouter()
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
        icon: "EyeIcon",
        slot: "preview",
        component: "Preview",
        count: null
      },
      {
        label: "История",
        name: "History",
        icon: "ClockCircleIcon",
        slot: "history",
        component: "History",
        count: null
      },
      {
        label: "Комментарии",
        name: "Comments",
        icon: "ChatLineIcon",
        slot: "comments",
        component: "Comments",
        count: 2
      },
      {
        label: "Файлы",
        name: "Files",
        icon: "FileTextIcon",
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
  contentType: {
    type: Number,
    default: CONTENT_TYPES.DOC_FLOW
  }
})
const { t } = useI18n();
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
            icon-left="AltArrowLeftIcon"
            only-icon
            outlined
            shadow
            icon-width="16"
            border-color="border-transparent"
            button-class="h-8"
            @click="router.go(-1)"
          />

          <h1 class="font-bold text-xl text-primary-900">{{ t(props.title) }}</h1>
        </div>

        <div class="flex items-center gap-2">
          <slot name="header-end" />
        </div>
      </div>
    </template>

    <div class="detail-layout-content flex flex-col flex-1 bg-white overflow-hidden shadow-button rounded-2xl">
      <slot name="content">
        <base-tab-menu v-model="activeTabMenuIndex" :tab-items="props.tabItems" />

        <div class="flex flex-1">
          <slot :name="activeTabMenu.slot">
            <div class="flex-1 overflow-y-auto">
              <div class="h-[1px]">
                <component
                  :is="activeTabComponent"
                  :preview-detail="props.previewDetail"
                  :object-id="props.objectId"
                  :headers="props.headers"
                  :content-type="props.contentType"
                >
                  <template #preview-actions>
                    <slot name="preview-actions" />
                  </template>
                </component>
              </div>
            </div>
          </slot>

          <div class="max-w-[566px] w-full ml-auto border-l">
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
