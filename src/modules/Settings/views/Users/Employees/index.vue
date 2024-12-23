<script setup>
import Button from 'primevue/button';
import Column from 'primevue/column';
import CreateEmployee from './CreateEmployee.vue';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Employee from './Employee.vue';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import Skeleton from 'primevue/skeleton';
import axiosConfig from "@/services/axios.config";
import { onMounted, ref, computed } from 'vue';
import OverlayPanel from 'primevue/overlaypanel';
import InputSwitch from 'primevue/inputswitch';
import { tableConfig, columnConfig, dropdownConfig, paginationConfig, dropdownOptions, overlayConfig } from './config';
import { useI18n } from "vue-i18n";
import { SettingsMinimalisticIcon } from '@/components/Icons'
const { locale, t } = useI18n();
const defaultFilter = { page: 1, page_size: 15, search: '' };
const count = ref(1);
const visible = ref(false);
const filter = ref(defaultFilter);
const headers = ref([
  {
    columnKey: 'full_name',
    disabled: true,
    field: 'full_name',
    header: 'employee-fio',
    is_active: true,
  },
  {
    columnKey: 'branchName',
    field: 'branchName',
    header: 'branch',
    is_active: true,
  },
  {
    columnKey: 'topLevelDepartment',
    field: 'topLevelDepartment',
    header: 'department',
    is_active: true,
  },
  {
    columnKey: 'departmentName',
    field: 'departmentName',
    header: 'Субдепартамент',
    is_active: true,
  },
  {
    columnKey: 'position',
    field: 'position',
    header: 'position',
    is_active: true,
  },
  {
    columnKey: 'phone',
    field: 'phone',
    header: 'phone-number',
    is_active: true,
  },
  // {
  //   columnKey: 'is_user_active',
  //   disabled: true,
  //   field: 'is_user_active',
  //   header: 'Состояние',
  //   is_active: true,
  // },
  {
    columnKey: 'action',
    field: 'action',
    header: 'actions',
    is_active: true,
  },
]);
const loading = ref(false);
const employees = ref([]);
const settingsOverlay = ref(null);
const visibleHeaders = computed(() => headers.value.filter(header => header?.is_active));
const editableHeaders = computed(() => headers?.value.filter(header => !header?.disabled));
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
      const newEmployees = (Array.isArray(results) ? results: []).map(employee => ({ ...employee, branchName: employee?.company?.name, departmentName: employee?.department?.name, topLevelDepartment: employee?.top_level_department?.name }));
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
const searchUsers = search => {
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
const changeHeader = (is_active, field) => {
  const newHeaders = headers.value.map(header => {
    if(header.field === field) {
      return { ...header, is_active }
    } else {
      return header;
    }
  });
  headers.value = newHeaders;
};
const toggle = e => {
  settingsOverlay.value.toggle(e);
};
const saveChanges = e => {
  const newHeaders = JSON.stringify(headers.value);
  localStorage.setItem('settings-users-employees', newHeaders);
  settingsOverlay.value.toggle(e);
};
const resetHeaders = e => {
  const newHeaders = headers.value.map(header => ({ ...header, is_active: true }));
  headers.value = newHeaders;
  localStorage.setItem('settings-users-employees', JSON.stringify(newHeaders));
  settingsOverlay.value.toggle(e);
};
const initHeaders = () => {
  const list = JSON.parse(localStorage.getItem('settings-users-employees'));
  if(Array.isArray(list) && list?.length) {
    const newHeaders = list;
    headers.value = newHeaders;
  }
};
onMounted(() => {
  getFirstPageEmployees();
  initHeaders();
});
</script>
<template>
  <div class="flex mb-5 justify-between items-center">
    <h1 class="text-2xl font-bold text-primary-900">{{ t('employees') }}</h1>
    <div class="flex items-center gap-2">
      <span class="p-input-icon-left">
        <i class="pi pi-search pl-1" />
        <InputText
          :modelValue="filter.search"
          :pt="{ root: { class: ['w-full rounded-3xl h-[42px] bg-white border-greyscale-50 font-xs focus:border-primary-500'] } }"
          @update:modelValue="searchUsers"
          :placeholder="t('search')"
          size="small"
          type="text"
          />
      </span>
      <Button
        @click="toggle"
        class="p-button p-component font-medium text-sm border-transparent bg-primary-0 hover:bg-greyscale-100 text-primary-dark shadow-button !rounded-full py-[9px] px-4"
        rounded
        type="button"
        >
        <base-iconify class="mr-2" color="#767994" height="20" :icon="SettingsMinimalisticIcon" width="20"/>
        <span>{{ t('customize-columns') }}</span>
      </Button>
      <!-- <Button
        @click="visible = true"
        class="p-button p-component font-medium text-sm !rounded-full py-[9px] px-4"
        rounded
        type="button"
      >
        <base-icon class="mr-2" height="20" name="AddIcon" width="20"/>
        <span>{{ t('create') }}</span>
      </Button> -->
    </div>
  </div>
  <div class="employees-table">
    <DataTable
      :loading="loading"
      :pt="tableConfig"
      :value="employees"
      row-hover
      scrollable
      scroll-height="calc(100vh - 295px)"
      >
      <Column
        :columnKey="item.columnKey"
        :field="item.field"
        :header="t(item.header)"
        :key="index"
        :pt="columnConfig"
        v-for="(item, index) in visibleHeaders"
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
              <Skeleton v-for="(_, index) in visibleHeaders.length" :key="index" height="16px" />
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
  <OverlayPanel ref="settingsOverlay" :pt="overlayConfig">
    <div class="p-3">
      <div v-for="(header, index) in editableHeaders" :key="index" class="w-full h-10 py-3 px-2 flex items-center gap-3 justify-between">
        <span class="text-primary-900 text-sm font-medium">{{ t(header.header) }}</span>
        <InputSwitch
          size="small"
          :modelValue="header.is_active"
          @update:modelValue="value => {
            changeHeader(value, header.field)
          }"
          :pt="{
            root: { class: ['h-[22px] w-[36px] shadow-none ml-6'] },
            slider: () => ({
              class: [
                'before:h-[18px] before:w-[18px] before:-mt-[9px] shadow-none',
                header?.is_active ? 'bg-green-500' : 'bg-greyscale-100',
                header?.is_active ? 'before:translate-x-[10px]' : 'before:left-[2px]'
              ]
            }),
          }"
        />
      </div>
    </div>
    <div class="flex justify-end border-t bg-greyscale-50 py-3 pr-5 pl-8">
      <Button @click="resetHeaders" class="p-button p-component font-medium flex justify-center shadow-none rounded-full text-[14px] py-[6px] px-4 bg-white text-primary-900 border-transparent">
        {{ t('reset') }}
      </Button>

      <Button @click="saveChanges" class="p-button p-component font-medium flex justify-center shadow-none rounded-full text-[14px] py-[6px] px-4 ml-2">
        {{ t('save') }}
      </Button>
    </div>
  </OverlayPanel>
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
