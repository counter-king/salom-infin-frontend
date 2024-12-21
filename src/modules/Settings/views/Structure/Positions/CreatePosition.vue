<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({ getFirstPagePositions: Function, setVisible: Function, visible: Boolean });
const defaultPosition = { name_uz: '', name_ru: '', code: '' };
const position = ref(defaultPosition);
const loading = ref(false);
const createPosition = () => {
   const { name_ru, name_uz, code } = position.value;
   if(name_uz && name_ru && code) {
      loading.value = true;
      axiosConfig
         .post('/positions/', { name_ru, name_uz, is_active: true, code })
         .then(response => {
            if(response?.status === 201) {
               dispatchNotify(null, t('created-position'), 'success');
               position.value = defaultPosition;
               props.getFirstPagePositions();
               props.setVisible(false);
            }
         })
         .catch(() => {})
         .finally(() => {
            loading.value = false;
         });
   } else if(!name_ru || !name_uz) {
     dispatchNotify(null, t('enter-naming-2'), 'error');
   } else {
     dispatchNotify(null, t('enter-code'), 'error');
   }
};
</script>
<template>
   <Dialog
      :closable="!loading"
      :pt="dialogConfig"
      :visible="visible"
      :header="t('create-position')"
      modal
      @update:visible="() => {
         position = defaultPosition;
         setVisible(!visible);
      }"
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('name-uz') }}<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="position.name_uz"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            :placeholder="t('enter-naming-2')"
            type="text"
            @update:modelValue="name_uz => {
               position = { ...position, name_uz };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('name-ru') }}<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="position.name_ru"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            :placeholder="t('enter-naming-2')"
            type="text"
            @update:modelValue="name_ru => {
               position = { ...position, name_ru };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('code') }}<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="position.code"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            :placeholder="t('enter-code')"
            type="text"
            @update:modelValue="value => {
               position = { ...position, code: String(parseInt(value.replace(/[^0-9]/g, '')) || '').slice(0, 8) };
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
                     position = defaultPosition;
                     setVisible(!visible);
                  }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button"
               >
                 {{ t('cancel') }}
               </Button>

               <Button
                  @click="createPosition"
                  class="shadow-none p-button p-component font-semibold text-sm !rounded-full m-0 py-[9px] px-4"
                  rounded
                  type="button"
               >
                 {{ t('create') }}
               </Button>
            </template>
         </div>
      </template>
   </Dialog>
</template>
<style></style>
