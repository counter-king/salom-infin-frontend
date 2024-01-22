<script setup>
// Core
import {computed, onMounted, ref} from "vue";
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
    default: "",
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  expandable: {
    type: Boolean
  },
  actionList: {
    type: Function,
    default: () => void 0
  }
});
const router = useRouter();
const route = useRoute();
const page = ref(1);
const pageSize = ref(10);
const firstRow = ref(0);
// Reactive
const expandedRowGroups = ref();
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

// const firstRow = computed(() => {
//   return route.query?.page ? Number(route.query.page) * Number(pageSize.value) - 1 : Number(page.value) * Number(pageSize.value) - 1;
// })

// Methods
const onPageChange = async (val) => {
  page.value = val.page + 1;
  pageSize.value = val.rows;
  // emit('emit:onPageChange', val);
  await router.replace({
    ...route,
    query: {
      ...route.query,
      page: val.page + 1,
      page_size: val.rows
    }
  });
  const response = await props.actionList({ ...route.query, page: val.page + 1, page_size: val.rows });
}
const initializeTable = async () => {
  if (route.query && route.query.page && route.query.page_size){
    await props.actionList({ ...route.query, page: route.query.page, page_size: route.query.page_size });
  } else if (route.query && route.query.length) {
    await props.actionList({ ...route.query });
  } else if (props.apiParams){
    await props.actionList({ ...props.apiParams});
  } else {
    await props.actionList({ page: page.value, page_size: pageSize.value });
  }
  if (route.query && route.query.page && route.query.page_size){
    firstRow.value = Number(route.query.page) * Number(route.query.page_size) - 1;
  } else {
    firstRow.value = Number(page.value) * Number(pageSize.value) - 1;
  }
  if (getStorageItem(props.storageColumnsName)){
    emit('emit:setStoreHeaders', JSON.parse(getStorageItem(props.storageColumnsName)))
  }
}

onMounted( async () => {
  await initializeTable();
})

const emit = defineEmits(['emit:setStoreHeaders', 'emit:rowClick', 'emit:onPageChange']);

</script>

<template>
  <DataTable
    v-model:expanded-rows="expandedRowGroups"
    :value="valueComputed"
    :current-page="page"
    lazy
    :page-link-size="5"
    :first="firstRow"
    paginator
    paginator-position="bottom"
    paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    row-hover
    :rows-per-page-options="[10, 15, 30]"
    :rows="pageSize"
    currentPageReportTemplate="{first}-{last} из {totalRecords}"
    :scroll-height="props.scrollHeight"
    scrollable
    :total-records="props.totalCount"
    :loading="props.loading"
    :pt="{
      table: { class: ['border-separate', 'border-spacing-y-1', '-mt-1'] },
      thead: { class: ['bg-white'] },
      bodyRow: { class: ['cursor-pointer', 'hover:bg-greyscale-50'] },
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
      },
      rowExpansionCell: {
        class: '!bg-white !rounded-xl'
      }
    }"
    class="base-data-table"
    @row-click="event => emit('emit:rowClick', event.data)"
    @page="onPageChange"
  >
    <template
      v-for="header in headersComputed"
      :key="header.field"
    >
      <Column
        :header="t(header.header)"
        :field="header.field"
        :pt="{
          headerCell: { class: ['bg-inherit', 'h-[56px]'] },
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
      <div
        class="w-full flex justify-center items-center rounded-lg"
        style="height: calc(100vh - 420px)"
      >
        <img class="w-[200px] h-[170px]" src="@/assets/img/empty-img-gray.png" alt="EmptyFolder">
      </div>
    </template>
  </DataTable>
</template>

<style>
th:first-child, td:first-child {
  border-radius: 12px 0 0 12px;
}

th:last-child, td:last-child {
  border-radius: 0 12px 12px 0;
}
</style>
