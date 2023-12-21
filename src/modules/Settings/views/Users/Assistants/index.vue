<script setup>
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Assistant from './Assistant.vue';
import CreateAssistant from './CreateAssistant.vue';
import Loading from './Loading.vue';
import NoData from './NoData.vue';
import axiosConfig from "@/services/axios.config";
import { onMounted, ref, watch } from 'vue';
import { tableConfig, columnConfig } from './config';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const defaultFilter = { page: 1, page_size: 10 };
const assistants = ref([]);
const filter = ref(defaultFilter);
const headers = ref([]);
const loading = ref(false);
const totalRecords = ref(1);
const visible = ref(false);
const getAssistants = (newFilter = {}) => {
  loading.value = true;
  filter.value = newFilter;
  const { page, page_size, search } = newFilter;
  const params = `?page=${page}${page_size ? '&page_size=' + page_size : ''}${search ? '&search=' + search : ''}`;
  axiosConfig
    .get(`user-assistants/${params}`)
    .then(response => {
      const results = response?.data?.results;
      const count = response?.data?.count;
      totalRecords.value = count;
      const newUsers = (Array.isArray(results) ? results: []).map(user => ({...user, position: user?.position?.name}));
      assistants.value = newUsers;
    })
    .catch(() => {
      assistants.value = [];
    })
    .finally(() => {
      loading.value = false;
    });
};
const onChangePage = e => {
  const page = e?.page + 1;
  const page_size = e?.rows;
  const newFilter = { page, page_size };
  getAssistants(newFilter);
};
const changeLanguage = () => {
  headers.value = [
    {
      columnKey: 'assistant',
      field: 'assistant',
      header: 'Помощник',
    },
    {
      columnKey: 'user',
      field: 'user',
      header: 'Руководитель',
    },
    {
      columnKey: 'is_active',
      field: 'is_active',
      header: 'Состояние',
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
const setAssistants = newAssistants => {
  assistants.value = newAssistants;
};
const getFirstPageAssistants = () => {
  getAssistants(defaultFilter);
};
watch(locale, () => {
  changeLanguage();
});
onMounted(() => {
  changeLanguage();
  getFirstPageAssistants();
});
</script>
<template>
  <div class="flex mb-5 justify-between items-center">
    <h1 class="text-2xl font-bold text-primary-900">Помощники</h1>
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
  <div class="employees-table">
    <DataTable
      :loading="loading"
      :pageLinkSize="5"
      :pt="tableConfig"
      :first="filter.page"
      :totalRecords="totalRecords"
      :rows="filter.page_size"
      :rowsPerPageOptions="[10, 15, 20, 30]"
      :value="assistants"
      @page="onChangePage"
      paginator
      paginator-position="bottom"
      paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
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
          <slot :name="field" :data="data">
            <assistant :data="data" :field="field" :assistants="assistants" :setAssistants="setAssistants" :get-first-page-assistants="getFirstPageAssistants"/>
          </slot>
        </template>
      </Column>
      <template #loading>
        <Loading />
      </template>
      <template #empty>
        <NoData />
      </template>
    </DataTable>
  </div>
  <CreateAssistant
    :get-first-page-assistants="getFirstPageAssistants"
    :setVisible="setVisible"
    :visible="visible"/>
</template>
<style>
.employees-table th:first-child, td:first-child {
  border-radius: 12px 0 0 12px;
}
.employees-table th:last-child, td:last-child {
  border-radius: 0 12px 12px 0;
}
</style>