<script setup>
import Button from 'primevue/button';
import { useI18n } from "vue-i18n";
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
import { replaceSpecChars } from '@/utils/string';
const { t } = useI18n();
const props = defineProps({ getFirstPageRegions: Function, setVisible: Function, visible: Boolean });
const defaultRegion = { name_uz: '', name_ru: '', code: '' };
const loading = ref(false);
const region = ref(defaultRegion);
const createRegion = () => {
   const { name_ru, name_uz, code } = region.value;
   if(name_uz && name_ru && code) {
      loading.value = true;
      axiosConfig
         .post('regions/', { name_ru, name_uz, name: name_uz, code, is_active: true })
         .then(response => {
            if(response?.status === 201) {
               dispatchNotify(null, t('created-region'), 'success');
               region.value = defaultRegion
               props.getFirstPageRegions();
               props.setVisible(false);
            }
         })
         .catch(() => {})
         .finally(() => {
            loading.value = false;
         });
   } else if(!name_ru || !name_uz) {
      dispatchNotify(null, t('enter-naming-2'), 'error')
   } else {
      dispatchNotify(null, t('enter-code'), 'error')
   }
};
</script>
<template>
   <Dialog
      @update:visible="() => {
         region = defaultRegion;
         setVisible(!visible);
      }"
      :closable="!loading"
      :pt="dialogConfig"
      :visible="visible"
      :header="t('create-region')"
      modal
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('name-uz') }}<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="region.name_uz"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            :placeholder="t('enter-naming-2')"
            type="text"
            @update:modelValue="value => {
               region = { ...region, name_uz: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('name-ru') }}<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="region.name_ru"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            :placeholder="t('enter-naming-2')"
            type="text"
            @update:modelValue="value => {
               region = { ...region, name_ru: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('code') }}<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="region.code"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            :placeholder="t('enter-code')"
            type="text"
            @update:modelValue="value => {
               region = { ...region, code: String(parseInt(value.replace(/[^0-9]/g, '')) || '').slice(0, 8) }
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
                     region = defaultRegion;
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
                  @click="createRegion"
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
