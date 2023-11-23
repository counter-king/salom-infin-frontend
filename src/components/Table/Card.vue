<script setup>
import { ref, onMounted } from 'vue';
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
  // storageColumnsName: {
  //   type: String,
  //   default: "",
  //   required: true
  // },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
    <div class="card">
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
              table: { class: ['border-separate', 'border-spacing-y-1', '-mt-1'] },
              thead: { class: ['bg-white'] },
              bodyRow: { class: ['cursor-pointer', 'hover:bg-white',  'border-b-4 '] },
              loadingoverlay: { class: ['bg-transparent', 'h-[90%]'] },
              emptymessagecell: { class: ['bg-white', '!rounded-xl'] },
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
                pageButton: ({ context }) => ({
                    class:  [ context.active ? ['bg-primary-500', 'text-primary-0'] : undefined, 'rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'text-xs']
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
              :pt="{
                headerCell: { class: ['bg-inherit', 'h-[56px]', 'hidden'] },
                headerContent: { class: ['text-sm', 'font-semibold', 'text-greyscale-500'] },
                bodyCell: { class: ['text-base', 'py-0', 'h-[56px]',  'font-medium', 'text-primary-900', 'border-hidden','hover:text-primary-500', ] }
              }"
              >
            </Column>
        </DataTable>
    </div>
</template>
<style>
th:last-child, td:last-child {
  border-radius: 12px!important;
}
</style>
