<script setup>
// core
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
// components
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { PenBoldIcon, TrashBinTrashIcon } from '@/components/Icons'

const { t } = useI18n()
// macros
const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  headers: {
    type: Array,
    default: () => []
  }
})

const value = ref([
  {
    order: 1,
    targets: 'targets',
    documentType: 'document-type',
    actions: true
  },
])

const defaultFilter = { page: 1, page_size: 15, search: '' };
const filter = ref(defaultFilter);
const count = ref(100);
const paginationConfig = {
   current: { class: ['text-xs', 'text-greyscale-300', 'mr-auto', 'h-full'] },
   firstPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
   lastPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
   nextPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
   pageButton: ({ context }) => ({ class:  [ context.active ? ['bg-primary-500', 'text-primary-0'] : undefined, 'rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'text-xs'] }),
   paginatorWrapper: { class: ['w-[100%]'] },
   previousPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
   root: { class: ['h-14', 'rounded-4 w-full rounded-[12px]'] },
   start: { class: ['m-0'] }
};

const dropdownConfig = {
   dropdownicon: { class: ['w-3', 'h-3'] },
   input: { class: ['flex', 'items-center', 'text-xs', 'font-semibold'] },
   item: { class: ['h-8', 'text-xs', 'flex', 'items-center'] },
   list: { class: ['p-0'] },
   paginatorWrapper: ['flex', 'justify-between', 'border', 'border-solid'],
   root: { class: ['h-7', 'rounded-2',  'm-0'] },
   trigger: { class: ['w-[30px]'] },
};

</script>
<template>
  <DataTable 
    :value="value" tableStyle="min-width: 50rem" :headers="headers"
  >
    <Column
      v-for="(col, index) in headers"
      :key="col.field"
      :field="col.field"
      :header="t(col.header)"
      :pt="{
        headerCell: {
          class: [
            'bg-greyscale-50', 'py-[10px]', 'px-4', 'border-none', col.width,
            index === 0 ? 'rounded-l-[12px]' : '',
            index === headers.length - 1 ? 'rounded-r-[12px]' : ''
          ]
        },
        headerContent: {
          class: ['text-sm font-semibold text-greyscale-500 border-none']
        },
        bodyCell: {
          class: ['border-greyscale-100 py-[22px] px-4 text-sm font-semibold text-primary-900']
        }
      }"
    >
     <template v-if="col.field === 'order'" #body="{ data, index }">
        <span>{{ index + 1 }}</span>
      </template>
      <template v-if="col.field === 'actions'" #body="{ data, index }">
        <div class="flex gap-2">
          <div class="p-[6px] bg-greyscale-50 rounded-[8px] cursor-pointer hover:bg-greyscale-70">
            <base-iconify :icon="PenBoldIcon" class="!w-5 !h-5 text-greyscale-500"/>
          </div>
          <div class="p-[6px] bg-greyscale-50 rounded-[8px] cursor-pointer hover:bg-greyscale-70">
            <base-iconify :icon="TrashBinTrashIcon" class="!w-5 !h-5 text-critic-500"/>
          </div>
        </div>
      </template>
    </Column>
  </DataTable>
  <div class="flex justify-end">
    <Paginator
        :first="(filter.page - 1) * filter.page_size"
        :pt="paginationConfig"
        :rows="filter.page_size"
        :totalRecords="count || 200"
        @page="onChangePage"
        currentPageReportTemplate="{first}-{last} из {totalRecords}"
        template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        >
        <template #start>
          <Dropdown
            :options="dropdownOptions"
            :pt="dropdownConfig"
            @change="onChangePageSize"
            optionLabel="name"
            optionValue="page_size"
            v-model="filter.page_size"
            />
        </template>
      </Paginator>
  </div>
</template>
<style scoped>

</style>