<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { replaceSpecCharsBracket } from '@/utils/string';
import { ref } from 'vue';
const props = defineProps({ getFirstPageDepartments: Function, setVisible: Function, visible: Boolean });
const defaultDepartment = { name_uz: '', name_ru: '' };
const department = ref(defaultDepartment);
const loading = ref(false);
const createDepartment = () => {
   const {name_ru, name_uz} = department.value;
   if(name_uz && name_ru) {
      loading.value = true;
      axiosConfig
         .post('/departments/', { name_ru, name_uz, condition: 'A' })
         .then(response => {
            if(response?.status === 201) {
               department.value = defaultDepartment;
               dispatchNotify('Департамент создан', '', 'success');
               props.getFirstPageDepartments();
               props.setVisible(false);
            } else {
               dispatchNotify('Департамент не создан', '', 'error');
            }
         })
         .catch(() => {
            dispatchNotify('Департамент не создан', '', 'error');
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
      :closable="!loading"
      :pt="dialogConfig"
      :visible="visible"
      header="Создать департамент"
      modal
      @update:visible="() => {
         department = defaultDepartment;
         setVisible(!visible);
      }"
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (UZ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="department.name_uz"
            :pt="{root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="value => {
               department = { ...department, name_uz: replaceSpecCharsBracket(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (РУ) <span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="department.name_ru"
            :pt="{root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="value => {
               department = { ...department, name_ru: replaceSpecCharsBracket(value) };
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