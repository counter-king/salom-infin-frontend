<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
import { replaceSpecCharsBracket } from '@/utils/string';
const props = defineProps({ getFirstPageBranches: Function, setVisible: Function, visible: Boolean });
const defaultBranch = { name_uz: '', name_ru: '', address_ru: '', address_uz: '', phone: 8 };
const branch = ref(defaultBranch);
const loading = ref(false);
const createBranch = () => {
   const { name_ru, name_uz, address_ru, address_uz, phone } = branch.value;
   const newPhone = '+99' + phone.toString();
   if(name_uz && name_ru && address_ru && address_uz && newPhone.length === 13) {
      loading.value = true;
      const data = { name_ru, name_uz, condition: 'A', address_ru, address_uz, phone: newPhone };
      axiosConfig
         .post('/companies/', data)
         .then(response => {
            if(response?.status === 201) {
               branch.value = defaultBranch;
               dispatchNotify('Филиал создан', '', 'success');
               props.getFirstPageBranches();
               props.setVisible(false);
            } else {
               dispatchNotify('Филиал не создан', '', 'error');
            }
         })
         .catch(() => {
            dispatchNotify('Филиал не создан', '', 'error');
         })
         .finally(() => {
            loading.value = false;
         });
   } else if(!name_ru || !name_uz) {
      dispatchNotify('Введите название', '', 'error');
   } else if(!address_ru || !address_uz) {
      dispatchNotify('Введите адрес', '', 'error');
   } else {
      dispatchNotify('Введите номер телефона', '', 'error');
   }
};
</script>
<template>
   <Dialog
      :closable="!loading"
      :pt="dialogConfig"
      :visible="visible"
      header="Создать филиал"
      modal
      @update:visible="() => {
         branch = defaultBranch;
         setVisible(!visible);
      }"
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (UZ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="branch.name_uz"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="value => {
               branch = { ...branch, name_uz: replaceSpecCharsBracket(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (РУ) <span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="branch.name_ru"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="value => {
               branch = { ...branch, name_ru: replaceSpecCharsBracket(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Адрес (UZ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="branch.address_uz"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите адрес"
            type="text"
            @update:modelValue="value => {
               branch = { ...branch, address_uz: replaceSpecCharsBracket(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Адрес (РУ) <span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="branch.address_ru"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите адрес"
            type="text"
            @update:modelValue="value => {
               branch = { ...branch, address_ru: replaceSpecCharsBracket(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Номер телефона<span class="text-red-500 ml-1">*</span></p>
         <InputNumber
            :maxFractionDigits="0"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            placeholder="Введите номер телефона"
            prefix="+99"
            v-model="branch.phone"
            @input="({ value }) => {
               const phone = value && value > 7 ? +value.toString().slice(0, 10) : 8;
               branch = { ...branch, phone }
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
                     branch = defaultBranch;
                     setVisible(!visible);
                  }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="createBranch"
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