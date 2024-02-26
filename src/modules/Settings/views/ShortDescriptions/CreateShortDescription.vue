<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
const props = defineProps({ getFirstPageShortDescriptions: Function, setVisible: Function, visible: Boolean });
const defaultShortDescription = { description_uz: '', description_ru: '' };
const shortDescription = ref(defaultShortDescription);
const loading = ref(false);
const createShortDescription = () => {
   const { description_ru, description_uz } = shortDescription.value;
   if(description_uz && description_ru) {
      loading.value = true;
      const data = { description_ru, description_uz };
      axiosConfig
         .post('short-descriptions/', data)
         .then(response => {
            if(response?.status === 201) {
               dispatchNotify('Краткое описание создан', '', 'success');
               props.getFirstPageShortDescriptions();
               props.setVisible(false);
               shortDescription.value = defaultShortDescription;
            }
         })
         .catch(() => {})
         .finally(() => {
            loading.value = false;
         });
   } else {
      dispatchNotify('Введите название', '', 'error');
   }
};
</script>
<template>
   <Dialog
      :closable="!loading"
      :pt="dialogConfig"
      :visible="visible"
      header="Создать краткое описание"
      modal
      @update:visible="() => {
         shortDescription = defaultShortDescription;
         setVisible(!visible);
      }"
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Описание (UZ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="shortDescription.description_uz"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите описание"
            type="text"
            @update:modelValue="description_uz => {
               shortDescription = { ...shortDescription, description_uz };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Описание (РУ) <span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="shortDescription.description_ru"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите описание"
            type="text"
            @update:modelValue="description_ru => {
               shortDescription = { ...shortDescription, description_ru };
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
                     shortDescription = defaultShortDescription;
                     setVisible(!visible);
                  }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="createShortDescription"
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