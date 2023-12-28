<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
import { replaceSpecChars } from '@/utils/string';
const props = defineProps({ getFirstPageDistricts: Function, setVisible: Function, visible: Boolean });
const defaultDistrict = { name_uz: '', name_ru: '' };
const district = ref(defaultDistrict);
const loading = ref(false);
const createDistrict = () => {
   const {name_ru, name_uz} = district.value;
   if(name_uz && name_ru) {
      loading.value = true;
      axiosConfig
         .post('districts/', { name_ru, name_uz })
         .then(response => {
            if(response?.status === 201) {
               dispatchNotify('Район создан', '', 'success');
               district.value = defaultDistrict;
               props.getFirstPageDistricts();
               props.setVisible(false);
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
   } else {
      dispatchNotify('Введите название', '', 'error')
   }
};
</script>
<template>
   <Dialog
      @update:visible="() => {
         district = defaultDistrict;
         setVisible(!visible);
      }"
      :closable="!loading"
      :pt="dialogConfig"
      :visible="visible"
      header="Создать район"
      modal
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (UZ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="district.name_uz"
            :pt="{root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="value => {
               district = { ...district, name_uz: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (РУ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="district.name_ru"
            :pt="{root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="value => {
               district = { ...district, name_ru: replaceSpecChars(value) };
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