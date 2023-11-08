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
  filterState: {
    type: Object,
    default: () => {},
    required: true
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
    paginatorTemplate="RowsPerPageDropdown CurrentPageReport PrevPageLink PageLinks NextPageLink"
    row-hover
    :rows-per-page-options="[10, 15, 30]"
    :rows="props.filterState.page_size"
    :currentPageReportTemplate="`${'1-8'} из ${'50'}`"
    scrollable
    scroll-height="700px"
    :pt="{
        table: { class: ['border-separate', 'border-spacing-y-1', '-mt-1'] },
        thead: { class: ['bg-white'] },
        bodyRow: { class: ['cursor-pointer', 'hover:bg-greyscale-50'] },
        paginator: {
          rowPerPageDropdown: {
            root: { class: ['h-[24px]', 'w-[60px]', 'rounded-[8px]'] },
            input: { class: ['flex', 'items-center', 'text-xs', 'font-semibold'] },
            dropdownicon: { class: ['w-[12px]', 'h-[12px]'] },
            trigger: { class: ['w-[30px]'] },
            item: { class: ['h-8', 'text-xs', 'flex', 'items-center'] },
            list: { class: ['p-0'] },
            previousPageButton: { class: 'bg-primary-500' }
          },
          current: { class: ['text-xs', 'text-greyscale-300'] },
          previousPageButton: { class: 'bg-primary-500' }
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

/*.base-data-table .p-paginator {
  height: 56px!important;
}

.base-data-table .p-inputwrapper {
  height: 30px!important;
}

.base-data-table .p-dropdown-label {
  display: flex;
  align-items: center;
}
.base-data-table .p-inputtext {
  font-size: 14px;
  font-weight: 500;
}
.base-data-table .p-icon {
  width: 14px !important;
  height: 14px !important;
}*/
</style>
