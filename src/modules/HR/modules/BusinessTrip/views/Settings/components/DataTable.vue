<script setup>
// core
import { reactive, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
// components
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// Utils
import { formatDateHour } from "@/utils/formatDate";
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
  headerCellClass: {
    type: [String, Array, Object],
    default: () => ''
  }
})
// emits
const emit = defineEmits([
  'emit:setStoreHeaders',
  'emit:rowClick',
  'emit:onPageChange',
  'update:selection'
]);

// reactives
const paginationStore = reactive({
  page: pagination.page || route.query.page,
  pageSize: pagination.pageSize || route.query.page_size,
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
    await props.actionList({ ...props.apiParams});
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
    :page-link-size="5"
    :first="paginationStore.firstRow || 0"
    paginator
    paginator-position="bottom"
    :rows-per-page-options="[10, 15, 30, 50, 100]"
    paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    currentPageReportTemplate="{first}-{last} из {totalRecords}"
    :rows="paginationStore.pageSize"
    :scroll-height="props.scrollHeight"
    :total-records="props.totalCount"
    :loading="props.loading"
    scrollable
    @row-click="event => emit('emit:rowClick', event.data)"
    @page="onPageChange"
    :pt="
    {
      bodyRow:(context) => { 
        return ({
         class: ['border-greyscale-100 cursor-pointer hover:bg-greyscale-50 border-b-[1px]', {'!border-b-[0px]': context.context?.index == valueComputed?.length - 1}]
      })},
      root: {
      },
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
        root: { class: ['h-10 rounded-3  bg-greyscale-50 rounded-3'] },
        paginatorWrapper: { class: ['h-10', 'rounded-3 border-0 mt-auto'] },
        current: { class: ['text-xs', 'text-greyscale-300', 'mr-auto', 'h-full'] },
        firstPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
        lastPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
        previousPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
        pageButton: ({ context }) => ({
            class:  [ context.active ? ['bg-primary-500', 'text-primary-0'] : undefined, 'rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'text-xs']
        }),
        nextPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] }
      },
    }"
    >
    <Column
      header="№"
      :pt="{
        headerCell: {
          class: [
            'bg-greyscale-50', 'py-[10px]', 'px-4', 'border-none',
            'rounded-l-[12px]',
            props.headerCellClass
          ]
        },
        headerContent: {
          class: ['text-sm font-semibold text-greyscale-500 border-none']
        },
        bodyCell: {
          class: ['border-greyscale-100 py-3 px-4 text-sm font-semibold text-primary-900 border-0',
          'rounded-l-[12px]',
          props.bodyCellClass
          ]
        }
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
        :field="header.field"
        :header="t(header.header)"
        :style="{ width: header.width }"
        :pt="{
          headerCell: {
            class: [
              'bg-greyscale-50', 'py-[10px]', 'px-4', 'border-none',
              index === headersComputed.length - 1 ? 'rounded-r-[12px]' : '',
              props.headerCellClass
            ]
          },
          headerContent: {
            class: ['text-sm font-semibold text-greyscale-500 border-nonex']
          },
          bodyCell: {
            class: ['border-greyscale-100 py-3 px-4 text-sm font-semibold text-primary-900 border-0',
              index === headersComputed.length - 1 ? 'rounded-r-[12px]' : '',
              props.bodyCellClass
            ]
          }
        }"
      >
        <template #body="{ field, data }">
         <slot :name="field" :data="data"  :field="field">
            <span>{{ data[field] }}</span>
         </slot>
        </template>
      </Column>
    </template>
  </DataTable>
</template>
<style scoped>

</style>