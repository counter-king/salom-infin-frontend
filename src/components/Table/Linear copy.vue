<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// Components
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
// Stores
import { usePaginationStore } from '@/stores/pagination.store'
// Composable
const router = useRouter()
const route = useRoute()
const { t } = useI18n()
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
// Reactive
const cellWidth = ref([])
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
// Hooks
onMounted(() => {
  cellWidth.value = []
  let data = document.querySelectorAll('[data-pc-section="rowgroupheadercell"]')
  data.forEach(el => el.setAttribute('colspan', props.headers.length))

  let items = document.querySelectorAll('[data-pc-section="headercell"]')
  items.forEach(el => cellWidth.value.push(el.clientWidth))
})
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
        bodyRow: {
          class: ['cursor-pointer rounded-xl hover:bg-white']
        },
        loadingoverlay: {
          class: ['bg-transparent h-[90%]']
        },
        emptymessagecell: {
          class: ['bg-white !rounded-xl']
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
      <template #groupheader="{ data }">
        <div class="flex !bg-white">
          <div class="flex items-end gap-[6px] font-semibold py-[10px] px-4 truncate" :style="{ width: `${cellWidth[0]}px` }">
            <span class="text-xs text-greyscale-500">Департамент:</span>
            <span class="text-sm text-primary-500 truncate">{{ data.sub.dep_name }}</span>
          </div>

          <div class="flex items-end gap-[6px] font-semibold py-[10px] px-4 truncate" :style="{ width: `${cellWidth[1]}px` }">
            <span class="text-xs text-greyscale-500">Отдел:</span>
            <span class="text-sm text-primary-500 truncate">{{ data.sub.department }}</span>
          </div>

          <div class="flex items-end gap-[6px] font-semibold py-[10px] px-4" :style="{ width: `${cellWidth[2]}px` }"></div>

          <div class="flex items-end gap-[6px] font-semibold py-[10px] px-4" :style="{ width: `${cellWidth[3]}px` }">
            <span class="text-xs text-greyscale-500">Filial:</span>
            <span class="text-sm text-primary-500">{{ data.sub.is_main }}</span>
          </div>

          <div class="flex items-end gap-[6px] font-semibold py-[10px] px-4" :style="{ width: `${cellWidth[4]}px` }"></div>
        </div>
      </template>

      <Column
        v-for="col of headers"
        :key="col.field"
        :field="col.field"
        :header="t(col.header)"
        :style="{ width: col.width }"
        :pt="{
          headerCell: {
            class: ['bg-greyscale-50 h-10 border-none py-[10px] px-4']
          },
          headerContent: {
            class: ['text-xs font-semibold text-greyscale-500']
          },
          bodyCell: {
            class: ['h-12 text-sm font-medium text-primary-900 border-b-[1.5px] border-greyscale-100 py-0']
          }
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
.table-linear .p-datatable-thead tr th:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.table-linear .p-datatable-thead tr th:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.table-linear .p-rowgroup-header td {
  padding: 0 !important;
  border-bottom: 1.5px solid #A19CFF;
}
</style>
