<script setup>
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Assistant from './Assistant.vue';
import CreateAssistant from './CreateAssistant.vue';
import axiosConfig from "@/services/axios.config";
import { onMounted, ref, watch } from 'vue';
import { tableConfig, columnConfig } from './config';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const defaultFilter = { page: 1, page_size: 10 };
const filter = ref(defaultFilter);
const headers = ref([]);
const loading = ref(false);
const pageSize = ref(filter).value.page_size;
const assistants = ref([]);
const visible = ref(false);
const page = ref(filter).value.page;
const totalRecords = ref(1);
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
      console.log(count, page_size, page)
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
      :page="page"
      :totalRecords="totalRecords"
      :rows="pageSize"
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
            <assistant :data="data" :field="field" :assistants="assistants" :setAssistants="setAssistants"/>
          </slot>
        </template>
      </Column>
      <template #loading>
        <div class="py-1 mt-[114px] bg-greyscale-50 h-full w-full">
          <div v-for="(item, index) in 10" :key="index" class="bg-white px-5 h-14 rounded-lg flex flex-col justify-center items-center mb-2">
            <div class="w-full h-full flex items-center justify-center gap-4">
              <skeleton v-for="(item, index) in 5" :key="index" height="16px" />
            </div>
          </div>
        </div>
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