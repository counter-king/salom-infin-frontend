<script setup>
import Button from 'primevue/button';
import CreatePosition from './CreatePosition.vue';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import OverlayPanel from 'primevue/overlaypanel';
import Paginator from 'primevue/paginator';
import Position from './Position.vue';
import Skeleton from 'primevue/skeleton';
import axiosConfig from "@/services/axios.config";
import { ref, watch, onMounted, computed } from 'vue';
import { tableConfig, columnConfig, dropdownConfig, paginationConfig, dropdownOptions, overlayConfig } from './config';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const defaultFilter = { page: 1, page_size: 10, search: '' };
const count = ref(1);
const filter = ref(defaultFilter);
const headers = ref([
   {
      columnKey: 'name_uz',
      disabled: true,
      field: 'name_uz',
      header: 'Название (UZ)',
      is_active: true,
   },
   {
      columnKey: 'name_ru',
      field: 'name_ru',
      header: 'Название (РУ)',
      is_active: true,
   },
   {
      columnKey: 'code',
      field: 'code',
      header: 'Код',
      is_active: true,
   },
   {
      columnKey: 'is_active',
      disabled: true,
      field: 'is_active',
      header: 'Статус',
      is_active: true,
   },
   {
      columnKey: 'action',
      field: 'action',
      header: 'Действия',
      is_active: true,
   },
]);
const loading = ref(false);
const navs = ref([]);
const positions = ref([]);
const visible = ref(false);
const settingsOverlay = ref(null);
const visibleHeaders = computed(() => headers.value.filter(header => header?.is_active));
const editableHeaders = computed(() => headers?.value.filter(header => !header?.disabled));
const getPositions = (newFilter = {}) => {
   loading.value = true;
   filter.value = newFilter;
   const { page, page_size, search } = newFilter;
   const params = `?page=${page}${page_size ? '&page_size=' + page_size : ''}${search ? '&search=' + search : ''}`;
   axiosConfig
      .get(`positions/${params}`)
      .then(response => {
         const results = response?.data?.results;
         const newCount = response?.data?.count;
         const newPositions = Array.isArray(results) ? results: [];
         positions.value = newPositions;
         count.value = newCount;
      })
      .catch(() => {
         positions.value = [];
      })
      .finally(() => {
         loading.value = false;
      });
};
const searchPositions = search => {
   const newFilter = { ...filter.value, page: 1, search };
   getPositions(newFilter);
};
const onChangePage = ({ page }) => {
   const newFilter = { ...filter.value, page: page + 1 };
   getPositions(newFilter);
};
const onChangePageSize = ({ value }) => {
   const newFilter = { ...filter.value, page: 1, page_size: value };
   getPositions(newFilter);
};
const getFirstPagePositions = () => {
   getPositions(defaultFilter);
};
const setPositions = newPositions => {
   positions.value = newPositions;
}
const setVisible = newVisible => {
   visible.value = newVisible;
};
const changeLanguage = () => {
   navs.value = [
      {
         title: "Департаменты",
         icon: "BuildingsIcon",
         link: "DepartmentsIndex",
      },
      {
         title: "Филиалы",
         icon: "BuildingsIcon",
         link: "BranchesIndex",
      },
      {
         title: "Должность",
         icon: "UserSpeakIcon",
         link: "PositionsIndex",
      }
   ];
};
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
   localStorage.setItem('settings-structure-positions', newHeaders);
   settingsOverlay.value.toggle(e);
};
const resetHeaders = e => {
   const newHeaders = headers.value.map(header => ({ ...header, is_active: true }));
   headers.value = newHeaders;
   localStorage.setItem('settings-structure-positions', JSON.stringify(newHeaders));
   settingsOverlay.value.toggle(e);
};
const initHeaders = () => {
   const list = JSON.parse(localStorage.getItem('settings-structure-positions'));
   if(Array.isArray(list) && list?.length) {
      const newHeaders = list;
      headers.value = newHeaders;
   }
};
watch(locale, () => {
   changeLanguage();
});
onMounted(() => {
   changeLanguage();
   getFirstPagePositions();
   initHeaders();
});
</script>
<template>
   <div class="flex mb-5 justify-between items-center">
      <h1 class="text-2xl font-bold text-primary-900">Должность</h1>
      <div class="flex items-center gap-2">
         <span class="p-input-icon-left">
            <i class="pi pi-search pl-1" />
            <InputText
               :modelValue="filter.search"
               :pt="{ root: { class: ['w-full rounded-3xl h-[42px] bg-white border-greyscale-50 font-xs focus:border-primary-500'] } }"
               @update:modelValue="searchPositions"
               placeholder="Поиск"
               size="small"
               type="text"
               />
         </span>
         <Button
            @click="toggle"
            class="p-button p-component font-medium text-sm border-transparent bg-primary-0 hover:bg-greyscale-100 text-primary-dark shadow-button rounded-xl !rounded-full py-[9px] px-4"
            rounded
            type="button"
            >
            <base-icon class="mr-2" color="#767994" height="20" name="SettingsMinimalisticIcon" width="20"/>
            <span>Настроить столбцы</span>
         </Button>
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
   <div class="positions-table">
      <DataTable
         :loading="loading"
         :pt="tableConfig"
         :value="positions"
         row-hover
         scrollable
         >
            <Column
               :columnKey="item.columnKey"
               :field="item.field"
               :header="item.header"
               :key="index"
               :pt="columnConfig"
               v-for="(item, index) in visibleHeaders"
               >
               <template #body="{ field, data }">
                  <Position
                     :data="data"
                     :field="field"
                     :getFirstPagePositions="getFirstPagePositions"
                     :positions="positions"
                     :setPositions="setPositions"
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
            <span class="text-primary-900 text-sm font-medium">{{ header.header }}</span>
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
         <Button @click="resetHeaders" class="p-button p-component shadow-button font-medium flex justify-center shadow-none rounded-full text-[14px] py-[6px] px-4 bg-white text-primary-900 border-transparent">Сбросить</Button>
         <Button @click="saveChanges" class="p-button p-component font-medium flex justify-center shadow-none rounded-full text-[14px] py-[6px] px-4 ml-2">Сохранить</Button>
      </div>
   </OverlayPanel>
   <CreatePosition
      :getFirstPagePositions="getFirstPagePositions"
      :setVisible="setVisible"
      :visible="visible"
      />
</template>
<style>
.positions-table th:first-child, td:first-child {
   border-radius: 12px 0 0 12px;
}
.positions-table th:last-child, td:last-child {
   border-radius: 0 12px 12px 0;
}
</style>
