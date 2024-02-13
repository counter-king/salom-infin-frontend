<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { dialogConfig, selectConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
import { replaceSpecChars } from '@/utils/string';
const props = defineProps({ getFirstPageDistricts: Function, setVisible: Function, visible: Boolean });
const defaultDistrict = { name_uz: '', name_ru: '', code: '' };
const district = ref(defaultDistrict);
const loading = ref(false);
const region = ref('');
const regionLoading = ref(false);
const regions = ref([]);
const regionsPage = ref(1);
const createDistrict = () => {
   const {name_ru, name_uz, code } = district.value;
   const regionId = region.value?.id;
   if(name_uz && name_ru && regionId && code) {
      loading.value = true;
      axiosConfig
         .post('districts/', { name_ru, name_uz, name: name_uz, region: regionId, is_active: true, code })
         .then(response => {
            if(response?.status === 201) {
               dispatchNotify('Район создан', '', 'success');
               district.value = defaultDistrict;
               props.getFirstPageDistricts();
               props.setVisible(false);
               region.value = '';
            } else {
               dispatchNotify('Район не создан', '', 'error');
            }
         })
         .catch(() => {
            dispatchNotify('Район не создан', '', 'error');
         })
         .finally(() => {
            loading.value = false;
         });
   } else if(!regionId) {
      dispatchNotify('Введите регион', '', 'error')
   } else if(!name_uz || !name_ru) {
      dispatchNotify('Введите название', '', 'error')
   } else {
      dispatchNotify('Введите код', '', 'error')
   }
};
const searchRegions = ({ search, page }) => {
   regionLoading.value = true;
   region.value = search;
   const newSearch = typeof search === 'string' ? search : search.name;
   axiosConfig
      .get(`regions/?page=${page}&search=${newSearch}`)
      .then(response => {
         const newPage = response?.data?.next ? page + 1 : null;
         const results = response?.data?.results;
         const rootRegions = page === 1 ? [] : regions.value;
         const newRegions = Array.isArray(results) ? results : [];
         regions.value = [ ...rootRegions, ...newRegions];
         regionsPage.value = newPage
      })
      .catch(() => {
         regionsPage.value = null;
      })
      .finally(() => {
         regionLoading.value = false;
      });
};
</script>
<template>
   <Dialog
      @update:visible="() => {
         district = defaultDistrict;
         setVisible(!visible);
         region = '';
      }"
      :closable="!loading"
      :pt="dialogConfig"
      :visible="visible"
      header="Создать район"
      modal
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Регион<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :loading="regionLoading"
            :options="regions"
            :page="regionsPage"
            :value="region"
            key="id"
            label="name"
            noOptionsMessage="Регион не найден"
            placeholder="Введите регион"
            @onInputChange="searchRegions"
            @onChange="value => {
               region = value;
            }"
            >
            <template #option="{ option }">
               <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
            </template>
         </base-auto-complete>
         <div class="mb-6"></div>
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (UZ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="district.name_uz"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="value => {
               district = { ...district, name_uz: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (РУ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="district.name_ru"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="value => {
               district = { ...district, name_ru: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Код<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="district.code"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите код"
            type="text"
            @update:modelValue="value => {
               district = { ...district, code: String(parseInt(value.replace(/[^0-9]/g, '')) || '').slice(0, 8) };
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
                     district = defaultDistrict;
                     setVisible(!visible);
                  }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="createDistrict"
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