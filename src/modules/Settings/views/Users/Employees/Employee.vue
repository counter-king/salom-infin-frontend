<script setup>
import Button from 'primevue/button';
import DeleteIcon from './DeleteIcon.vue';
import DeleteSymbolIcon from './DeleteSymbolIcon.vue';
import Dialog from 'primevue/dialog';
import EditIcon from './EditIcon.vue';
import { dialogConfig } from './config';
import axiosConfig from "@/services/axios.config";
import { dispatchNotify } from '@/utils/notify';
import ProgressSpinner from 'primevue/progressspinner';
import { ref } from 'vue';
const props = defineProps({
   data: Object,
   employees: Array,
   field: String,
   getFirstPageEmployees: Function,
   setEmployees: Function,
});
const deleteEmployee = ref({});
const deleteLoading = ref(false);
const deleteVisible = ref(false);
const editEmployee = ref({});
const editLoading = ref(false);
const editVisible = ref(false);
const employeeDelete = () => {
   deleteLoading.value = true;
   axiosConfig
      .delete(`users/${props?.data?.id}`)
      .then(response => {
         if(response?.status === 204) {
            deleteVisible.value = false;
            dispatchNotify('Сотрудник удален', '', 'success')
            props.getFirstPageEmployees();
         } else {
            dispatchNotify('Сотрудник не удален', '', 'error')
         }
      })
      .catch(() => {
         dispatchNotify('Сотрудник не удален', '', 'error')
      })
      .finally(() => {
         deleteLoading.value = false;
      });
};
const employeeEdit = () => {};
</script>
<template>
   <template v-if="field === 'status'">
      <span class="text-sm font-medium text-greyscale-500" style="text-transform: uppercase;">
         <template v-if="data[field] && data[field].name">
            <span :style="{ background: data.is_active ? '#EEFFE7' : '#F7F7F9', color: data.is_active ? '#63BA3D' : '#767994' }" class="px-2 py-1 text-xs font-semibold rounded-[80px]">{{ data[field] && data[field].name }}</span>
         </template>
      </span>
   </template>
   <template v-else-if="field === 'action'">
      <Button
         @click="() => {
            editEmployee = data;
            editVisible = true;
         }" icon class="py-[7px] px-2 text-xs bg-greyscale-50 mr-2 rounded-[8px]" severity="secondary" text style="box-shadow: none">
         <EditIcon />
      </Button>
      <Button @click="() => {
         deleteEmployee = data;
         deleteVisible = true;
      }" icon class="py-[7px] px-2 text-xs bg-greyscale-50 rounded-[8px]" severity="danger" text style="box-shadow: none">
         <DeleteIcon />
      </Button>
   </template>
   <template v-else>
      <span class="text-sm font-medium text-greyscale-500">{{ data[field] }}</span>
   </template>
   <Dialog
      :pt="dialogConfig"
      dismissableMask
      header="Изменить сотрудники"
      modal
      v-model:visible="editVisible">
      <p>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <template #footer>
         <div class="flex" style="justify-content: flex-end">
            <template v-if="editLoading">
               <ProgressSpinner class="m-0" animationDuration=".5s" style="width: 40px; height: 40px" strokeWidth="4" />
            </template>
            <template>
               <Button
                  @click="editVisible = false"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm rounded-xl !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="employeeEdit"
                  class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4"
                  rounded
                  type="button"
               >Изменить</Button>
            </template>
         </div>
      </template>
   </Dialog>
   <Dialog
      :pt="dialogConfig"
      dismissableMask
      header="Удалить сотрудники"
      modal
      v-model:visible="deleteVisible">
      <div class="flex flex-col items-center pb-10 pt-4">
         <div>
            <DeleteSymbolIcon />
         </div>
         <h2 class="text-center font-semibold text-3xl text-gray-900 p-0 mt-6">Удалить сотрудник?</h2>
         <p class="text-center py-0 px-6 mt-2 text-gray-400">
            Вы уверены, что хотите удалить этого сотрудник
         </p>
      </div>
      <template #footer>
         <div class="flex" style="justify-content: flex-end">
            <template v-if="deleteLoading">
               <ProgressSpinner class="m-0" animationDuration=".5s" style="width: 40px; height: 40px" strokeWidth="4" />
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
                  @click="employeeDelete"
                  class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4"
                  rounded
                  type="button"
               >Удалить</Button>
            </template>
         </div>
      </template>
   </Dialog>
</template>
<style></style>