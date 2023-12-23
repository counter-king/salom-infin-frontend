<script setup>
import Button from 'primevue/button';
import Column from 'primevue/column';
import CreateEmployee from './CreateEmployee.vue';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Employee from './Employee.vue';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import axiosConfig from "@/services/axios.config";
import { onMounted, ref, watch } from 'vue';
import { tableConfig, columnConfig, dropdownConfig, paginationConfig, dropdownOptions } from './config';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const defaultFilter = { page: 1, page_size: 10, search: '' };
const count = ref(1);
const createUser = ref({});
const visible = ref(false);
const deleteLoading = ref(false);
const deleteUser = ref({});
const deleteVisible = ref(false);
const editUser = ref({});
const editVisible = ref(false);
const filter = ref(defaultFilter);
const headers = ref([]);
const loading = ref(false);
const employees = ref([]);
const userDelete = () => {
  deleteLoading.value = true;
};
const userEdit = () => {};
const userCreate = () => {};
const setVisible = newVisible => {
  visible.value = newVisible;
};
const getEmployees = (newFilter = {}) => {
  loading.value = true;
  filter.value = newFilter;
  const { page, page_size, search } = newFilter;
  const params = `?page=${page}${page_size ? '&page_size=' + page_size : ''}${search ? '&search=' + search : ''}`;
  axiosConfig
    .get(`users/${params}`)
    .then(response => {
      const results = response?.data?.results;
      const newCount = response?.data?.count;
      const newEmployees = (Array.isArray(results) ? results: []).map(user => ({...user, position: user?.position?.name}));
      employees.value = newEmployees;
      count.value = newCount;
    })
    .catch(() => {
      employees.value = [];
    })
    .finally(() => {
      loading.value = false;
    });
};
const getDepartments = () => {
  axiosConfig
    .get(`departments/top-level-departments/`)
    .then(response => {
      const results = response?.data?.results;
      console.log(results);
    })
    .catch(() => {
      console.log('error')
    });
};
const searchUsers = e => {
  const search = e.target.value;
  const newFilter = { ...filter.value, page: 1, search };
  getEmployees(newFilter);
};
const onChangePage = ({ page }) => {
  const newFilter = { ...filter.value, page: page + 1 };
  getEmployees(newFilter);
};
const onChangePageSize = ({ value }) => {
  const newFilter = { ...filter.value, page: 1, page_size: value };
  getEmployees(newFilter);
};
const getFirstPageEmployees = () => {
  getEmployees(defaultFilter);
};
const setEmployees = newEmployees => {
  employees.value = newEmployees;
}
const changeLanguage = () => {
  headers.value = [
    {
      columnKey: 'full_name',
      field: 'full_name',
      header: 'ФИО Сотрудника',
    },
    {
      columnKey: 'position',
      field: 'position',
      header: 'Должность',
    },
    {
      columnKey: 'phone',
      field: 'phone',
      header: 'Телефон',
    },
    {
      columnKey: 'status',
      field: 'status',
      header: 'Состояние',
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
  getFirstPageEmployees();
  getDepartments();
});
</script>
<template>
  <div class="flex mb-5 justify-between items-center">
    <h1 class="text-2xl font-bold text-primary-900">Сотрудники</h1>
    <div class="flex items-center gap-2">
      <span class="p-input-icon-left">
        <i class="pi pi-search pl-1" />
        <InputText
          :pt="{ root: { class: ['w-full rounded-3xl bg-white border-greyscale-50 font-xs focus:border-primary-500'] } }"
          @input="searchUsers"
          placeholder="Поиск"
          size="small"
          type="text"
          v-model="filter.search"
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
  <div class="employees-table">
    <DataTable
      :loading="loading"
      :pt="tableConfig"
      :value="employees"
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
          <Employee
            :data="data"
            :employees="employees"
            :field="field"
            :getFirstPageEmployees="getFirstPageEmployees"
            :setEmployees="setEmployees"
            />
        </template>
      </Column>
      <template #loading>
        <div class="bg-primary-50 w-full h-full overflow-hidden absolute left-0 top-0">
          <div v-for="(_, index) in 10" :key="index" class="bg-white px-5 h-14 rounded-xl flex flex-col justify-center items-center mb-1">
            <div class="w-full h-full flex items-center justify-center gap-4">
              <skeleton v-for="(_, index) in 5" :key="index" height="16px" />
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
  <CreateEmployee
    :getFirstPageEmployees="getFirstPageEmployees"
    :setVisible="setVisible"
    :visible="visible"
    />
</template>
<style>
.employees-table th:first-child, td:first-child {
  border-radius: 12px 0 0 12px;
}
.employees-table th:last-child, td:last-child {
  border-radius: 0 12px 12px 0;
}
</style>