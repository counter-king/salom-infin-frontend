<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import DepartmentTree from './DepartmentTree.vue';
import { dialogConfig, menuConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref, onMounted, watch } from 'vue';
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n();
const props = defineProps({
   data: Object,
   field: String,
   getFirstPageEmployees: Function,
});
const conditions = ref([]);
const deleteLoading = ref(false);
const deleteVisible = ref(false);
const departments = ref(['']);
const editLoading = ref(false);
const editVisible = ref(false);
const menu = ref(null);

const topLevelDepartment = ref('');
const topLevelDepartments = ref([]);
const topLevelDepartmentsLoading = ref(false);
const topLevelDepartmentsPage = ref(1);
const transferEmployee = () => {
   const rootDepartments = departments.value;
   const newDepartments = rootDepartments.slice(0, rootDepartments.length - 1);
   const department_ids = newDepartments.map(department => department?.id);
   const department = newDepartments[newDepartments.length - 1]?.id || null;
   const top_level_department = topLevelDepartment?.value?.id;
   const data = { department, department_ids, top_level_department };
   if(top_level_department) {
      editLoading.value = true;
      axiosConfig
         .patch(`users/${props?.data?.id}/`, data)
         .then(response => {
            if(response?.status === 200) {
               editVisible.value = false;
               dispatchNotify(null, t('deleted-employee'), 'success')
               props.getFirstPageEmployees();
            }
         })
         .catch(() => {})
         .finally(() => {
            editLoading.value = false;
         });
   } else {
      dispatchNotify(null, t('enter-department'), 'error');
   }
};
const searchTopLevelDepartments = ({ search, page }) => {
   departments.value = [''];
   topLevelDepartment.value = search;
   topLevelDepartmentsLoading.value = true;
   axiosConfig
      .get(`departments/top-level-departments/?condition=A,K&page=${page}&search=${search}`)
      .then(response => {
         const newPage = response?.data?.next ? page + 1 : null;
         const results = response?.data?.results;
         const rootTopLevelDepartments = page === 1 ? [] : topLevelDepartments.value;
         const newTopLevelDepartments = Array.isArray(results) ? results : [];
         topLevelDepartments.value = [...rootTopLevelDepartments, ...newTopLevelDepartments];
         topLevelDepartmentsPage.value = newPage;
      })
      .catch(() => {
         topLevelDepartmentsPage.value = null;
      })
      .finally(() => {
         topLevelDepartmentsLoading.value = false;
      });
};
const setDepartments = newDepartments => {
   departments.value = newDepartments;
};
const employeeDelete = () => {
   const data = { department: null, department_ids: [] };
   deleteLoading.value = true;
   axiosConfig
      .patch(`users/${props?.data?.id}/`, data)
      .then(response => {
         if(response?.status === 200) {
            deleteVisible.value = false;
            dispatchNotify(null, t('deleted-employee'), 'success')
            props.getFirstPageEmployees();
         }
      })
      .catch(() => {})
      .finally(() => {
         deleteLoading.value = false;
      });
};
const changeLanguage = () => {
   conditions.value = [
      { label: t('transfer'), value: 'transfer' },
      { label: t('delete'), value: 'delete', },
   ];
};
const toggle = event => {
   menu.value.toggle(event);
}
watch(locale, () => {
   changeLanguage();
});
onMounted(() => {
   changeLanguage();
});
</script>
<template>
   <template v-if="field === 'action'">
      <div class="w-full h-full flex items-center justify-end">
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
                     if(item.value === 'transfer') {
                        editVisible = true;
                     } else {
                        deleteVisible = true;
                     }
                  }"
                  class="flex py-[7px] px-3 cursor-pointer">
                  <template v-if="item.value === 'transfer'">
                     <span class="mr-2">
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M2.45386 7.55555H1.80386V7.55556L2.45386 7.55555ZM2.45386 8.66667L1.99605 9.12809C2.24947 9.37953 2.65825 9.37953 2.91167 9.12809L2.45386 8.66667ZM4.03154 8.01698C4.28638 7.76414 4.288 7.35258 4.03515 7.09775C3.78231 6.84291 3.37076 6.84129 3.11592 7.09413L4.03154 8.01698ZM1.79179 7.09413C1.53696 6.84129 1.1254 6.84291 0.872563 7.09775C0.619721 7.35258 0.621338 7.76414 0.876174 8.01698L1.79179 7.09413ZM12.2832 5.00708C12.4712 5.3129 12.8716 5.4084 13.1774 5.2204C13.4832 5.03239 13.5787 4.63206 13.3907 4.32625L12.2832 5.00708ZM8.05323 1.35C4.60662 1.35 1.80386 4.12352 1.80386 7.55555H3.10386C3.10386 4.8511 5.31494 2.65 8.05323 2.65V1.35ZM1.80386 7.55556L1.80386 8.66667L3.10386 8.66667L3.10386 7.55555L1.80386 7.55556ZM2.91167 9.12809L4.03154 8.01698L3.11592 7.09413L1.99605 8.20525L2.91167 9.12809ZM2.91167 8.20525L1.79179 7.09413L0.876174 8.01698L1.99605 9.12809L2.91167 8.20525ZM13.3907 4.32625C12.2934 2.54143 10.3127 1.35 8.05323 1.35V2.65C9.84569 2.65 11.4143 3.59372 12.2832 5.00708L13.3907 4.32625Z" fill="#767994"/>
                           <path d="M13.5419 7.33594L13.9989 6.87364C13.7457 6.62337 13.3382 6.62337 13.085 6.87364L13.5419 7.33594ZM11.9609 7.98475C11.7055 8.23711 11.7031 8.64866 11.9555 8.90398C12.2079 9.1593 12.6194 9.1617 12.8747 8.90934L11.9609 7.98475ZM14.2092 8.90934C14.4645 9.1617 14.876 9.1593 15.1284 8.90398C15.3808 8.64866 15.3784 8.23711 15.123 7.98475L14.2092 8.90934ZM3.67229 10.9946C3.48376 10.6891 3.08327 10.5943 2.77778 10.7828C2.47228 10.9713 2.37746 11.3718 2.56599 11.6773L3.67229 10.9946ZM7.92117 14.6526C11.3773 14.6526 14.1919 11.8814 14.1919 8.44705H12.8919C12.8919 11.1492 10.6736 13.3526 7.92117 13.3526V14.6526ZM14.1919 8.44705V7.33594H12.8919V8.44705H14.1919ZM13.085 6.87364L11.9609 7.98475L12.8747 8.90934L13.9989 7.79823L13.085 6.87364ZM13.085 7.79823L14.2092 8.90934L15.123 7.98475L13.9989 6.87364L13.085 7.79823ZM2.56599 11.6773C3.66754 13.4623 5.65509 14.6526 7.92117 14.6526V13.3526C6.11979 13.3526 4.54442 12.4078 3.67229 10.9946L2.56599 11.6773Z" fill="#767994"/>
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
      </div>
   </template>
   <template v-else-if="field === 'position'">
      <span class="text-sm font-medium">{{ data[field] && data[field].name }}</span>
   </template>
   <template v-else>
      <span class="text-sm font-medium">{{ data[field] }}</span>
   </template>
   <Dialog
      :closable="!editLoading"
      :pt="dialogConfig"
      :header="t('transfer-employee')"
      modal
      v-model:visible="editVisible">
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('employee-fio') }}</p>
         <InputText
            :modelValue="data.full_name"
            :pt="{ root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-4 text-sm']} }"
            type="text"
            disabled
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('position') }}</p>
         <InputText
            :modelValue="data.position.name"
            :pt="{ root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-4 text-sm']} }"
            type="text"
            disabled
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('current-department') }}</p>
         <InputText
            :modelValue="data.top_level_department.name"
            :pt="{ root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-4 text-sm']} }"
            type="text"
            disabled
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Текущий субдепартамент</p>
         <InputText
            :modelValue="data.department.name"
            :pt="{ root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-4 text-sm']} }"
            type="text"
            disabled
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('department') }}<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :loading="topLevelDepartmentsLoading"
            :options="topLevelDepartments"
            :page="topLevelDepartmentsPage"
            :value="topLevelDepartment"
            @onInputChange="searchTopLevelDepartments"
            key="id"
            label="name"
            :noOptionsMessage="t('department-not-found')"
            :placeholder="t('enter-department')"
            @onChange="value => {
               topLevelDepartment = value;
            }"
            >
            <template #option="{ option }">
               <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
            </template>
         </base-auto-complete>
         <template v-if="topLevelDepartment?.id">
            <DepartmentTree
               :department="department"
               :departments="departments"
               :key="index"
               :order="index"
               :parent="index === 0 ? topLevelDepartment : departments[index - 1]"
               :setDepartments="setDepartments"
               v-for="(department, index) in departments"
            />
         </template>
      </div>
      <template #footer>
         <div class="flex justify-end">
            <template v-if="editLoading">
               <ProgressSpinner class="m-0 w-10 h-10" animationDuration=".5s" strokeWidth="4" />
            </template>
            <template v-else>
               <Button
                  @click="editVisible = false"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button"
               >
                  {{ t('cancel') }}
               </Button>

               <Button
                  @click="transferEmployee"
                  class="p-button p-component font-semibold text-sm !rounded-full py-[9px] px-4"
                  rounded
                  type="button"
               >
                 {{ t('transfer') }}
               </Button>
            </template>
         </div>
      </template>
   </Dialog>
   <Dialog
      :closable="!deleteLoading"
      :pt="dialogConfig"
      :header="t('delete-employee')"
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
         <h2 class="text-center font-semibold text-3xl text-gray-900 p-0 mt-6">{{ t('delete-employee') }}?</h2>
         <p class="text-center py-0 px-6 mt-2 text-gray-400">
            {{ t('delete-text-employee') }}
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
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button"
               >
                  {{ t('cancel') }}
               </Button>

               <Button
                  @click="employeeDelete"
                  class="p-button p-component font-semibold text-sm !rounded-full py-[9px] px-4"
                  rounded
                  type="button"
               >
                 {{ t('delete') }}
               </Button>
            </template>
         </div>
      </template>
   </Dialog>
</template>
<style></style>
