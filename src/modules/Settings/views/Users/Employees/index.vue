<script setup>
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import DeleteIcon from './DeleteIcon.vue';
import DeleteSymbolIcon from './DeleteSymbolIcon.vue';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import EditIcon from './EditIcon.vue';
import InputText from 'primevue/inputtext';
import Loading from './Loading.vue';
import NoData from './NoData.vue';
import Paginator from 'primevue/paginator';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { onMounted, ref, watch } from 'vue';
import { tableConfig, columnConfig, dialogConfig, dropdownConfig, paginationConfig } from './config';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const defaultFilter = { page: 1, page_size: 10, search: '' };
const count = ref(1);
const createUser = ref({});
const createVisible = ref(false);
const deleteLoading = ref(false);
const deleteUser = ref({});
const deleteVisible = ref(false);
const editUser = ref({});
const editVisible = ref(false);
const filter = ref(defaultFilter);
const headers = ref([]);
const loading = ref(false);
const users = ref([]);
const userDelete = () => {
  deleteLoading.value = true;
};
const userEdit = () => {};
const userCreate = () => {};
const getUsers = (newFilter = {}) => {
  loading.value = true;
  filter.value = newFilter;
  const { page, page_size, search } = newFilter;
  const params = `?page=${page}${page_size ? '&page_size=' + page_size : ''}${search ? '&search=' + search : ''}`;
  axiosConfig
    .get(`users/${params}`)
    .then(response => {
      const results = response?.data?.results;
      const newCount = response?.data?.count;
      const newUsers = (Array.isArray(results) ? results: []).map(user => ({...user, position: user?.position?.name}));
      users.value = newUsers;
      count.value = newCount;
    })
    .catch(() => {
      users.value = [];
    })
    .finally(() => {
      loading.value = false;
    });
};
const searchUsers = e => {
  const search = e.target.value;
  const newFilter = { ...filter.value, page: 1, search };
  getUsers(newFilter);
};
const onChangePage = ({ page }) => {
  const newFilter = { ...filter.value, page: page + 1 };
  getUsers(newFilter);
};
const onChangePageSize = ({ value }) => {
  const newFilter = { ...filter.value, page: 1, page_size: value };
  getUsers(newFilter);
};
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
  getUsers(defaultFilter);
});
</script>
<template>
  <div class="flex mb-5 justify-between items-center">
    <h1 class="text-2xl font-bold text-primary-900">Сотрудники</h1>
    <div class="flex items-center gap-2">
      <span class="p-input-icon-left">
        <i class="pi pi-search pl-1" />
        <InputText
          :pt="{ root: { class: ['w-full rounded-3xl bg-white border-greyscale-50 focus:border-primary-500'] } }"
          :style="{ padding: '9px 9px 9px 40px', fontSize: 12 }"
          @input="searchUsers"
          placeholder="Поиск"
          size="small"
          type="text"
          v-model="filter.search" />
      </span>
      <Button
        @click="createVisible = true"
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
      :value="users"
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
          <template v-if="field === 'status'">
            <span class="text-sm font-medium text-greyscale-500" style="text-transform: uppercase;">
              <template v-if="data[field] && data[field].name">
                <span :style="{ background: data.is_active ? '#EEFFE7' : '#F7F7F9', color: data.is_active ? '#63BA3D' : '#767994' }" class="px-2 py-1 text-xs font-semibold rounded-[80px]">{{ data[field] && data[field].name }}</span>
              </template>
            </span>
          </template>
          <template v-else-if="field === 'action'">
            <Button
              @click="() => {
                editUser = data;
                editVisible = true;
              }" icon class="py-[7px] px-2 text-xs bg-greyscale-50 mr-2 rounded-[8px]" severity="secondary" text style="box-shadow: none">
              <EditIcon />
            </Button>
            <Button @click="() => {
              deleteUser = data;
              deleteVisible = true;
            }" icon class="py-[7px] px-2 text-xs bg-greyscale-50 rounded-[8px]" severity="danger" text style="box-shadow: none">
              <DeleteIcon />
            </Button>
          </template>
          <template v-else>
            <span class="text-sm font-medium text-greyscale-500">{{ data[field] }}</span>
          </template>
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
  <Dialog
    :pt="dialogConfig"
    dismissableMask
    header="Создать сотрудник"
    modal
    v-model:visible="createVisible">
    <div class="flex flex-col items-center pb-10 pt-4">
      <div>
        <DeleteSymbolIcon />
      </div>
      <h2 class="text-center font-semibold text-3xl text-gray-900 p-0 mt-6">Удалить помощник?</h2>
      <p class="text-center py-0 px-6 mt-2 text-gray-400">
        Вы уверены, что хотите удалить этого помощника
      </p>
    </div>
    <template #footer>
      <div>
        <Button
          @click="createVisible = false"
          class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4"
          icon-left="AddIcon"
          rounded
          type="button"
        >Создать</Button>
      </div>
    </template>
  </Dialog>
  <Dialog
    :pt="dialogConfig"
    dismissableMask
    header="Edit"
    modal
    v-model:visible="editVisible">
    <h1>Edit</h1>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <template #footer>
      <div>
        <Button
          @click="editVisible = false"
          class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4"
          icon-left="AddIcon"
          rounded
          type="button"
        >Edit</Button>
      </div>
    </template>
  </Dialog>
  <Dialog
    :pt="dialogConfig"
    dismissableMask
    header="Удалить сотрудник"
    modal
    v-model:visible="deleteVisible">
    <div class="flex flex-col items-center pb-10 pt-4">
      <div>
        <DeleteSymbolIcon />
      </div>
      <h2 class="text-center font-semibold text-3xl text-gray-900 p-0 mt-6">Удалить сотрудник?</h2>
      <p class="text-center py-0 px-6 mt-2 text-gray-400">
        Вы уверены, что хотите удалить этого сотрудник
      </p>
    </div>
    <template #footer>
      <div class="flex" style="justify-content: flex-end">
        <template v-if="deleteLoading">
          <ProgressSpinner class="m-0" animationDuration=".5s" style="width: 40px; height: 40px" strokeWidth="4" />
        </template>
        <template v-else>
          <Button
            @click="deleteVisible = false"
            class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm rounded-xl !rounded-full py-[10px] px-4 ml-0 mr-3"
            rounded
            style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
            type="button">
            Отмена
          </Button>
          <Button
            @click="userDelete"
            class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4"
            icon-left="AddIcon"
            rounded
            type="button"
          >Удалить</Button>
        </template>
      </div>
    </template>
  </Dialog>
</template>
<style>
.employees-table th:first-child, td:first-child {
  border-radius: 12px 0 0 12px;
}
.employees-table th:last-child, td:last-child {
  border-radius: 0 12px 12px 0;
}
</style>