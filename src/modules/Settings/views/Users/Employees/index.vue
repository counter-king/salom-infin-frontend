<script setup>
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import DeleteIcon from './DeleteIcon.vue';
import Dialog from 'primevue/dialog';
import EditIcon from './EditIcon.vue';
import InputText from 'primevue/inputtext';
import Loading from './Loading.vue';
import NoData from './NoData.vue';
import axiosConfig from "@/services/axios.config";
import { onMounted, ref, watch } from 'vue';
import { tableConfig, columnConfig, dialogConfig } from './config';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const createUser = ref({});
const createVisible = ref(false);
const deleteUser = ref({});
const deleteVisible = ref(false);
const editUser = ref({});
const editVisible = ref(false);
const filter = ref({ page: 1, page_size: 10, search: '' });
const headers = ref([]);
const loading = ref(false);
const pageSize = ref(filter).value.page_size;
const users = ref([]);
const userDelete = () => {};
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
      const newUsers = (Array.isArray(results) ? results: []).map(user => ({...user, position: user?.position?.name}));
      users.value = newUsers;
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
const onChangePage = e => {
  const page = e?.page + 1;
  const page_size = e?.rows;
  const newFilter = { ...filter.value, page, page_size };
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
  getUsers({ page: 1, page_size: 10, search: '' });
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
      :page-link-size="5"
      :pt="tableConfig"
      :rows-per-page-options="[10, 15, 30]"
      :rows="pageSize"
      :value="users"
      @page="onChangePage"
      paginator
      paginator-position="bottom"
      paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      row-hover
      scrollable>
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
            <template v-if="field === 'status'">
              <span class="text-sm font-medium text-greyscale-500" style="text-transform: uppercase;">
                <template v-if="data[field] && data[field].name">
                  <span :style="{ background: data.is_active ? '#EEFFE7' : '#FFEEF2', color: data.is_active ? '#63BA3D' : '#F3335C' }" class="px-2 py-1 text-xs font-semibold rounded-[80px]">{{ data[field] && data[field].name }}</span>
                </template>
              </span>
            </template>
            <template v-else-if="field === 'action'">
              <Button
                @click="() => {
                  editUser = data;
                  editVisible = true;
                }" icon class="py-[7px] px-2 text-xs bg-greyscale-50 mr-2" severity="secondary" text rounded>
                <EditIcon />
              </Button>
              <Button @click="() => {
                deleteUser = data;
                deleteVisible = true;
              }" icon class="py-[7px] px-2 text-xs bg-greyscale-50" severity="danger" text rounded>
                <DeleteIcon />
              </Button>
            </template>
            <template v-else>
              <span class="text-sm font-medium text-greyscale-500">{{ data[field] }}</span>
            </template>
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
  <Dialog
    :pt="dialogConfig"
    dismissableMask
    header="Создать сотрудник"
    modal
    v-model:visible="createVisible">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
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
    header="Delete"
    modal
    v-model:visible="deleteVisible">
    <h1>delete</h1>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <template #footer>
      <div>
        <Button
          @click="deleteVisible = false"
          class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4"
          icon-left="AddIcon"
          rounded
          type="button"
        >Delete</Button>
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