<script setup>
// Core
import { ref, shallowRef, watch, defineAsyncComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
// Components
import BaseSpinner from "@/components/UI/BaseSpinner.vue"
// Composable
const router = useRouter()
// Macros
const props = defineProps({
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
    type: Array,
    default: () => []
  }
})
// Reactive
const activeTabMenuIndex = ref(0)
const activeTab = ref(props.tabItems[0])
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

          <h1 class="font-bold text-xl text-primary-900">Управление сотрудниками</h1>
        </div>

        <div class="flex items-center">
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
                <component :is="activeTabComponent" :preview-detail="props.previewDetail">
                  <template #preview-actions>
                    <slot name="preview-actions" />
                  </template>
                </component>
              </div>
            </div>
          </slot>

          <div class="max-w-[566px] w-full ml-auto border-l">
            resolution
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>

</style>
