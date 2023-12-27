<script setup>
import Button from 'primevue/button';
import CreateDocumentType from './CreateDocumentType.vue';
import DataTable from 'primevue/datatable';
import DocumentType from './DocumentType.vue';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import Skeleton from 'primevue/skeleton';
import axiosConfig from "@/services/axios.config";
import { ref, watch, onMounted } from 'vue';
import { tableConfig, columnConfig, dropdownConfig, paginationConfig, dropdownOptions } from './config';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const defaultFilter = { page: 1, page_size: 10, search: '' };
const count = ref(1);
const documentTypes = ref([]);
const filter = ref(defaultFilter);
const headers = ref([]);
const loading = ref(false);
const visible = ref(false);
const getDocumentTypes = (newFilter = {}) => {
  loading.value = true;
  filter.value = newFilter;
  const { page, page_size, search } = newFilter;
  const params = `?page=${page}${page_size ? '&page_size=' + page_size : ''}${search ? '&search=' + search : ''}`;
  axiosConfig
    .get(`document-types/${params}`)
    .then(response => {
      const results = response?.data?.results;
      const newCount = response?.data?.count;
      const newDocumentTypes = Array.isArray(results) ? results: [];
      documentTypes.value = newDocumentTypes;
      count.value = newCount;
    })
    .catch(() => {
      documentTypes.value = [];
    })
    .finally(() => {
      loading.value = false;
    });
};
const searchDocumentTypes = search => {
  const newFilter = { ...filter.value, page: 1, search };
  getDocumentTypes(newFilter);
};
const onChangePage = ({ page }) => {
  const newFilter = { ...filter.value, page: page + 1 };
  getDocumentTypes(newFilter);
};
const onChangePageSize = ({ value }) => {
  const newFilter = { ...filter.value, page: 1, page_size: value };
  getDocumentTypes(newFilter);
};
const getFirstPageDocumentTypes = () => {
  getDocumentTypes(defaultFilter);
};
const setDocumentTypes = newDocumentTypes => {
  documentTypes.value = newDocumentTypes;
}
const setVisible = newVisible => {
  visible.value = newVisible;
};
const changeLanguage = () => {
  headers.value = [
    {
      columnKey: 'name_uz',
      field: 'name_uz',
      header: 'Название (UZ)',
    },
    {
      columnKey: 'name_ru',
      field: 'name_ru',
      header: 'Название (РУ)',
    },
    {
      columnKey: 'created_date',
      field: 'created_date',
      header: 'Создано'
    },
    {
      columnKey: 'status',
      field: 'status',
      header: 'Статус',
    },
    {
      columnKey: 'action',
      field: 'action',
      header: 'Действия',
    },
  ];
};
watch(locale, () => {
  changeLanguage();
});
onMounted(() => {
  changeLanguage();
  getFirstPageDocumentTypes();
});
</script>
<template>
  <div class="flex mb-5 justify-between items-center">
    <h1 class="text-2xl font-bold text-primary-900">Тип документа</h1>
    <div class="flex items-center gap-2">
      <span class="p-input-icon-left">
        <i class="pi pi-search pl-1" />
        <InputText
          :modelValue="filter.search"
          :pt="{ root: { class: ['w-full rounded-3xl bg-white border-greyscale-50 font-xs focus:border-primary-500'] } }"
          @update:modelValue="searchDocumentTypes"
          placeholder="Поиск"
          size="small"
          type="text"
          />
      </span>
      <Button
        @click="visible = true"
        class="p-button p-component font-medium text-sm rounded-xl !rounded-full py-[9px] px-4"
        rounded
        type="button"
        >
        <base-icon class="mr-2" height="20" name="AddIcon" width="20"/>
        <span>Создать</span>
      </Button>
    </div>
  </div>
  <div class="document-types-table">
    <DataTable
      :loading="loading"
      :pt="tableConfig"
      :value="documentTypes"
      @page="onChangePage"
      row-hover
      scrollable
      >
      <Column
        :columnKey="item.columnKey"
        :field="item.field"
        :header="item.header"
        :key="index"
        :pt="columnConfig"
        v-for="(item, index) in headers"
        >
        <template #body="{ field, data }">
          <DocumentType
            :data="data"
            :documentTypes="documentTypes"
            :field="field"
            :getFirstPageDocumentTypes="getFirstPageDocumentTypes"
            :setDocumentTypes="setDocumentTypes"
            />
        </template>
      </Column>
      <template #loading>
        <div class="bg-primary-50 w-full h-full overflow-hidden absolute left-0 top-0">
          <div v-for="(_, index) in 10" :key="index" class="bg-white px-5 h-14 rounded-xl flex flex-col justify-center items-center mb-1">
            <div class="w-full h-full flex items-center justify-center gap-4">
              <Skeleton v-for="(_, index) in 5" :key="index" height="16px" />
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="w-full flex justify-center items-center rounded-lg h-[450px]">
          <img class="w-[200px] h-[170px]" src="@/assets/img/empty-img-gray.png" alt="EmptyFolder">
        </div>
      </template>
    </DataTable>
    <div class="flex">
      <Paginator
        :pt="paginationConfig"
        :rows="filter.page_size"
        :totalRecords="count"
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
  </div>
  <CreateDocumentType
    :getFirstPageDocumentTypes="getFirstPageDocumentTypes"
    :setVisible="setVisible"
    :visible="visible"
    />
</template>
<style>
.document-types-table th:first-child, td:first-child {
  border-radius: 12px 0 0 12px;
}
.document-types-table th:last-child, td:last-child {
  border-radius: 0 12px 12px 0;
}
</style>