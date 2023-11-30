<script setup>
// Components
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
// Macros
const props = defineProps({
  headers: {
    type: Array,
    default: () => []
  },
  value: {
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
  },
  loading: {
    type: Boolean,
    default: false
  },
  shadow: {
    type: Boolean,
    default: true
  },
  bodyCellClass: {
    type: String,
    default: 'bg-white'
  },
  paginatorRootClass: {
    type: String,
    default: 'bg-white'
  },
  tableClass: {
    type: String,
    default: null
  },
  theadClass:{
    type: String,
    default: null
  }
})
</script>

<template>
  <div class="table-card">
    <DataTable
      :value="props.value"
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
        table: { class: ['border-separate', 'border-spacing-y-1', '-mt-1', props.tableClass] },
        thead: { class: ['bg-white', props.theadClass ] },
        bodyRow: { class: ['cursor-pointer bg-transparent rounded-xl', { 'shadow-button': props.shadow }] },
        loadingoverlay: { class: ['bg-transparent', 'h-[90%]'] },
        emptymessagecell: { class: ['bg-white', '!rounded-xl'] },
        paginator: {
          rowPerPageDropdown: {
            root: { class: ['h-6'] },
            paginatorWrapper: ['flex', 'justify-between', 'border', 'border-solid'],
            input: { class: ['flex', 'items-center', 'text-xs', 'font-semibold'] },
            dropdownicon: { class: ['w-3', 'h-3'] },
            trigger: { class: ['w-[30px]'] },
            item: { class: ['h-8', 'text-xs', 'flex', 'items-center'] },
            list: { class: ['p-0'] },
          },
          root: { class: [props.paginatorRootClass, 'h-14 rounded-xl'] },
          paginatorWrapper: { class: ['h-14 rounded-xl'] },
          current: { class: ['text-xs', 'text-greyscale-300', 'mr-auto', 'h-full'] },
          firstPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
          lastPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
          previousPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
          pageButton: ({ context }) => ({
            class: [ context.active ? ['bg-primary-500', 'text-primary-0'] : undefined, 'rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'text-xs']
          }),
          nextPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] }
        }
      }"
      class="base-data-table"
    >
      <Column
        v-for="col of headers"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :style="{width: col.width}"
        :pt="{
          headerCell: { class: ['bg-inherit', 'h-[56px]',  props.theadClass] },
          headerContent: { class: ['text-sm', 'font-semibold', 'text-greyscale-500'] },
          bodyCell: { class: [props.bodyCellClass, 'text-base', 'py-0', 'h-[56px]', 'font-medium', 'text-primary-900', 'border-hidden', 'hover:text-primary-500', ] }
        }"
      >
        <template #body="{ field, data }">
          <slot :name="field" :data="data" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style>
.table-card tr th:first-child,
.table-card tr td:first-child {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.table-card tr th:last-child,
.table-card tr td:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}
</style>
