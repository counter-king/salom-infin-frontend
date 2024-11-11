<script setup>
// Core
import { ref, shallowRef, watch, defineAsyncComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// Components
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
import { DocumentIcon, EyeIcon, ClockCircleIcon, ChatLineIcon, FileTextIcon } from '@/components/Icons'
import BackButton from '../Actions/BackButton.vue'
import FileTabs from './components/FileTabs.vue'
// Enums
import { CONTENT_TYPES } from '@/enums'
// Composable
const { t } = useI18n()
const router = useRouter()
// Macros
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  toolbar: {
    type: Boolean,
    default: true
  },
  tabItems: {
    type: Array,
    default: () => [
      {
        label: 'fishka',
        name: 'Resolution',
        icon: DocumentIcon,
        slot: 'resolution',
        component: 'Resolution',
        count: null
      },
      {
        label: 'preview-text',
        name: 'Preview',
        icon: EyeIcon,
        slot: 'preview',
        component: 'Preview',
        count: null
      },
      {
        label: 'history',
        name: 'History',
        icon: ClockCircleIcon,
        slot: 'history',
        component: 'History',
        count: null
      },
      {
        label: 'comments',
        name: 'Comments',
        icon: ChatLineIcon,
        slot: 'comments',
        component: 'Comments',
        count: 2
      },
      {
        label: 'files',
        name: 'Files',
        icon: FileTextIcon,
        slot: 'files',
        component: 'Files'
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
  hasResolution: {
    type: Boolean,
    default: false
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
  },
  self: {
    type: Boolean
  }
})
const emit = defineEmits(['emit:back-button'])
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
          <back-button
            :self="props.self"
            @click="props.self ? emit('emit:back-button') : router.go(-1)"
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
        <div class="flex h-full">
          <div class="min-w-[900px] flex-1 border-r">
            <slot name="template">
              <file-tabs :files="props.files" />
            </slot>
          </div>

          <div class="max-w-[1050px] w-full">
            <base-tab-menu v-model="activeTabMenuIndex" :tab-items="props.tabItems" />

            <slot :name="activeTabMenu.slot">
              <div class="flex-1 h-full overflow-y-auto">
                <div class="h-[1px]">
                  <component
                    :is="activeTabComponent"
                    :resolution="props.resolution"
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
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 1600px) {
  .min-w-\[900px\] {
    min-width: 768px;
  }
}

@media (max-width: 1440px) {
  .min-w-\[900px\] {
    min-width: 650px;
  }
}
</style>
