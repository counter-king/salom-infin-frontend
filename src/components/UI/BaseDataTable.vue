<script setup>
// Core
import {computed, onMounted, reactive, ref} from "vue";
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from "vue-router";
// Components
import BaseSkeleton from "@/components/UI/BaseSkeleton.vue";
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import FieldGroups from '@/components/FieldGroups.vue'
// Utils
import { formatDateHour } from "@/utils/formatDate";
import { getStorageItem } from "@/utils/storage";
// Store
// import { usePaginationStore } from "@/stores/pagination.store";
// constants
import { pagination } from "@/constants/constants";
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  apiParams: {
    type: Object,
    default: () => {}
  },
  headers: {
    type: Array,
    default: () => []
  },
  totalCount: {
    type: [String, Number],
    default: 0,
  },
  scrollHeight: {
    type: String,
    default: () => `calc(100vh - 310px)`
  },
  storageColumnsName: {
    type: String,
    default: ""
  },
  loading: {
    type: Boolean,
    default: false
  },
  roundable: {
    type: Boolean,
    default: true
  },
  expandable: {
    type: Boolean
  },
  selectable: {
    type: Boolean
  },
  actionList: {
    type: Function,
    default: () => void 0
  },
  borderable: {
    type: Boolean,
  }
});
const emit = defineEmits([
  'emit:setStoreHeaders',
  'emit:rowClick',
  'emit:onPageChange',
  'update:selection'
]);
const router = useRouter();
const route = useRoute();
// const paginationStore = usePaginationStore();

// Reactive
const expandedRowGroups = ref()
const selection = ref()
// reactive
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
const updateSelection = (value) => {
  emit('update:selection', value)
}
// Hooks
onMounted( async () => {
  await initializeTable();
})
</script>

<template>
  <DataTable
    v-model:expanded-rows="expandedRowGroups"
    v-model:selection="selection"
    :value="valueComputed"
    lazy
    :page-link-size="5"
    :first="paginationStore.firstRow || 0"
    paginator
    paginator-position="bottom"
    paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    row-hover
    :rows-per-page-options="[10, 15, 30, 50, 100]"
    :rows="paginationStore.pageSize"
    currentPageReportTemplate="{first}-{last} из {totalRecords}"
    :scroll-height="props.scrollHeight"
    scrollable
    :total-records="props.totalCount"
    :loading="props.loading"
    :pt="{
      table: {
        class: [
          {
            'border-separate border-spacing-y-1 -mt-1': !props.borderable
          }
        ]
      },
      thead: { class: ['bg-white'] },
      bodyRow: { class: ['cursor-pointer', 'hover:bg-greyscale-50'] },
      loadingoverlay: { class: ['bg-transparent overflow-hidden', 'h-[calc(100%-56px)]'] },
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
      },
      rowExpansionCell: {
        class: '!bg-white !rounded-xl'
      }
    }"
    class="base-data-table"
    :class="{
      'base-data-table--roundable': props.roundable,
      'base-data-table--borderable': props.borderable,
    }"
    @row-click="event => emit('emit:rowClick', event.data)"
    @page="onPageChange"
    @update:selection="updateSelection"
  >
    <template v-if="props.selectable">
      <Column selectionMode="multiple" header-class="w-[60px]">
<!--        <template #body="{ index, data }">-->
<!--          das-->
<!--        </template>-->
      </Column>
    </template>

    <Column
      header="№"
      header-class="w-[60px] bg-white text-sm font-semibold text-greyscale-500"
      body-class="relative"
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

    <template
      v-for="header in headersComputed"
      :key="header.field"
    >
      <Column
        :header="t(header.header)"
        :field="header.field"
        :style="{ width: header.width }"
        :pt="{
          headerCell: { class: ['bg-inherit h-[56px]', header.class] },
          headerContent: { class: ['text-sm', 'font-semibold', 'text-greyscale-500'] },
          bodyCell: { class: ['text-sm', 'py-0', 'h-[56px]'] }
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

    <Column
      v-if="props.expandable"
      expander
      class="expander-cell bg-inherit w-4"
    />

    <template
      v-if="props.expandable"
      #expansion="{ data }"
    >
      <slot name="expansion" :data="data">
        <field-groups :headers="props.headers" :data="data">
          <template #preview-actions>
            <slot name="preview-actions" />
          </template>
        </field-groups>
      </slot>
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
<!--  <pre>{{ paginationStore.pageSize }}</pre>-->
</template>

<style>
.base-data-table--roundable th:first-child, .base-data-table--roundable td:first-child {
  border-radius: 12px 0 0 12px;
}

.base-data-table--roundable th:last-child, .base-data-table--roundable td:last-child {
  border-radius: 0 12px 12px 0;
}

.p-datatable .p-datatable-tbody > tr > td {
  border-bottom: 1px solid #E2E8F0 !important;
}
</style>
