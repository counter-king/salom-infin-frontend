<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
import { replaceSpecCharsBracket } from '@/utils/string';
const props = defineProps({ getFirstPageDepartments: Function, setVisible: Function, visible: Boolean });
const defaultDepartment = { name_uz: '', name_ru: '', code: '' };
const department = ref(defaultDepartment);
const loading = ref(false);

const companies = ref([]);
const companiesLoading = ref(false);
const companiesPage = ref(1);
const company = ref('');

const createDepartment = () => {
   const companyId = company.value?.id;
   const { name_ru, name_uz, code } = department.value;
   if(name_uz && name_ru && code && companyId) {
      loading.value = true;
      axiosConfig
         .post('/departments/', { name_ru, name_uz, condition: 'A', code, parent_code: 0, company: companyId })
         .then(response => {
            if(response?.status === 201) {
               department.value = defaultDepartment;
               dispatchNotify('Департамент создан', '', 'success');
               props.getFirstPageDepartments();
               props.setVisible(false);
            }
         })
         .catch(() => {})
         .finally(() => {
            loading.value = false;
         });
   } else if(!companyId) {
      dispatchNotify('Введите филиал', '', 'error');
   } else if(!name_uz || !name_ru) {
      dispatchNotify('Введите название', '', 'error')
   } else {
      dispatchNotify('Введите код', '', 'error');
   }
};
const searchCompanies = ({ search, page }) => {
   company.value = search;
   companiesLoading.value = true;
   axiosConfig
      .get(`companies/?condition=A&page=${page}&search=${search}`)
      .then(response => {
         const newPage = response?.data?.next ? page + 1 : null;
         const results = response?.data?.results;
         const rootCompanies = page === 1 ? [] : companies.value;
         const newCompanies = Array.isArray(results) ? results : [];
         companiesPage.value = newPage;
         companies.value = [ ...rootCompanies, ...newCompanies ];
      })
      .catch(() => {
         companiesPage.value = null;
      })
      .finally(() => {
         companiesLoading.value = false;
      });
};
</script>
<template>
   <Dialog
      :closable="!loading"
      :pt="dialogConfig"
      :visible="visible"
      header="Создать департамент"
      modal
      @update:visible="() => {
         company = '';
         department = defaultDepartment;
         setVisible(!visible);
      }"
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Филиал<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :loading="companiesLoading"
            :options="companies"
            :page="companiesPage"
            :value="company"
            @onInputChange="searchCompanies"
            key="id"
            label="name"
            noOptionsMessage="Филиал не найден"
            placeholder="Введите филиал"
            @onChange="value => {
               company = value;
            }"
            >
            <template #option="{ option }">
               <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
            </template>
         </base-auto-complete>
         <p class="text-sm text-greyscale-500 font-medium mb-1 mt-6">Название (UZ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="department.name_uz"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="value => {
               department = { ...department, name_uz: replaceSpecCharsBracket(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (РУ) <span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="department.name_ru"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="value => {
               department = { ...department, name_ru: replaceSpecCharsBracket(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Код<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="department.code"
            :pt="{ root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            placeholder="Введите код"
            type="text"
            @update:modelValue="value => {
               department = { ...department, code: String(parseInt(value.replace(/[^0-9]/g, '')) || '').slice(0, 8) };
            }"
            />
      </div>
      <template #footer>
         <div class="flex justify-end">
            <template v-if="loading">
               <ProgressSpinner class="m-0 w-10 h-10" animationDuration=".5s" strokeWidth="4" />
            </template>
            <template v-else>
               <Button
                  @click="() => {
                     company = ''
                     department = defaultDepartment;
                     setVisible(!visible);
                  }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="createDepartment"
                  class="shadow-none p-button p-component font-semibold text-sm !rounded-full m-0 py-[9px] px-4"
                  rounded
                  type="button"
               >Создать</Button>
            </template>
         </div>
      </template>
   </Dialog>
</template>
<style></style>