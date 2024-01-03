<script setup>
import Button from 'primevue/button';
import Column from 'primevue/column';
import CreateTopSigner from './CreateTopSigner.vue';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Paginator from 'primevue/paginator';
import Skeleton from 'primevue/skeleton';
import TopSigner from './TopSigner.vue';
import axiosConfig from "@/services/axios.config";
import { onMounted, ref, watch } from 'vue';
import { tableConfig, columnConfig, paginationConfig, dropdownConfig, dropdownOptions } from './config';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const defaultFilter = { page: 1, page_size: 10 };
const count = ref(1);
const filter = ref(defaultFilter);
const headers = ref([]);
const loading = ref(false);
const topSigners = ref([]);
const visible = ref(false);
const getTopSigners = (newFilter = {}) => {
  loading.value = true;
  filter.value = newFilter;
  const { page, page_size } = newFilter;
  const params = `?page=${page}${page_size ? '&page_size=' + page_size : ''}`;
  axiosConfig
    .get(`top-signers/${params}`)
    .then(response => {
      const results = response?.data?.results;
      const newCount = response?.data?.count;
      count.value = newCount;
      const newTopSingers = (Array.isArray(results) ? results: []);
      topSigners.value = newTopSingers;
    })
    .catch(() => {
      topSigners.value = [];
    })
    .finally(() => {
      loading.value = false;
    });
};
const onChangePage = ({ page }) => {
  const newFilter = { ...filter.value, page: page + 1 };
  getTopSigners(newFilter);
};
const onChangePageSize = ({ value }) => {
  const newFilter = { ...filter.value, page: 1, page_size: value };
  getTopSigners(newFilter);
};
const changeLanguage = () => {
  headers.value = [
    {
      columnKey: 'user',
      field: 'user',
      header: 'Топ подписавший',
    },
    {
      columnKey: 'doc_types',
      field: 'doc_types',
      header: 'Тип документа',
    },
    {
      columnKey: 'action',
      field: 'action',
      header: 'Действия',
    },
  ];
};
const setVisible = newVisible => {
  visible.value = newVisible;
};
const setTopSigners = newTopSigners => {
  topSigners.value = newTopSigners;
};
const getFirstPageTopSigners = () => {
  getTopSigners(defaultFilter);
};
watch(locale, () => {
  changeLanguage();
});
onMounted(() => {
  changeLanguage();
  getFirstPageTopSigners();
});
</script>
<template>
  <div class="flex mb-5 justify-between items-center">
    <h1 class="text-2xl font-bold text-primary-900">Топ подписантов</h1>
    <div class="flex items-center gap-2">
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
  <div class="top-signers-table">
    <DataTable
      :loading="loading"
      :pt="tableConfig"
      :value="topSigners"
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
          <top-signer :data="data" :field="field" :topSigners="topSigners" :setTopSigners="setTopSigners" :get-first-page-top-signers="getFirstPageTopSigners"/>
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
        :first="(filter.page - 1) * filter.page_size"
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
  <CreateTopSigner
    :get-first-page-top-signers="getFirstPageTopSigners"
    :setVisible="setVisible"
    :visible="visible"/>
</template>
<style>
.top-signers-table th:first-child, td:first-child {
  border-radius: 12px 0 0 12px;
}
.top-signers-table th:last-child, td:last-child {
  border-radius: 0 12px 12px 0;
}
</style>