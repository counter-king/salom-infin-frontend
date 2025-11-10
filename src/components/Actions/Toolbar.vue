<script setup>
// Core
import { onMounted, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { useDebounce } from "@vueuse/core"
import { useRoute, useRouter } from "vue-router"
// Components
import { CalendarMenu, ColumnMenu, ExportButton, FilterMenu} from "./index"
import { MagniferIcon } from "@/components/Icons"
import BaseInput from "@/components/UI/BaseInput.vue"
import DownloadFiles from "@/components/Actions/DownloadFiles.vue";
import { JOURNAL } from "@/enums";

const props = defineProps({
  title: {
    type: String,
    default: 'create'
  },
  columnMenuItems: {
    type: Array,
    default: () => []
  },
  storageColumnsName: {
    type: String,
    default: () => ""
  },
  actionList: {
    type: Function,
    default: () => void 0
  },
  apiParams: {
    type: Object,
    default: () => {}
  },
  filterKeys: {
    type: Array,
    default: () => []
  },
  keysToIncludeOnClearFilter: {
    type: Array,
    default: () => []
  },
  searchField: {
    type: Boolean,
    default: false
  },
  actionButtons: {
    type: Array,
    default: ['export', 'calendar', 'filter']
  },
  onExportClick: {
    type: Function,
  },
  exportButtonLoading: {
    type: Boolean,
    default: false
  },
  filterItems: {
    type: Array,
    default: () => []
  }
})

// Reactive
const search = ref(null)

const { t } = useI18n()
const debouncedSearch = useDebounce(search, 750)
const route = useRoute()
const router = useRouter()

// Watcher
watch(debouncedSearch, async (value) => {
  if (value) {
    await router.replace({
      query: {
        ...route.query,
        search: value
      }
    })
    props.actionList({
      ...route.query,
      ...props.apiParams,
      search: value,
      page: 1,
      page_size: 15
    })

  } else {
    await router.replace({
      query: {
        ...route.query,
        search: null
      }
    })
    props.actionList({
      ...route.query,
      ...props.apiParams
    })
  }
})

// Hooks
onMounted(() => {
  if (route.query?.search) {
    search.value = route.query.search
  }
})

const emits = defineEmits(['emit:resetHeaders', 'emit:onFilterChange'])
</script>

<template>
  <div class="flex mb-5 justify-between items-center">
    <div class="flex items-center gap-4">
      <slot name="title-before" />

      <h1 class="text-2xl font-bold text-primary-900">{{ t(props.title) }}</h1>

      <div
        v-if="filterItems && filterItems.length"
        class="flex items-center gap-x-2"
      >
        <div
          v-for="item in filterItems"
          :key="item.id"
          class="py-2 px-4 rounded-[32px] text-sm font-semibold cursor-pointer flex gap-x-[6px]"
          :class="item.active ? 'bg-primary-500 text-white' : 'bg-white text-greyscale-900'"
          @click="emits('emit:onFilterChange', item)"
        >
          <span>{{ t(item.title) }}</span>

          <div
            v-if="item.count"
            class="w-5 h-5 rounded-full flex items-center justify-center bg-primary-400  text-white text-[10px]"
          >
            {{ item.count }}
          </div>
        </div>
      </div>

      <slot name="title-after" />
    </div>

    <div class="flex items-center justify-end flex-1 gap-2">
      <slot name="filter-before" />

      <slot name="filters">

        <div
          v-if="searchField"
          class="w-full max-w-[316px]"
        >
          <base-input
            v-model="search"
            :icon-left="MagniferIcon"
            :placeholder="t('search')"
            class="flex p-input-icon-left items-center"
            input-class="!pl-10 p-3 bg-white text-xs !rounded-[90px] placeholder:text-xs"
            icon-left-class="!w-4 !h-4"
            clearable
          />
        </div>

        <export-button
          v-if="actionButtons.includes('export')"
          :export-button-loading="exportButtonLoading"
          :on-export-click="onExportClick"
        />

        <calendar-menu
          v-if="actionButtons.includes('calendar')"
          :action-list="props.actionList"
          :keys-to-include-on-clear-filter="props.keysToIncludeOnClearFilter"
        />

        <filter-menu
          v-if="actionButtons.includes('filter')"
          :action-list="props.actionList"
          :filter-keys="props.filterKeys"
          :keys-to-include-on-clear-filter="props.keysToIncludeOnClearFilter"
        />

        <download-files
          v-if="Number(route.query?.journal_id) === JOURNAL.ACT"
        />

        <column-menu
          v-if="columnMenuItems?.length"
          :items="props.columnMenuItems"
          :storage-columns-name="props.storageColumnsName"
          @emit:reset-headers="emits('emit:resetHeaders')"
        />
      </slot>

      <slot name="end"/>
    </div>
  </div>
</template>

<style scoped>

</style>
