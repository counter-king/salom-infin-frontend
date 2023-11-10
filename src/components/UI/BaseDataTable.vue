<script setup>
// Core
import { useI18n } from 'vue-i18n'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import {computed} from "vue";
import {formatDateHour} from "../../utils/formatDate";
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  headers: {
    type: Array,
    default: () => []
  },
  pageSize: {
    type: [String, Number],
    default: () => 15
  },
  totalCount: {
    type: [String, Number],
    default: 0,
  },
  scrollHeight: {
    type: String,
    default: () => `calc(100vh - 310px)`
  }
})

const valueComputed = computed(() => {
  return props.value.map((item, index) => {
    return {
      index: index + 1,
      ...item
    }
  })
})
</script>

<template>
  <DataTable
    :value="valueComputed"
    :page-link-size="5"
    paginator
    paginator-position="bottom"
    paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    row-hover
    :rows-per-page-options="[10, 15, 30]"
    :rows="props.pageSize"
    currentPageReportTemplate="{first}-{last} из {totalRecords}"
    :scroll-height="props.scrollHeight"
    scrollable
    :pt="{
        table: { class: ['border-separate', 'border-spacing-y-1', '-mt-1'] },
        thead: { class: ['bg-white'] },
        bodyRow: { class: ['cursor-pointer', 'hover:bg-greyscale-50'] },
        paginator: {
          rowPerPageDropdown: {
            root: { class: ['h-6', 'rounded-2'] },
            paginatorWrapper: ['flex', 'justify-between', 'border', 'border-solid'],
            input: { class: ['flex', 'items-center', 'text-xs', 'font-semibold'] },
            dropdownicon: { class: ['w-3', 'h-3'] },
            trigger: { class: ['w-[30px]'] },
            item: { class: ['h-8', 'text-xs', 'flex', 'items-center'] },
            list: { class: ['p-0'] },
          },
          root: { class: ['h-14', 'rounded-3'] },
          paginatorWrapper: { class: ['h-14', 'rounded-3'] },
          current: { class: ['text-xs', 'text-greyscale-300', 'mr-auto', 'h-full'] },
          firstPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
          lastPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
          previousPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
          pageButton: ({ props, state, context }) => ({
              class:  [ context.active ? ['bg-primary-500', 'text-primary-0'] : undefined, 'rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'text-xs']
          }),
          nextPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] }
        }
    }"
    class="base-data-table"
    @row-click="event => console.log('Row clicked')"
  >
    <template
      v-for="header in headers"
      :key="header.field"
    >
      <Column
        :header="t(header.header)"
        :field="header.field"
        :pt="{
          headerCell: { class: ['bg-inherit', 'h-[56px]'] },
          headerContent: { class: ['text-sm', 'font-semibold', 'text-greyscale-500'] },
          bodyCell: { class: ['text-xs', 'py-0', 'h-[56px]'] }
        }"
      >
        <template #body="{ field, data }">
          <slot :name="field" :data="data">
            <span v-if="['created_date', 'modified_date'].includes(field)" class="text-sm font-medium text-greyscale-500">{{ formatDateHour(data[field]) }}</span>
            <span v-else class="text-sm font-medium text-greyscale-500">{{ data[field] }}</span>
          </slot>
        </template>
      </Column>
    </template>
  </DataTable>
</template>

<style>
th:first-child, td:first-child {
  border-radius: 12px 0 0 12px!important;
}

th:last-child, td:last-child {
  border-radius: 0 12px 12px 0!important;
}
</style>
