<script setup>
// Core
import { ref, shallowRef, watch, defineAsyncComponent } from 'vue'
// Components
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
import {
  WidgetOutlineIcon,
  WidgetBoldIcon,
  ServerOutlineIcon,
  ServerBoldIcon,
  AlignTopBoldIcon,
  AlignTopOutlineIcon
} from '@/components/Icons'
import HeaderToolbar from '../components/HeaderToolbar.vue'
import TheFooter from '@/components/TheFooter.vue'
// Reactive
const component = shallowRef(null)
const componentType = ref('CardType')
const data = ref([])
const totalCount = ref(null)
const isSearch = ref(false)
// Methods
const handleEmitUp = (value, totalCountPage) => {
  data.value = value
  totalCount.value = totalCountPage
}
const handleSearch = (value) => {
  isSearch.value = value
  componentType.value = 'CardType'
}
// Watch
watch(
  () => componentType.value,
  (value) => {
    component.value = defineAsyncComponent({
      loader: () => import(`../components/${value}.vue`),
      loadingComponent: BaseSpinner,
      delay: 200
    })
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex flex-col flex-1 overflow-y-auto">
    <div class="handbook-view w-full p-10 pt-7">
      <header-toolbar
        @emit:up="handleEmitUp"
        @emit:search="(value) => handleSearch(value)"
      >
        <template #title-after>
          <div class="flex gap-2">
            <base-button
              label="Карточка"
              rounded
              :outlined="componentType !== 'CardType'"
              outlined
              shadow
              color="text-primary-900"
              border-color="border-transparent"
              :button-class="componentType === 'CardType' ? 'text-white' : ''"
              :icon-left="componentType === 'CardType' ? WidgetBoldIcon : WidgetOutlineIcon"
              icon-width="mr-2"
              @click="componentType = 'CardType'"
            />

            <base-button
              label="Таблица"
              rounded
              :outlined="componentType !== 'TableType'"
              shadow
              color="text-primary-900"
              border-color="border-transparent"
              :button-class="componentType === 'TableType' ? 'text-white' : ''"
              :icon-left="componentType === 'TableType' ? ServerBoldIcon : ServerOutlineIcon"
              icon-width="mr-2"
              @click="componentType = 'TableType'"
            />

            <base-button
              label="Дерево"
              rounded
              :outlined="componentType !== 'TreeType'"
              shadow
              color="text-primary-900"
              border-color="border-transparent"
              :button-class="componentType === 'TreeType' ? 'text-white' : ''"
              :icon-left="componentType === 'TreeType' ? AlignTopBoldIcon : AlignTopOutlineIcon"
              icon-width="mr-2"
              @click="componentType = 'TreeType'"
            />
          </div>
        </template>
      </header-toolbar>

      <component
        :is="component"
        :value="data"
        :is-search="isSearch"
        :total-count="totalCount"
      />
    </div>

    <div class="pl-10 pb-2">
      <the-footer/>
    </div>
  </div>
</template>
