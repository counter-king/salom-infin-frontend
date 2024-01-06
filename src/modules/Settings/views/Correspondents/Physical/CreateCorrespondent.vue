<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import Textarea from 'primevue/textarea';
import axiosConfig from "@/services/axios.config";
import isValidEmail from '@/utils/isValidEmail';
import { dialogConfig, selectConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref, watch, onMounted } from 'vue';
import { replaceSpecChars } from '@/utils/string';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const props = defineProps({ getFirstPageCorrespondents: Function, setVisible: Function, visible: Boolean });
const defaultCorrespondent = { first_name: '', last_name: '', father_name: '', tin: '', email: '', phone: 8, description: '', address: '' };
const correspondent = ref(defaultCorrespondent);
const gender = ref(null);
const genders = ref([]);
const loading = ref(false);
const createCorrespondent = () => {
   const { first_name, last_name, father_name, tin, email, phone, description, address } = correspondent.value;
   const newPhone = '+99' + String(phone || '');
   const name = `${last_name} ${first_name} ${father_name}`;
   if(first_name && last_name && father_name && gender.value && String(tin || '').length === 9 && newPhone.length === 13 && isValidEmail(email) && address) {
      loading.value = true;
      const data = { address, first_name, last_name, father_name, tin, email, phone: newPhone, description, type: 'physical', gender: gender.value.value, name };
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
   } else if(!first_name) {
      dispatchNotify('Введите имя', '', 'error')
   } else if(!last_name) {
      dispatchNotify('Введите фамилия', '', 'error')
   } else if(!father_name) {
      dispatchNotify('Введите отчество', '', 'error')
   } else if(!gender.value) {
      dispatchNotify('Выберите пол', '', 'error')
   } else if(String(tin || '').length !== 9) {
      dispatchNotify('Введите правильный ИНН', '', 'error')
   } else if(newPhone.length !== 13) {
      dispatchNotify('Введите свой номер телефона правильно', '', 'error')
   } else if(!isValidEmail(email)) {
      dispatchNotify('Введите свой адрес электронной почты правильно', '', 'error')
   } else {
      dispatchNotify('Введите адрес', '', 'error')
   }
};
const changeLanguage = () => {
   genders.value = [
      { name: 'Мужчина', value: 'm' },
      { name: 'Женщина', value: 'f' },
   ];
};
watch(locale, () => {
   changeLanguage();
});
onMounted(() => {
   changeLanguage();
});
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
         <p class="text-sm text-greyscale-500 font-medium mb-1">Имя<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="correspondent.first_name"
            :pt="{root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите имя"
            type="text"
            @update:modelValue="value => {
               correspondent = { ...correspondent, first_name: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Фамилия<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="correspondent.last_name"
            :pt="{root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите фамилия"
            type="text"
            @update:modelValue="value => {
               correspondent = { ...correspondent, last_name: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Отчество<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="correspondent.father_name"
            :pt="{root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите отчество"
            type="text"
            @update:modelValue="value => {
               correspondent = { ...correspondent, father_name: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Пол<span class="text-red-500 ml-1">*</span></p>
         <Dropdown :pt="selectConfig" v-model="gender" :options="genders" showClear optionLabel="name" placeholder="Выберите пол" class="w-full md:w-14rem" />
         <p class="text-sm text-greyscale-500 font-medium mb-1">ИНН<span class="text-red-500 ml-1">*</span></p>
         <InputNumber
            :maxFractionDigits="0"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            placeholder="Введите ИНН"
            v-model="correspondent.tin"
            @input="({ value }) => {
               const tin = +String(value || '').slice(0, 9)
               correspondent = { ...correspondent, tin }
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Номер телефона<span class="text-red-500 ml-1">*</span></p>
         <InputNumber
            :maxFractionDigits="0"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            v-model="correspondent.phone"
            placeholder="Введите номер телефона"
            prefix="+99"
            @input="({value}) => {
               const phone = value && value > 7 ? +String(value || '').slice(0, 10) : 8;
               correspondent = { ...correspondent, phone }
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Электронная почта<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="correspondent.email"
            :pt="{root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите электронная почта"
            type="text"
            @update:modelValue="value => {
               correspondent = { ...correspondent, email: value };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Адрес<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="correspondent.address"
            :pt="{root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите адрес"
            type="text"
            @update:modelValue="value => {
               correspondent = { ...correspondent, address: value };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Содержание</p>
         <Textarea
            :modelValue="correspondent.description"
            :pt="{root: {class:['h-[100px] w-[500px] resize-none rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            cols="30"
            placeholder="Введите содержание"
            rows="5"
            @update:modelValue="value => {
               correspondent = { ...correspondent, description: value };
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