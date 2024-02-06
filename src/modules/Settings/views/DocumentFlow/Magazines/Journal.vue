<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import ProgressSpinner from 'primevue/progressspinner';
import Skeleton from 'primevue/skeleton';
import axiosConfig from "@/services/axios.config";
import { dialogConfig, menuConfig } from './config';
import InputNumber from 'primevue/inputnumber';
import { dispatchNotify } from '@/utils/notify';
import { ref, watch, onMounted } from 'vue';
import { useI18n } from "vue-i18n";
import Checkbox from 'primevue/checkbox';
const { locale } = useI18n();
const props = defineProps({ data: Object, field: String, getFirstPageJournals: Function, journals: Array, setJournals: Function });
const conditionLoading = ref(false);
const conditions = ref([]);
const deleteLoading = ref(false);
const deleteVisible = ref(false);
const editJournal = ref({});
const editLoading = ref(false);
const editVisible = ref(false);
const menu = ref(null);
const sort_order = ref({ value: 1 });
const sortOrderLoading = ref(false);
const checkboxes = ref(['is_for_compose', 'is_auto_numbered']);
const value = ref(['is_for_compose', 'is_auto_numbered']);
const journalEdit = () => {
   const { name_ru, name_uz, sort_order, prefix, number_of_chars, is_for_compose, is_auto_numbered, code } = editJournal.value;
   if(name_uz && name_ru && sort_order && code) {
      editLoading.value = true;
      const journalId = props?.data?.id;
      axiosConfig
         .patch(`journals/${journalId}/`, { name_ru, name_uz, sort_order, prefix, number_of_chars, is_for_compose, is_auto_numbered, code })
         .then(response => {
            const status = response?.status;
            if(status === 200) {
               dispatchNotify('Журнал обновлено', '', 'success');
               editVisible.value = false;
               props.getFirstPageJournals();
            } else {
               dispatchNotify('Журнал не обновлено', '', 'error');
            }
         })
         .catch(() => {
            dispatchNotify('Журнал не обновлено', '', 'error');
         })
         .finally(() => {
            editLoading.value = false;
         });
   } else if(!name_uz || !name_ru) {
      dispatchNotify('Введите название', '', 'error');
   } else if(!code) {
      dispatchNotify('Введите код', '', 'error');
   } else {
      dispatchNotify('Введите сортировка', '', 'error');
   }
};
const journalDelete = () => {
   deleteLoading.value = true;
   const journalId = props?.data?.id;
   axiosConfig
      .delete(`journals/${journalId}/`)
      .then(response => {
         if(response?.status === 204) {
            deleteVisible.value = false;
            dispatchNotify('Журнал удален', '', 'success')
            props.getFirstPageJournals();
         } else {
            dispatchNotify('Журнал не удален', '', 'error')
         }
      })
      .catch(() => {
         dispatchNotify('Журнал не удален', '', 'error')
      })
      .finally(() => {
         deleteLoading.value = false;
      });
};
const updateCondition = value => {
   conditionLoading.value = true;
   const journalId = props?.data?.id;
   axiosConfig
      .patch(`journals/${journalId}/`, { is_active: value?.value })
      .then(response => {
         const status = response?.status;
         if(status === 200) {
            props.getFirstPageJournals();
            dispatchNotify('Статус обновлено', '', 'success');
         } else {
            dispatchNotify('Статус не обновлено', '', 'error');
         }
      })
      .catch(() => {
         dispatchNotify('Статус не обновлено', '', 'error');
      })
      .finally(() => {
         conditionLoading.value = false;
      });
};
const changeOrder = () => {
   sortOrderLoading.value = true;
   const journalId = props?.data?.id;
   axiosConfig
      .put(`journals/${journalId}/change-order/`, { sort_order: sort_order.value.value })
      .then(response => {
         const status = response?.status;
         if(status === 200) {
            props.getFirstPageJournals();
            dispatchNotify('Сортировка обновлено', '', 'success');
         } else {
            dispatchNotify('Сортировка не обновлено', '', 'error');
         }
      })
      .catch(() => {
         dispatchNotify('Сортировка не обновлено', '', 'error');
      })
      .finally(() => {
         sortOrderLoading.value = false;
      });
}
const changeLanguage = () => {
   conditions.value = [
      { label: 'Активный', value: true, },
      { label: 'Неактивный', value: false }
   ];
};
const parseCreateDate = created_date => {
   const parsingDate = new Date(created_date);
   const date = parsingDate.getDate().toString().padStart(2, "0");
   const hour = parsingDate.getHours().toString().padStart(2, "0");
   const month = (parsingDate.getMonth() + 1).toString().padStart(2, "0");
   const minute = parsingDate.getMinutes().toString().padStart(2, "0");
   const year = parsingDate.getFullYear().toString();
   const d = `${date}.${month}.${year} ${hour}:${minute}`;
   return d;
};
const toggle = event => {
   menu.value.toggle(event);
};
const openEditModal = () => {
   const data = props.data;
   let newValue = [];
   if(data?.is_auto_numbered) {
      newValue.push('is_auto_numbered');
   }
   if(data?.is_for_compose) {
      newValue.push('is_for_compose');
   }
   value.value = newValue;
   editJournal.value = data;
   editVisible.value = true;
};
watch(props.data.sort_order, value => {
   sort_order.value = { value };
});
watch(locale, () => {
   changeLanguage();
});
onMounted(() => {
   changeLanguage();
   sort_order.value = { value: props.data.sort_order };
});
</script>
<template>
   <template v-if="field === 'is_active'">
      <template v-if="conditionLoading">
         <Skeleton height="16px" />
      </template>
      <template v-else>
         <span
            @click="toggle"
            :style="{ background: data.is_active ? '#EEFFE7' : '#F7F7F9', color: data.is_active ? '#63BA3D' : '#767994' }"
            class="inline-flex items-center justify-center pr-2 pl-3 py-1 font-medium rounded-[80px] text-sm text-greyscale-500 cursor-pointer">
            <span class="mr-1">{{ data.is_active ? 'Активный' : 'Неактивный' }}</span>
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
               <path d="M9 4.5L6 7.5L3 4.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
         </span>
         <Menu ref="menu" :model="conditions" style="width: initial !important" :popup="true" :pt="menuConfig">
            <template #item="{ item }">
               <div @click="() => { updateCondition(item) }" class="flex justify-between py-[6px] pr-2 pl-3 cursor-pointer">
                  <span class="text-sm font-medium text-primary-900">{{ item.label }}</span>
                  <span class="ml-2" v-if="item.value === data.is_active">
                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3337 9.99935C18.3337 14.6017 14.6027 18.3327 10.0003 18.3327C5.39795 18.3327 1.66699 14.6017 1.66699 9.99935C1.66699 5.39698 5.39795 1.66602 10.0003 1.66602C14.6027 1.66602 18.3337 5.39698 18.3337 9.99935ZM13.3589 7.47407C13.603 7.71815 13.603 8.11388 13.3589 8.35796L9.19227 12.5246C8.94819 12.7687 8.55246 12.7687 8.30838 12.5246L6.64172 10.858C6.39764 10.6139 6.39764 10.2182 6.64172 9.97407C6.8858 9.73 7.28152 9.73 7.5256 9.97407L8.75033 11.1988L10.6127 9.33644L12.4751 7.47407C12.7191 7.23 13.1149 7.23 13.3589 7.47407Z" fill="#635AFF"/>
                     </svg>
                  </span>
               </div>
            </template>
         </Menu>
      </template>
   </template>
   <template v-else-if="field === 'action'">
      <Button
         @click="openEditModal"
         class="shadow-none py-[7px] px-2 text-xs bg-greyscale-50 mr-2 rounded-[8px]"
         icon
         severity="secondary"
         text
         v-tooltip.top="{
            autoHide: false,
            escape: true,
            value: `<h4 class='text-xs text-white -my-1'>Изменить</h4>`,
         }"
         >
         <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M4 22H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M13.8881 3.66293L14.6296 2.92142C15.8581 1.69286 17.85 1.69286 19.0786 2.92142C20.3071 4.14999 20.3071 6.14188 19.0786 7.37044L18.3371 8.11195M13.8881 3.66293C13.8881 3.66293 13.9807 5.23862 15.3711 6.62894C16.7614 8.01926 18.3371 8.11195 18.3371 8.11195M13.8881 3.66293L7.07106 10.4799C6.60933 10.9416 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.25745 16.2417M18.3371 8.11195L11.5201 14.9289C11.0584 15.3907 10.8275 15.6215 10.5729 15.8201C10.2727 16.0543 9.94775 16.2551 9.60398 16.4189C9.31256 16.5578 9.00282 16.6611 8.38334 16.8675L5.75834 17.7426M5.75834 17.7426L5.11667 17.9564C4.81182 18.0581 4.47573 17.9787 4.2485 17.7515C4.02128 17.5243 3.94194 17.1882 4.04356 16.8833L4.25745 16.2417M5.75834 17.7426L4.25745 16.2417" stroke="currentColor" stroke-width="2"/>
         </svg>
      </Button>
      <Button
         @click="() => { deleteVisible = true }"
         class="shadow-none py-[7px] px-2 text-xs bg-greyscale-50 rounded-[8px]"
         icon
         severity="danger"
         text
         v-tooltip.top="{
            autoHide: false,
            escape: true,
            value: `<h4 class='text-xs text-white -my-1'>Удалить</h4>`,
         }"
         >
         <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M20.5001 6H3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M9.5 11L10 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M14.5 11L14 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="currentColor" stroke-width="2"/>
         </svg>
      </Button>
   </template>
   <template v-else-if="field === 'created_date'">
      <span class="text-sm font-medium">{{ parseCreateDate(data[field]) }}</span>
   </template>
   <template v-else-if="field === 'sort_order'">
      <template v-if="conditionLoading">
         <Skeleton height="16px" />
      </template>
      <template v-else>
         <input
            @change="changeOrder"
            class="p-inputtext h-[30px] w-[80px] border-transparent focus:border-primary-500 rounded-[6px] bg-greyscale-50 text-sm px-2"
            v-model="sort_order.value"
            @input="e => {
               const value = +e.target.value.replace(/\D/g, '');
               sort_order = { value: value > 0 ? value : 0 };
            }"
            @blur="() => {
               sort_order = { value: data.sort_order };
            }"
            />
      </template>
   </template>
   <template v-else>
      <span class="text-sm font-medium">{{ data[field] }}</span>
   </template>
   <Dialog
      :closable="!editLoading"
      :pt="dialogConfig"
      header="Изменить журнал"
      modal
      v-model:visible="editVisible"
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (UZ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="editJournal.name_uz"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="name_uz => {
               editJournal = { ...editJournal, name_uz };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (РУ) <span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="editJournal.name_ru"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="name_ru => {
               editJournal = { ...editJournal, name_ru };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Сортировка<span class="text-red-500 ml-1">*</span></p>
         <InputNumber
            :maxFractionDigits="0"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            min="0"
            placeholder="Введите сортировка"
            v-model="editJournal.sort_order"
            @input="({ value }) => {
               const sort_order = value > 0 ? value : 0;
               editJournal = { ...editJournal, sort_order };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Код<span class="text-red-500 ml-1">*</span></p>
         <InputNumber
            v-model="editJournal.code"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            placeholder="Введите код"
            type="text"
            @input="({ value }) => {
               const code =  value < 10000 ? value : 9999;
               editJournal = { ...editJournal, code };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Префикс</p>
         <InputText
            :modelValue="editJournal.prefix"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите префикс"
            type="text"
            @update:modelValue="prefix => {
               editJournal = { ...editJournal, prefix: prefix.slice(0, 10) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Количество цифр</p>
         <InputNumber
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            placeholder="Введите количество цифр"
            type="text"
            v-model="editJournal.number_of_chars"
            @input="({ value }) => {
               const number_of_chars =  value < 10 ? value : 9;
               editJournal = { ...editJournal, number_of_chars };
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
                  editJournal = { ...editJournal, is_auto_numbered, is_for_compose };
               }"
            />
            <label class="ml-2">{{ checkbox === 'is_for_compose' ? 'Для композ' : 'Автоматическая нумерация' }}</label>
         </div>
      </div>
      <template #footer>
         <div class="flex justify-end">
            <template v-if="editLoading">
               <ProgressSpinner class="m-0 w-10 h-10" animationDuration=".5s" strokeWidth="4" />
            </template>
            <template v-else>
               <Button
                  @click="() => {
                     editVisible = false;
                  }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm rounded-xl !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="journalEdit"
                  class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4 m-0"
                  rounded
                  type="button"
               >Изменить</Button>
            </template>
         </div>
      </template>
   </Dialog>
   <Dialog
      :closable="!deleteLoading"
      :pt="dialogConfig"
      dismissableMask
      header="Удалить журнал"
      modal
      v-model:visible="deleteVisible">
      <div class="flex flex-col items-center pb-10 pt-4">
         <div>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
               <circle cx="40" cy="40" r="40" fill="#FFEEF2"/>
               <path d="M28 32.6978C28 32.1718 28.4356 31.7454 28.973 31.7454H35.3572C35.3658 30.6237 35.4874 29.0861 36.6005 28.0216C37.4765 27.1839 38.6774 26.666 40 26.666C41.3225 26.666 42.5235 27.1839 43.3995 28.0216C44.5126 29.0861 44.6341 30.6237 44.6428 31.7454H51.027C51.5644 31.7454 52 32.1718 52 32.6978C52 33.2237 51.5644 33.6501 51.027 33.6501H28.973C28.4356 33.6501 28 33.2237 28 32.6978Z" fill="#F3335C"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M39.4608 53.3327H40.5392C44.2495 53.3327 46.1046 53.3327 47.3108 52.1514C48.517 50.9702 48.6404 49.0326 48.8872 45.1574L49.2428 39.5735C49.3767 37.4708 49.4437 36.4195 48.8386 35.7533C48.2335 35.0871 47.2116 35.0871 45.1679 35.0871H34.8321C32.7884 35.0871 31.7665 35.0871 31.1614 35.7533C30.5563 36.4195 30.6233 37.4708 30.7572 39.5735L31.1128 45.1574C31.3596 49.0326 31.483 50.9702 32.6892 52.1514C33.8954 53.3327 35.7505 53.3327 39.4608 53.3327ZM37.6617 40.2507C37.6067 39.6722 37.1167 39.2501 36.5672 39.308C36.0176 39.3658 35.6167 39.8817 35.6716 40.4601L36.3383 47.4777C36.3932 48.0561 36.8833 48.4782 37.4328 48.4203C37.9824 48.3625 38.3833 47.8467 38.3284 47.2682L37.6617 40.2507ZM43.4328 39.308C43.9824 39.3658 44.3833 39.8817 44.3284 40.4601L43.6617 47.4777C43.6068 48.0561 43.1167 48.4782 42.5672 48.4203C42.0176 48.3625 41.6167 47.8467 41.6716 47.2682L42.3383 40.2507C42.3933 39.6722 42.8833 39.2501 43.4328 39.308Z" fill="#F3335C"/>
            </svg>
         </div>
         <h2 class="text-center font-semibold text-3xl text-gray-900 p-0 mt-6">Удалить журнал?</h2>
         <p class="text-center py-0 px-6 mt-2 text-gray-400">
            Вы уверены, что хотите удалить этого журнал
         </p>
      </div>
      <template #footer>
         <div class="flex justify-end">
            <template v-if="deleteLoading">
               <ProgressSpinner class="m-0 w-10 h-10" animationDuration=".5s" strokeWidth="4" />
            </template>
            <template v-else>
               <Button
                  @click="deleteVisible = false"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm rounded-xl !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="journalDelete"
                  class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4 m-0"
                  rounded
                  type="button"
               >Удалить</Button>
            </template>
         </div>
      </template>
   </Dialog>
</template>
<style></style>