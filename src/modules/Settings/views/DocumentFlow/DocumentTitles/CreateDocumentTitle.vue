<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
const props = defineProps({ getFirstPageDocumentTitles: Function, setVisible: Function, visible: Boolean });
const defaultDocumentTitle = { name_uz: '', name_ru: '' }
const documentTitle = ref(defaultDocumentTitle);
const loading = ref(false);
const createDocumentTitle = () => {
   const { name_ru, name_uz } = documentTitle.value;
   if(name_uz && name_ru) {
      loading.value = true;
      axiosConfig
         .post('document-titles/', { name_ru, name_uz, is_active: true })
         .then(response => {
            if(response?.status === 201) {
               dispatchNotify('Заголовок создан', '', 'success');
               documentTitle.value = defaultDocumentTitle
               props.getFirstPageDocumentTitles();
               props.setVisible(false);
            } else {
               dispatchNotify('Заголовок не создан', '', 'error');
            }
         })
         .catch(() => {
            dispatchNotify('Заголовок не создан', '', 'error');
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
      header="Создать заголовок"
      modal
      @update:visible="() => {
         documentTitle = defaultDocumentTitle;
         setVisible(!visible);
      }"
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (UZ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            @update:modelValue="name_uz => {
               documentTitle = { ...documentTitle, name_uz };
            }"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            :modelValue="documentTitle.name_uz"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (РУ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            @update:modelValue="name_ru => {
               documentTitle = { ...documentTitle, name_ru };
            }"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            :modelValue="documentTitle.name_ru"
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
                     documentTitle = defaultDocumentTitle;
                     setVisible(!visible);
                  }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="createDocumentTitle"
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