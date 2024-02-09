<script setup>
const { locale } = useI18n();
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import Menu from 'primevue/menu';
import Panel from 'primevue/panel';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { defineProps, ref, watch, onMounted } from 'vue';
import { dialogConfig, menuConfig, menu2Config } from './config';
import { dispatchNotify } from '@/utils/notify';
import { replaceSpecCharsBracket } from '@/utils/string';
import { useI18n } from "vue-i18n";
const props = defineProps({
   activeDepartment: Object,
   defaultFilter: Object,
   department: Object,
   getEmployees: Function,
   getSubDepartments: Function,
   last: Boolean,
   openModal: Function,
   parent: Object,
   parentDepartments: Array,
   setActiveDepartment: Function,
   topLevelDepartment: Object,
});
const collapsed = ref(true);
const conditions = ref([]);
const conditions2 = ref([]);
const deleteLoading = ref(false);
const editDepartment = ref({});
const editLoading = ref(false);
const editVisible = ref(false);
const menu = ref(null);
const menu2 = ref(null);
const visible = ref(false);
const departmentEdit = () => {
   const parent = props?.parent?.id;
   const parent_code = props?.parent?.code;
   const company = props?.parent?.company?.id;
   const { name_ru, name_uz, condition, code } = editDepartment.value;
   if(name_uz && name_ru && code) {
      editLoading.value = true;
      const departmentId = props?.department?.id;
      axiosConfig
         .patch(`/departments/${departmentId}/`, { name_ru, name_uz, condition, code, parent, parent_code, company })
         .then(response => {
            if(response?.status === 200) {
               dispatchNotify('Отдел обновлено', '', 'success');
               editVisible.value = false;
               props.getSubDepartments();
            } else {
               dispatchNotify('Отдел не обновлено', '', 'error');
            }
         })
         .catch(() => {
            dispatchNotify('Отдел не обновлено', '', 'error');
         })
         .finally(() => {
            editLoading.value = false;
         });
   } else if(!name_ru || !name_uz) {
      dispatchNotify('Введите название', '', 'error');
   } else {
      dispatchNotify('Введите код', '', 'error')
   }
};
const deleteDepartment = () => {
   const department = props?.department;
   if(department.employee_count > 0) {
      dispatchNotify('В этом отделе есть сотрудники, сначала удалите сотрудников', '', 'error')
   } else {
      deleteLoading.value = true;
      axiosConfig
         .delete(`departments/${department?.id}/`)
         .then(response => {
            if(response?.status === 204) {
               visible.value = false;
               dispatchNotify('Отдел удален', '', 'success');
               props.getSubDepartments();
            } else {
               dispatchNotify('Отдел не удален', '', 'error');
            }
         })
         .catch(() => {
            dispatchNotify('Отдел не удален', '', 'error');
         })
         .finally(() => {
            deleteLoading.value = false;
         });
   }
};
const updateCondition = value => {
   const departmentId = props?.department?.id;
   axiosConfig
      .patch(`departments/${departmentId}/`, { condition: value?.value })
      .then(response => {
         if(response?.status === 200) {
            props.getSubDepartments();
            dispatchNotify('Статус обновлено', '', 'success');
         } else {
            dispatchNotify('Статус не обновлено', '', 'error');
         }
      })
      .catch(() => {
         dispatchNotify('Статус не обновлено', '', 'error');
      });
};
const changeLanguage = () => {
   conditions.value = [
      { label: 'Добавить', value: 'create', },
      { label: 'Изменить', value: 'edit' },
      { label: 'Удалить', value: 'delete', },
   ];
   conditions2.value = [
      { label: 'Активный', value: 'A', },
      { label: 'Неактивный', value: 'P' }
   ];
};
const toggle = e => {
   menu.value.toggle(e);
   e.stopPropagation();
};
const toggle2 = e => {
   menu2.value.toggle(e);
};
watch(locale, () => {
   changeLanguage();
});
onMounted(() => {
   changeLanguage();
});
</script>
<template>
   <Panel
      :collapsed="collapsed"
      :toggleable="department.children.length > 0"
      @update:collapsed="value => {
         collapsed = value;
      }"
      :pt="{
         content: {class: [
            `relative border-none pl-4 pt-0 pr-0 pb-0 ${collapsed || department.children.length === 0 ? '' : `after:content-[''] after:bg-greyscale-200 after:absolute after:top-[-1px] after:left-[9px] after:outline-offset-[-1px]`}`]},
         header: {
            class: 
               [
                  `font-medium duration-0 cursor-pointer border-0 p-0 border-transparent text-md rounded-none rounded-xl duration-0 hover:text-primary-500 hover:bg-[#FAFAFF]
                  ${props.last ? '' :`after:content-[''] after:bg-greyscale-200 after:absolute after:bottom-0 after:left-[9px] after:outline-offset-[-1px]`}
                  ${activeDepartment?.id === department?.id ? 'text-primary-500 bg-[#F7F7F9]' : 'bg-transparent'}`
               ]
            },
         root: {class: ['settings-structure-department relative bottom-0 flex flex-col w-full ']},
         togglerIcon: {class: ['!bg-transparent flex items-center justify-center !hover:bg-transparent p-panel-header-icon p-link bg-greyscale-100']},
         icons: {class: ['self-start pr-3 pt-3 pb-2 flex flex-row-reverse']}
      }"
      >
      <template #header>
         <div
            @click="() => {
               setActiveDepartment(department);
               getEmployees({ ...defaultFilter, department });
            }"
            class="pl-3 pr-0 py-2 w-full"
            style="width: calc(100% - 128px)"
            >
            <span>{{ department.name }}</span>
         </div>
      </template>
      <template #icons>
         <Button
            @click="toggle"
            class="shadow-none p-0 m-0 w-[32px] h-[32px] flex items-center justify-center text-xs bg-transparent rounded-full"
            icon
            severity="secondary"
            text
            >
            <svg viewBox="0 0 24 24" width="20" height="20">
               <path fill="#6c757d" d="M12,7a2,2,0,1,0-2-2A2,2,0,0,0,12,7Zm0,10a2,2,0,1,0,2,2A2,2,0,0,0,12,17Zm0-7a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z">
               </path>
            </svg>
         </Button>
         <Menu ref="menu" :model="conditions" style="width: initial !important" :popup="true" :pt="menuConfig">
            <template #item="{ item }">
               <div
                  @click="() => {
                     if(item.value === 'create') {
                        openModal([...parentDepartments, department], department)
                     } else if(item.value === 'edit') {
                        editDepartment = { ...department, code: parseInt(department?.code) || 0};
                        editVisible = true;
                     } else {
                        visible = true;
                     }
                  }"
                  class="flex py-[7px] px-3 cursor-pointer">
                  <template v-if="item.value === 'create'">
                     <svg width="22" height="22" class="mr-2" viewBox="0 0 48 48">
                        <path fill="none" d="M0 0h48v48H0z"></path>
                        <path fill="#635AFF" d="M26 14h-4v8h-8v4h8v8h4v-8h8v-4h-8v-8zM24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z"></path>
                     </svg>
                     <span class="text-sm font-medium text-primary-500">{{ item.label }}</span>
                  </template>
                  <template v-if="item.value === 'edit'">
                     <span class="mr-2">
                        <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                           <path d="M4 22H20" stroke="#6c757d" stroke-width="2" stroke-linecap="round"/>
                           <path d="M13.8881 3.66293L14.6296 2.92142C15.8581 1.69286 17.85 1.69286 19.0786 2.92142C20.3071 4.14999 20.3071 6.14188 19.0786 7.37044L18.3371 8.11195M13.8881 3.66293C13.8881 3.66293 13.9807 5.23862 15.3711 6.62894C16.7614 8.01926 18.3371 8.11195 18.3371 8.11195M13.8881 3.66293L7.07106 10.4799C6.60933 10.9416 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.25745 16.2417M18.3371 8.11195L11.5201 14.9289C11.0584 15.3907 10.8275 15.6215 10.5729 15.8201C10.2727 16.0543 9.94775 16.2551 9.60398 16.4189C9.31256 16.5578 9.00282 16.6611 8.38334 16.8675L5.75834 17.7426M5.75834 17.7426L5.11667 17.9564C4.81182 18.0581 4.47573 17.9787 4.2485 17.7515C4.02128 17.5243 3.94194 17.1882 4.04356 16.8833L4.25745 16.2417M5.75834 17.7426L4.25745 16.2417" stroke="#6c757d" stroke-width="2"/>
                        </svg>
                     </span>
                     <span class="text-sm font-medium" style="color: #6c757d">{{ item.label }}</span>
                  </template>
                  <template v-if="item.value === 'delete'">
                     <span class="mr-2">
                        <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                           <path d="M20.5001 6H3.5" stroke="#F3335C" stroke-width="2" stroke-linecap="round"/>
                           <path d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5" stroke="#F3335C" stroke-width="2" stroke-linecap="round"/>
                           <path d="M9.5 11L10 16" stroke="#F3335C" stroke-width="2" stroke-linecap="round"/>
                           <path d="M14.5 11L14 16" stroke="#F3335C" stroke-width="2" stroke-linecap="round"/>
                           <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#F3335C" stroke-width="2"/>
                        </svg>
                     </span>
                     <span class="text-sm font-medium" style="color: #F3335C">{{ item.label }}</span>
                  </template>
               </div>
            </template>
         </Menu>
         <span
            @click="toggle2"
            :style="{ background: department.condition === 'A' ? '#EEFFE7' : '#F7F7F9', color: department.condition === 'A' ? '#63BA3D' : '#767994', 'border-color': department.condition === 'A' ? '#CDE7C2' : '#E2E8F0' }"
            class="inline-flex items-center justify-center border-[1px] pr-2 pl-3 py-1 font-medium rounded-[80px] text-sm text-greyscale-500 cursor-pointer ml-1">
            <span class="mr-1 w-[6px] h-[6px] block rounded-full" :style="{ background: department.condition === 'A' ? '#63BA3D' : '#9CA8B9' }"></span>
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
               <path d="M9 4.5L6 7.5L3 4.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
         </span>
         <Menu ref="menu2" :model="conditions2" style="width: initial !important" :popup="true" :pt="menu2Config">
            <template #item="{ item }">
               <div @click="() => { updateCondition(item) }" class="flex justify-between py-[6px] pr-2 pl-3 cursor-pointer">
                  <span class="text-sm font-medium text-primary-900">{{ item.label }}</span>
                  <span class="ml-2" v-if="item.value === department.condition">
                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3337 9.99935C18.3337 14.6017 14.6027 18.3327 10.0003 18.3327C5.39795 18.3327 1.66699 14.6017 1.66699 9.99935C1.66699 5.39698 5.39795 1.66602 10.0003 1.66602C14.6027 1.66602 18.3337 5.39698 18.3337 9.99935ZM13.3589 7.47407C13.603 7.71815 13.603 8.11388 13.3589 8.35796L9.19227 12.5246C8.94819 12.7687 8.55246 12.7687 8.30838 12.5246L6.64172 10.858C6.39764 10.6139 6.39764 10.2182 6.64172 9.97407C6.8858 9.73 7.28152 9.73 7.5256 9.97407L8.75033 11.1988L10.6127 9.33644L12.4751 7.47407C12.7191 7.23 13.1149 7.23 13.3589 7.47407Z" fill="#635AFF"/>
                     </svg>
                  </span>
               </div>
            </template>
         </Menu>
      </template>
      <template #togglericon="{ collapsed }">
         <span :style="{ 'transform': `rotate(${collapsed ? 180 : 0}deg)` }" class="text-sm pi pi-chevron-up transition duration-400 origin-center"></span>
      </template>
      <template v-for="(section, index) in department.children" :key="index">
         <Department
            :activeDepartment="activeDepartment"
            :department="section"
            :getEmployees="getEmployees"
            :getSubDepartments="getSubDepartments"
            :last="department.children.length - 1 === index"
            :openModal="openModal"
            :parent="department"
            :parentDepartments="[...parentDepartments, department]"
            :setActiveDepartment="setActiveDepartment"
            :topLevelDepartment="topLevelDepartment"
         />
      </template>
   </Panel>
   <Dialog
      :closable="!editLoading"
      :pt="dialogConfig"
      header="Изменить субдепартамент"
      modal
      v-model:visible="editVisible">
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Департамент</p>
         <InputText
            :modelValue="topLevelDepartment.name"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            disabled
            type="text"
            />
         <div v-for="(department, index) in parentDepartments" :key="index">
            <p class="text-sm text-greyscale-500 font-medium mb-1">`Субдепартамент</p>
            <InputText
               :modelValue="department.name"
               :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
               type="text"
               disabled
               />
            </div>
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (UZ)<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="editDepartment.name_uz"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="value => {
               editDepartment = { ...editDepartment, name_uz: replaceSpecCharsBracket(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Название (РУ) <span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="editDepartment.name_ru"
            :pt="{root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']}}"
            placeholder="Введите название"
            type="text"
            @update:modelValue="value => {
               editDepartment = { ...editDepartment, name_ru: replaceSpecCharsBracket(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Код верхнего уровня</p>
         <InputNumber
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            disabled
            v-model="editDepartment.parent_code"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Код<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="editDepartment.code"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            placeholder="Введите код"
            type="text"
            @update:modelValue="value => {
               editDepartment = { ...editDepartment, code: String(parseInt(value.replace(/[^0-9]/g, '')) || '').slice(0, 6) };
            }"
            />
      </div>
      <template #footer>
         <div class="flex justify-end">
            <template v-if="editLoading">
               <ProgressSpinner class="m-0 w-10 h-10" animationDuration=".5s" strokeWidth="4" />
            </template>
            <template v-else>
               <Button
                  @click="editVisible = false"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm rounded-xl !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="departmentEdit"
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
      header="Удалить отдел"
      modal
      v-model:visible="visible">
      <div class="flex flex-col items-center pb-10 pt-4">
         <div>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
               <circle cx="40" cy="40" r="40" fill="#FFEEF2"/>
               <path d="M28 32.6978C28 32.1718 28.4356 31.7454 28.973 31.7454H35.3572C35.3658 30.6237 35.4874 29.0861 36.6005 28.0216C37.4765 27.1839 38.6774 26.666 40 26.666C41.3225 26.666 42.5235 27.1839 43.3995 28.0216C44.5126 29.0861 44.6341 30.6237 44.6428 31.7454H51.027C51.5644 31.7454 52 32.1718 52 32.6978C52 33.2237 51.5644 33.6501 51.027 33.6501H28.973C28.4356 33.6501 28 33.2237 28 32.6978Z" fill="#F3335C"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M39.4608 53.3327H40.5392C44.2495 53.3327 46.1046 53.3327 47.3108 52.1514C48.517 50.9702 48.6404 49.0326 48.8872 45.1574L49.2428 39.5735C49.3767 37.4708 49.4437 36.4195 48.8386 35.7533C48.2335 35.0871 47.2116 35.0871 45.1679 35.0871H34.8321C32.7884 35.0871 31.7665 35.0871 31.1614 35.7533C30.5563 36.4195 30.6233 37.4708 30.7572 39.5735L31.1128 45.1574C31.3596 49.0326 31.483 50.9702 32.6892 52.1514C33.8954 53.3327 35.7505 53.3327 39.4608 53.3327ZM37.6617 40.2507C37.6067 39.6722 37.1167 39.2501 36.5672 39.308C36.0176 39.3658 35.6167 39.8817 35.6716 40.4601L36.3383 47.4777C36.3932 48.0561 36.8833 48.4782 37.4328 48.4203C37.9824 48.3625 38.3833 47.8467 38.3284 47.2682L37.6617 40.2507ZM43.4328 39.308C43.9824 39.3658 44.3833 39.8817 44.3284 40.4601L43.6617 47.4777C43.6068 48.0561 43.1167 48.4782 42.5672 48.4203C42.0176 48.3625 41.6167 47.8467 41.6716 47.2682L42.3383 40.2507C42.3933 39.6722 42.8833 39.2501 43.4328 39.308Z" fill="#F3335C"/>
            </svg>
         </div>
         <h2 class="text-center font-semibold text-3xl text-gray-900 p-0 mt-6">Удалить отдел?</h2>
         <p class="text-center py-0 px-6 mt-2 text-gray-400">
            Вы уверены, что хотите удалить этого отдел
         </p>
      </div>
      <template #footer>
         <div class="flex justify-end">
            <template v-if="deleteLoading">
               <ProgressSpinner class="m-0 w-10 h-10" animationDuration=".5s" strokeWidth="4" />
            </template>
            <template v-else>
               <Button
                  @click="visible = false"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm rounded-xl !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="deleteDepartment"
                  class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4 m-0"
                  rounded
                  type="button"
               >Удалить</Button>
            </template>
         </div>
      </template>
   </Dialog>
</template>
<style>
.settings-structure-department > .p-panel-header:hover .settings-department-action {
   opacity: 1;
}
.settings-structure-department > .p-panel-header:after {
   width: calc(100% - 18px);
   height: 1px;
}
.settings-structure-department .p-panel-content:after {
   width: calc(100% - 18px);
   height: 1px;
}
</style>