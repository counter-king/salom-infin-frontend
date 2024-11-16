<script setup>
// Core
import { useRoute, useRouter } from 'vue-router'
// Components
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Empty from '@/components/Empty.vue'
import HandbookTable from '@/modules/Handbook/components/HandbookTable.vue'
// Stores
import { usePaginationStore } from '@/stores/pagination.store'

// Composable
const router = useRouter()
const route = useRoute()
const paginationStore = usePaginationStore()
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
  paginator: {
    type: Boolean
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
  rowGroupMode: {
    type: String,
    default: 'rowspan',
    validator(value) {
      return ['rowspan', 'subheader'].includes(value)
    }
  },
  groupRowsBy: {
    type: String
  }
})
const emit = defineEmits(['emit:page-change'])
// Methods
const pageChange = async (val) => {
  paginationStore.page = Number(val.page + 1)
  paginationStore.pageSize = Number(val.rows)
  paginationStore.firstRow = Number(val.first)

  await router.replace({
    ...route,
    query: {
      ...route.query,
      page: paginationStore.page,
      page_size: paginationStore.pageSize,
      first_row: paginationStore.firstRow
    }
  })
  emit('emit:page-change', {
    page: paginationStore.page,
    page_size: paginationStore.pageSize
  })
}
</script>

<template>
  <div class="table-linear">
    <DataTable
      :value="props.value"
      :page-link-size="5"
      :paginator="props.paginator"
      :total-records="props.totalCount"
      :first="paginationStore.firstRow"
      :rows-per-page-options="[10, 15, 30]"
      :rows="Number(route.query.page_size) ? Number(route.query.page_size) : paginationStore.pageSize"
      :scroll-height="props.scrollHeight"
      :loading="props.loading"
      :row-group-mode="props.rowGroupMode"
      :group-rows-by="props.groupRowsBy"
      lazy
      scrollable
      paginator-position="bottom"
      currentPageReportTemplate="{first}-{last} из {totalRecords}"
      paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      :pt="{
        table: {
          class: ['border-separate']
        },
        header: {
          class: 'bg-transparent text-xs font-semibold text-greyscale-500 text-left border-none p-0'
        },
        bodyRow: {
          class: ['cursor-pointer rounded-xl hover:bg-white']
        },
        loadingoverlay: {
          class: ['bg-transparent h-[90%]']
        },
        emptymessagecell: {
          class: ['border-none']
        },
        paginator: {
          rowPerPageDropdown: {
            root: {
              class: ['h-6']
            },
            paginatorWrapper: ['flex justify-between border border-solid'],
            input: {
              class: ['flex items-center text-xs font-semibold']
            },
            dropdownicon: {
              class: ['w-3 h-3']
            },
            trigger: {
              class: ['w-[30px]']
            },
            item: {
              class: ['h-8 text-xs flex items-center']
            },
            list: {
              class: ['p-0']
            },
          },
          root: {
            class: ['h-14 rounded-xl']
          },
          paginatorWrapper: {
            class: ['h-14 rounded-xl']
          },
          current: {
            class: ['text-xs text-greyscale-300 mr-auto h-full']
          },
          firstPageButton: {
            class: ['rounded-[6px] h-6 w-6 min-w-[24px] border border-solid border-border-1']
          },
          lastPageButton: {
            class: ['rounded-[6px] h-6 w-6 min-w-[24px] border border-solid border-border-1']
          },
          previousPageButton: {
            class: ['rounded-[6px] h-6 w-6 min-w-[24px] border border-solid border-border-1']
          },
          pageButton: ({ context }) => ({
            class: [
              context.active ? ['bg-primary-500 text-primary-0'] : undefined,
              'rounded-[6px] h-6 w-6 min-w-[24px] text-xs'
            ]
          }),
          nextPageButton: {
            class: ['rounded-[6px] h-6 w-6 min-w-[24px] border border-solid border-border-1']
          },
        }
      }"
      class="base-data-table"
      @page="pageChange"
    >
      <template #header>
        <div class="flex w-full">
          <div class="flex-1 bg-greyscale-50 py-[10px] px-4 rounded-tl-lg rounded-bl-lg">
            <span class="text-xs text-greyscale-500">Ф.И.О.</span>
          </div>

          <div class="flex-1 bg-greyscale-50 py-[10px] px-4">
            <span class="text-xs text-greyscale-500">Должность</span>
          </div>

          <div class="max-w-[150px] w-full bg-greyscale-50 py-[10px] px-4">
            <span class="text-xs text-greyscale-500">Статус</span>
          </div>

          <div class="max-w-[225px] w-full bg-greyscale-50 py-[10px] px-4">
            <span class="text-xs text-greyscale-500">IP-телефона</span>
          </div>

          <div class="max-w-[225px] w-full bg-greyscale-50 py-[10px] px-4 rounded-tr-lg rounded-br-lg">
            <span class="text-xs text-greyscale-500">Корп. почта</span>
          </div>
        </div>
      </template>

      <template #groupheader="{ data }">
        <handbook-table :item="data">
          <template #department>
            <span>-</span>
          </template>
        </handbook-table>

        <template v-if="data.children && data.children.length > 0">
          <template v-for="children in data.children">
            <handbook-table :item="children" :top-level="data.name">
              <template #top-level>
                {{ data.name }}
              </template>
            </handbook-table>
          </template>
        </template>
      </template>

      <Column v-if="false"></Column>

      <template #empty>
        <empty class="h-[calc(100vh-650px)]" />
      </template>
    </DataTable>
  </div>
</template>

<style>
.table-linear .p-datatable-thead tr th:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.table-linear .p-datatable-thead tr th:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.table-linear .p-rowgroup-header > td {
  padding: 0 !important;
  border-bottom: none;
}
</style>
