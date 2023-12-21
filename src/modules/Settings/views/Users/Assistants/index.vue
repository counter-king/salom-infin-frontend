<script setup>
import Assistant from './Assistant.vue';
import Button from 'primevue/button';
import Column from 'primevue/column';
import CreateAssistant from './CreateAssistant.vue';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Loading from './Loading.vue';
import NoData from './NoData.vue';
import Paginator from 'primevue/paginator';
import axiosConfig from "@/services/axios.config";
import { onMounted, ref, watch } from 'vue';
import { tableConfig, columnConfig, paginationConfig, dropdownConfig } from './config';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const defaultFilter = { page: 1, page_size: 10 };
const assistants = ref([]);
const count = ref(1);
const filter = ref(defaultFilter);
const headers = ref([]);
const loading = ref(false);
const visible = ref(false);
const getAssistants = (newFilter = {}) => {
  loading.value = true;
  filter.value = newFilter;
  const { page, page_size } = newFilter;
  const params = `?page=${page}${page_size ? '&page_size=' + page_size : ''}`;
  axiosConfig
    .get(`user-assistants/${params}`)
    .then(response => {
      const results = response?.data?.results;
      const newCount = response?.data?.count;
      count.value = newCount;
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
const onChangePage = ({ page }) => {
  const newFilter = { ...filter.value, page: page + 1 };
  getAssistants(newFilter);
};
const onChangePageSize = ({ value }) => {
  const newFilter = { ...filter.value, page: 1, page_size: value };
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
  <div class="assistants-table">
    <DataTable
      :loading="loading"
      :pt="tableConfig"
      :value="assistants"
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
          <assistant :data="data" :field="field" :assistants="assistants" :setAssistants="setAssistants" :get-first-page-assistants="getFirstPageAssistants"/>
        </template>
      </Column>
      <template #loading>
        <Loading />
      </template>
      <template #empty>
        <NoData />
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
            :pt="dropdownConfig"
            @change="onChangePageSize"
            optionLabel="name"
            optionValue="page_size"
            v-model="filter.page_size"
            :options="[
              { name: '10', page_size: 10 },
              { name: '15', page_size: 15 },
              { name: '20', page_size: 20 },
              { name: '30', page_size: 30 }
            ]"
            />
        </template>
      </Paginator>
    </div>
  </div>
  <CreateAssistant
    :get-first-page-assistants="getFirstPageAssistants"
    :setVisible="setVisible"
    :visible="visible"/>
</template>
<style>
.assistants-table th:first-child, td:first-child {
  border-radius: 12px 0 0 12px;
}
.assistants-table th:last-child, td:last-child {
  border-radius: 0 12px 12px 0;
}
</style>