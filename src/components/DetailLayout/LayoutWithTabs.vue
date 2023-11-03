<script setup>
// Core
import { ref, shallowRef, watch, defineAsyncComponent } from 'vue'
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
  tabView: {
    type: Array,
    default: () => [
      {
        title: "Просмотр",
        name: "Preview",
        icon: "EyeIcon",
        slot: "preview",
        component: "Preview",
        count: null
      },
      {
        title: "История",
        name: "History",
        icon: "ClockCircleIcon",
        slot: "history",
        component: "History",
        count: null
      },
      {
        title: "Комментарии",
        name: "Comments",
        icon: "ChatLineIcon",
        slot: "comments",
        component: "Comments",
        count: 2
      },
      {
        title: "Файлы",
        name: "Files",
        icon: "FileTextIcon",
        slot: "files",
        component: "Files"
      }
    ]
  }
})
// Reactive
const activeTab = ref(props.tabView[0])
const activeTabComponent = shallowRef(null)
// Watch
watch(activeTab, (value) => {
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

    <div class="detail-layout-content flex-1 bg-white shadow-button rounded-2xl overflow-y-auto">
      <slot name="content">
        <base-tab-view
          :tab-view="props.tabView"
          @emit:tab-click="(value) => activeTab = value"
        >
          <template v-for="pane in props.tabView" #[pane.slot]>
            <slot :name="pane.slot">
              <component :is="activeTabComponent" />
            </slot>
          </template>
        </base-tab-view>
      </slot>
    </div>
  </div>
</template>

<style scoped>

</style>
