<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import Textarea from 'primevue/textarea';
import axiosConfig from "@/services/axios.config";
import isValidEmail from '@/utils/isValidEmail';
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const props = defineProps({ getFirstPageCorrespondents: Function, setVisible: Function, visible: Boolean });
const defaultCorrespondent = { legal_name: '', legal_address: '', tin: '', checkpoint: '', email: '', phone: 8, description: '' };
const correspondent = ref(defaultCorrespondent);
const gender = ref(null);
const genders = ref([]);
const loading = ref(false);
const createCorrespondent = () => {
   const { legal_name, legal_address, tin, checkpoint, email, phone, description } = correspondent.value;
   const newPhone = '+99' + String(phone || '');
   if(legal_name && legal_address && String(tin || '').length === 9 && newPhone.length === 13 && isValidEmail(email)) {
      loading.value = true;
      const data = { legal_address, legal_name, tin, checkpoint, email, phone: newPhone, description, type: 'legal', name: legal_name };
      axiosConfig
         .post('correspondents/', data)
         .then(response => {
            if(response?.status === 201) {
               dispatchNotify('Корреспондент создан', '', 'success');
               correspondent.value = defaultCorrespondent;
               gender.value = null;
               props.getFirstPageCorrespondents();
               props.setVisible(false);
            } else {
               dispatchNotify('Корреспондент не создан', '', 'error');
            }
         })
         .catch(() => {
            dispatchNotify('Корреспондент не создан', '', 'error');
         })
         .finally(() => {
            loading.value = false;
         });
   } else if(!legal_name) {
      dispatchNotify('Введите наименование', '', 'error')
   } else if(!legal_address) {
      dispatchNotify('Введите адрес', '', 'error')
   } else if(String(tin || '').length !== 9) {
      dispatchNotify('Введите правильный ИНН', '', 'error')
   } else if(newPhone.length !== 13) {
      dispatchNotify('Введите свой номер телефона правильно', '', 'error')
   } else {
      dispatchNotify('Введите свой адрес электронной почты правильно', '', 'error')
   }
};
</script>
<template>
   <Dialog
      @update:visible="() => {
         correspondent = defaultCorrespondent;
         setVisible(!visible);
      }"
      :closable="!loading"
      :pt="dialogConfig"
      :visible="visible"
      header="Создать корреспондент"
      modal
      >
      <div class="flex flex-col pb-0 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Наименование<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="correspondent.legal_name"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите наименование"
            type="text"
            @update:modelValue="legal_name => {
               correspondent = { ...correspondent, legal_name };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Адрес<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="correspondent.legal_address"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите адрес"
            type="text"
            @update:modelValue="legal_address => {
               correspondent = { ...correspondent, legal_address };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">ИНН<span class="text-red-500 ml-1">*</span></p>
         <InputNumber
            :maxFractionDigits="0"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            placeholder="Введите ИНН"
            v-model="correspondent.tin"
            @input="({ value }) => {
               const tin = +String(value || '').slice(0, 9)
               correspondent = { ...correspondent, tin }
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">КПП</p>
         <InputText
            :modelValue="correspondent.checkpoint"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите КПП"
            type="text"
            @update:modelValue="checkpoint => {
               correspondent = { ...correspondent, checkpoint };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Номер телефона<span class="text-red-500 ml-1">*</span></p>
         <InputNumber
            :maxFractionDigits="0"
            :pt="{ root: { class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm'] }, input: { class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm'] } }"
            :useGrouping="false"
            v-model="correspondent.phone"
            placeholder="Введите номер телефона"
            prefix="+99"
            @input="({ value }) => {
               const phone = value && value > 7 ? +String(value || '').slice(0, 10) : 8;
               correspondent = { ...correspondent, phone }
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Электронная почта<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="correspondent.email"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите электронная почта"
            type="text"
            @update:modelValue="email => {
               correspondent = { ...correspondent, email };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Содержание</p>
         <Textarea
            :modelValue="correspondent.description"
            :pt="{root: {class:['h-[100px] w-[500px] border-transparent focus:border-primary-500 resize-none rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            cols="30"
            placeholder="Введите содержание"
            rows="5"
            @update:modelValue="description => {
               correspondent = { ...correspondent, description };
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
                     correspondent = defaultCorrespondent;
                     setVisible(!visible);
                  }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="createCorrespondent"
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