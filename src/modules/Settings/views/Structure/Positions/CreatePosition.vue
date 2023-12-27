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
const position = ref({ name_uz: '', name_ru: '' });
const loading = ref(false);
const props = defineProps({
   getFirstPagePositions: Function,
   setVisible: Function,
   visible: Boolean,
});
const createPosition = () => {
   const { name_ru, name_uz } = position.value;
   const code = new Date().toISOString();
   if(name_uz && name_ru) {
      loading.value = true;
      axiosConfig
         .post('/positions/', { name_ru, name_uz, code })
         .then(response => {
            if(response?.status === 201) {
               dispatchNotify('Должность создан', '', 'success');
               props.getFirstPagePositions();
               props.setVisible(false);
            } else {
               dispatchNotify('Должность не создан', '', 'error');
            }
         })
         .catch(() => {
            dispatchNotify('Должность не создан', '', 'error');
         })
         .finally(() => {
            loading.value = false;
         });
   } else {
      dispatchNotify('Введите название должность', '', 'error')
   }
};
</script>
<template>
   <Dialog
      @update:visible="() => {
         position = { name_uz: '', name_ru: '' };
         setVisible(!visible);
      }"
      :pt="dialogConfig"
      :visible="visible"
      header="Создать должность"
      modal
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название должность (UZ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="position.name_uz"
            :pt="{root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название должность"
            type="text"
            @update:modelValue="value => {
               position = { ...position, name_uz: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название должность (РУ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="position.name_ru"
            :pt="{root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название должность"
            type="text"
            @update:modelValue="value => {
               position = { ...position, name_ru: replaceSpecChars(value) };
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
                  @click="() => { setVisible(!visible) }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="createPosition"
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