<script setup>
import Button from 'primevue/button';
import CreatePosition from './CreatePosition.vue';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import Position from './Position.vue';
import Skeleton from 'primevue/skeleton';
import TheNavigation from '@/components/TheNavigation.vue';
import axiosConfig from "@/services/axios.config";
import { ref, watch, onMounted } from 'vue';
import { tableConfig, columnConfig, dropdownConfig, paginationConfig, dropdownOptions } from './config';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const defaultFilter = { page: 1, page_size: 10, search: '' };
const count = ref(1);
const filter = ref(defaultFilter);
const headers = ref([]);
const loading = ref(false);
const navs = ref([]);
const positions = ref([]);
const visible = ref(false);
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
   headers.value = [
      {
         columnKey: 'name',
         field: 'name',
         header: 'Название должность',
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
   getFirstPagePositions();
});
</script>
<template>
   <the-navigation :navs="navs"/>
   <div class="flex mb-5 justify-between items-center">
      <h1 class="text-2xl font-bold text-primary-900">Должность</h1>
      <div class="flex items-center gap-2">
         <span class="p-input-icon-left">
            <i class="pi pi-search pl-1" />
            <InputText
               :modelValue="filter.search"
               :pt="{ root: { class: ['w-full rounded-3xl bg-white border-greyscale-50 font-xs focus:border-primary-500'] } }"
               @update:modelValue="searchPositions"
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
   <div class="positions-table">
      <DataTable
         :loading="loading"
         :pt="tableConfig"
         :value="positions"
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