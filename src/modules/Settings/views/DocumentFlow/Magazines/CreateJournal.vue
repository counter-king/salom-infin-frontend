<script setup>
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
import { useCommonStore } from '@/stores/common';
const commonStore = useCommonStore();
const props = defineProps({ getFirstPageJournals: Function, setVisible: Function, visible: Boolean });
const defaultJournal = { name_uz: '', name_ru: '', prefix: '', number_of_chars: 10, is_for_compose: true, is_auto_numbered: true, code: 0 };
const journal = ref(defaultJournal);
const loading = ref(false);
const checkboxes = ref(['is_for_compose', 'is_auto_numbered']);
const value = ref(['is_for_compose', 'is_auto_numbered']);
const createJournal = () => {
   const { name_ru, name_uz, prefix, number_of_chars, is_for_compose, is_auto_numbered, code } = journal.value;
   if(name_uz && name_ru && code) {
      loading.value = true;
      axiosConfig
         .post('journals/', { name_ru, name_uz, is_active: true, prefix, number_of_chars, is_for_compose, is_auto_numbered, code })
         .then(response => {
            if(response?.status === 201) {
               commonStore.actionJournalsList();
               dispatchNotify(null, 'Журнал создан', 'success');
               journal.value = defaultJournal
               props.getFirstPageJournals();
               props.setVisible(false);
            }
         })
         .catch(() => {})
         .finally(() => {
            loading.value = false;
         });
   } else if(!name_ru || !name_uz) {
      dispatchNotify(null, 'Введите название', 'error');
   } else {
      dispatchNotify(null, 'Введите код', 'error');
   }
};
</script>
<template>
   <Dialog
      :closable="!loading"
      :pt="dialogConfig"
      :visible="visible"
      header="Создать журнал"
      modal
      @update:visible="() => {
         journal = defaultJournal;
         setVisible(!visible);
      }"
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (UZ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="journal.name_uz"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="name_uz => {
               journal = { ...journal, name_uz };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (РУ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="journal.name_ru"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="name_ru => {
               journal = { ...journal, name_ru };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Код<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="journal.code"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите код"
            type="text"
            @update:modelValue="value => {
               journal = { ...journal, code: String(parseInt(value.replace(/[^0-9]/g, '')) || '').slice(0, 8) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Префикс</p>
         <InputText
            :modelValue="journal.prefix"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите префикс"
            type="text"
            @update:modelValue="prefix => {
               journal = { ...journal, prefix: prefix.slice(0, 10) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Количество цифр</p>
         <InputNumber
            v-model="journal.number_of_chars"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            placeholder="Введите количество цифр"
            type="text"
            @input="({ value }) => {
               const number_of_chars =  value < 9 ? value : 8;
               journal = { ...journal, number_of_chars };
            }"
            />
         <div v-for="(checkbox, index) in checkboxes" :key="index" class="flex items-center mt-4">
            <Checkbox
               :name="checkbox"
               :value="checkbox"
               v-model="value"
               @update:modelValue="checkboxes => {
                  const is_auto_numbered = checkboxes.includes('is_auto_numbered');
                  const is_for_compose = checkboxes.includes('is_for_compose');
                  journal = { ...journal, is_auto_numbered, is_for_compose };
               }"
            />
            <label class="ml-2">{{ checkbox === 'is_for_compose' ? 'Для композ' : 'Автоматическая нумерация' }}</label>
         </div>
      </div>
      <template #footer>
         <div class="flex justify-end">
            <template v-if="loading">
               <ProgressSpinner class="m-0 w-10 h-10" animationDuration=".5s" strokeWidth="4" />
            </template>
            <template v-else>
               <Button
                  @click="() => {
                     journal = defaultJournal;
                     setVisible(!visible);
                  }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="createJournal"
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
