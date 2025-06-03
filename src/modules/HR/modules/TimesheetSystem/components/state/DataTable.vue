<script setup>
// core
import { reactive, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
// components
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// Utils
import { getStorageItem } from "@/utils/storage";
// constants
import { pagination } from "@/constants/constants";

// composibles
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
// props
const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  headers: {
    type: Array,
    default: () => []
  },
  scrollHeight: {
    type: String,
    default: () => 'calc(100vh - 295px)'
  },
  totalCount: {
    type: Number,
    default: () => 0
  },
  storageColumnsName: {
    type: String,
    default: ""
  },
  loading: {
    type: Boolean,
    default: () => false
  },
  apiParams: {
    type: Object,
    default: () => {}
  },
  actionList: {
    type: Function,
    default: () => void 0
  },
  bodyCellClass: {
    type: [String, Array, Object],
    default: () => ''
  },
  bodyCellContentClass: {
    type: [String, Array, Object],
    default: () => ''
  },
  headerCellClass: {
    type: [String, Array, Object],
    default: () => ''
  },
  headerCellContentClass: {
    type: [String, Array, Object],
    default: () => ''
  },
  pageSize: {
    type: Number,
    default: () => 10
  }
})
// emits
const emit = defineEmits([
  'emit:setStoreHeaders',
  'emit:rowClick',
  'emit:onPageChange',
  'update:selection',
  'emit:onSort'
]);

// reactives
const paginationStore = reactive({
  page: pagination.page || route.query.page,
  pageSize: props.pageSize || pagination.pageSize || route.query.page_size,
  firstRow: pagination.firstRow || +route.query.firstRow,
});

// Computed
const headersComputed = computed(() => {
  return props.headers.filter(header => header.active);
});

const valueComputed = computed(() => {
  return props.value.map((item, index) => {
    return {
      index: index + 1,
      ...item
    }
  })
});

// Methods
const onPageChange = async (val) => {
  paginationStore.page = val.page + 1;
  paginationStore.pageSize = val.rows;
  paginationStore.firstRow = val.first;

  await router.replace({
      ...route,
      query: {
        ...route.query,
        page: paginationStore.page,
        page_size: paginationStore.pageSize,
        first_row: paginationStore.firstRow
      }
    });

  await props.actionList({ ...route.query, page: paginationStore.page, page_size: paginationStore.pageSize });

  emit('emit:onPageChange', paginationStore.page)
}

const initializeTable = async () => {
  if (route.query && route.query.page && route.query.page_size && route.query.first_row) {
    paginationStore.page = Number(route.query.page);
    paginationStore.pageSize = Number(route.query.page_size);
    paginationStore.firstRow = Number(route.query.first_row);
    await props.actionList({ ...route.query, page: paginationStore.page, page_size: paginationStore.pageSize });
  } else if (route.query && props.apiParams) {
    await props.actionList({ ...props.apiParams, ...route.query });
  } else if (props.apiParams){
    await props.actionList({...props.apiParams});
  } else {
    await props.actionList({ page: paginationStore.page, page_size: paginationStore.pageSize });
  }
  if (getStorageItem(props.storageColumnsName)){
    emit('emit:setStoreHeaders', JSON.parse(getStorageItem(props.storageColumnsName)))
  }
}

// Hooks
onMounted( async () => {
  await initializeTable();
})

</script>
<template>
  <DataTable 
    :value="valueComputed" 
    :headers="headersComputed"
    :first="paginationStore.firstRow || 0"
    :page-link-size="5"
    paginator
    lazy
    paginator-position="bottom"
    :rows-per-page-options="[10, 15, 30, 50, 100]"
    paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    currentPageReportTemplate="{first}-{last} из {totalRecords}"
    :rows="paginationStore.pageSize"
    :scroll-height="props.scrollHeight"
    :total-records="props.totalCount"
    :loading="props.loading"
    scrollable
    @sort="(event) => emit('emit:onSort', event)"
    @row-click="event => emit('emit:rowClick', event.data)"
    @page="onPageChange"
    :pt="
    {
      table: {
        class: [
          {
            // 'border-separate border-spacing-y-1 -mt-1': true
          }
        ]
      },
      
      thead: { class: ['bg-inherit'] },
      bodyRow: { class: ['cursor-pointer text-sm font-medium greyscale-900', 'hover:bg-white','last:border-b last:border-b-greyscale-100'] },
      loadingoverlay: { class: ['bg-transparent overflow-hidden', 'h-[calc(100%-56px)]'] },
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
        root: { class: ['h-14 rounded-none bg-white rounded-br-[12px] rounded-bl-[12px]  bg-greyscale-50'] },
        paginatorWrapper: { class: ['h-10', 'border-0'] },
        current: { class: ['text-xs text-greyscale-300 mr-auto h-full' ]},
        firstPageButton: { class: ['rounded-[6px]', 'h-7', 'w-7', 'min-w-[28px]', 'border greyscale-100', 'border-solid', 'border-border-1'] },
        lastPageButton: { class: ['rounded-[6px]', 'h-7', 'w-7', 'min-w-[28px]', 'border greyscale-100', 'border-solid', 'border-border-1'] },
        previousPageButton: { class: ['rounded-[6px]', 'h-7', 'w-7', 'min-w-[28px]', 'border greyscale-100', 'border-solid', 'border-border-1 '] },
        pageButton: ({ context }) => ({
            class:  [ context.active ? ['bg-white', 'text-greyscale-900'] : undefined, 'rounded-[6px] font-medium greyscale-400', 'h-6', 'w-6', 'min-w-[24px]', 'text-[13px]']
        }),
        pages: { class: ['flex items-center gap-[2px] bg-greyscale-50 rounded-[6px] p-[2px]'] },
        nextPageButton: { class: ['rounded-[6px]', 'h-7', 'w-7', 'min-w-[28px]', 'border greyscale-100', 'border-solid', 'border-border-1'] }
      },
    }"
    >
    <Column
      header="№"
      :pt="{
        headerCell: {
          class: ['bg-greyscale-50 px-[10px] h-[48px] border-0 border-r border-greyscale-200', props.headerCellClass]
        },
        headerContent: {
          class: ['text-sm font-semibold text-greyscale-500', props.headerCellContentClass]
        },
        bodyCell: {
          class: ['border-greyscale-100 py-3 px-4 border-0 border-t border-r', props.bodyCellClass],
        },
        bodyCellContent: {
          class: ['text-sm font-medium text-greyscale-900', props.bodyCellContentClass]
        },
      }"
      >
        <template #body="{ index, data }">
          <slot
            name="count"
            :index="index"
            :data="data"
          >
            <span class="text-sm font-medium text-greyscale-500">{{ (paginationStore.pageSize * paginationStore.page + 1) - (paginationStore.pageSize - index) }}</span>
          </slot>
        </template>
      </Column>
    <template v-for="(header, index) in headersComputed" :key="header.field">
      <Column
        sortable
        :field="header.field"
        :header="t(header.header)"
        :style="{ width: header.width }"
        :pt="{
          headerCell: { 
            class: ['bg-greyscale-50 px-[11px] h-[48px] border-0 border-r border-greyscale-200 last:border-r-0', props.headerCellClass]
          },
          headerContent: {
            class: ['gap-1 text-sm font-semibold text-greyscale-500', props.headerCellContentClass]
          },
          bodyCell: {
            class: ['border-greyscale-100 py-3 px-4 border-0 border-t border-r last:border-r-0', props.bodyCellClass],
          },
          bodyCellContent: {
            class: ['text-sm font-medium text-greyscale-900', props.bodyCellContentClass]
          },
      }"
      >
        <template #sorticon>
          <slot :name="'headerIcon' + header.field" :data="header"></slot>
        </template>
        <template #body="{ field, data }" >
         <slot :name="field" :data="data"  :field="field" class="order-1">
            <span>{{ data[field] }}</span>
         </slot>
        </template>       
      </Column>
    </template>
    <template #loading>
      <base-skeleton
        :columns="props.headers"
      />
    </template>
    <template #empty>
      <slot name="empty">
        <div
          class="w-full flex justify-center items-center rounded-lg"
          style="height: calc(100vh - 390px)"
        >
          <img class="w-[200px] h-[170px]" src="@/assets/img/empty-img-gray.png" alt="EmptyFolder">
        </div>
      </slot>
    </template>
  </DataTable>
</template>
<style scoped>

</style>