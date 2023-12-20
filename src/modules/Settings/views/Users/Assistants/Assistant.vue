<script setup>
import { ref, watch, onMounted } from 'vue';
import DeleteIcon from './DeleteIcon.vue';
import EditIcon from './EditIcon.vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { dispatchNotify } from '@/utils/notify';
import DownIcon from './DownIcon.vue';
import CheckedIcon from './CheckedIcon.vue';
import axiosConfig from "@/services/axios.config";
import ProgressSpinner from 'primevue/progressspinner';
import { dialogConfig, menuConfig } from './config';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const deleteUser = ref({});
const deleteVisible = ref(false);
const deleteLoading = ref(false);
const editLoading = ref(false);
const editUser = ref({});
const editVisible = ref(false);
const items = ref([]);
const menu = ref(null);
const statusLoading = ref(false);
const props = defineProps({
   assistants: Array,
   data: Object,
   field: String,
   index: Number,
   setAssistants: Function,
});
const toggle = event => {
   menu.value.toggle(event);
};
const updateStatus = value => {
   statusLoading.value = true;
   const sendingData = { is_active: !!value?.value, assistant: props?.data?.assistant?.id, user: props?.data?.user?.id }
   axiosConfig
      .put(`user-assistants/${props?.data?.id}/`, sendingData)
      .then(response => {
         const status = response?.status;
         const data = response?.data;
         if(status === 200) {
            const newAssistants = props?.assistants.map(assistant => {
               if(assistant?.id === props?.data?.id) {
                  return data;
               } else {
                  return assistant;
               }
            });
            props.setAssistants(newAssistants);
            dispatchNotify('Состояние обновлено', '', 'success')
         } else {
            dispatchNotify('Состояние не обновлено', '', 'error')
         }
      })
      .catch(() => {
         dispatchNotify('Состояние не обновлено', '', 'error')
      })
      .finally(() => {
         statusLoading.value = false;
      })
};
const assistantDelete = () => {
   deleteLoading.value = true;
};
const assistantEdit = () => {
   editLoading.value = true;
};
const changeLanguage = () => {
   items.value = [
      { label: 'Активный', value: true, },
      { label: 'Неактивный', value: false }
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
   <template v-if="field === 'assistant'">
      <span class="text-sm font-medium text-greyscale-500">{{ data[field] && data[field].full_name }}</span>
   </template>
   <template v-else-if="field === 'user'">
      <span class="text-sm font-medium text-greyscale-500">{{ data[field] && data[field].full_name }}</span>
   </template>
   <template v-else-if="field === 'is_active'">
      <template v-if="statusLoading">
         <skeleton height="16px" />
      </template>
      <template v-else>
         <span @click="toggle" style="display: inline-flex; justify-content: center; align-items: center" :style="{ background: data.is_active ? '#EEFFE7' : '#FFEEF2', color: data.is_active ? '#63BA3D' : '#F3335C' }" class="pr-2 pl-3 py-1 font-medium rounded-[80px] text-sm text-greyscale-500 cursor-pointer">
            <span class="mr-1">{{ data.is_active ? 'Активный' : 'Неактивный' }}</span>
            <DownIcon />
         </span>
         <Menu ref="menu" :model="items" style="width: initial !important" :popup="true" :pt="menuConfig">
            <template #item="{ item }">
               <div @click="() => { updateStatus(item) }" class="flex justify-between py-[6px] pr-2 pl-3 cursor-pointer">
                  <span class="text-sm font-medium text-primary-900">{{ item.label }}</span>
                  <span class="ml-2" v-if="item.value === data.is_active">
                     <checked-icon/>
                  </span>
               </div>
            </template>
         </Menu>
      </template>
   </template>
   <template v-else>
      <Button
         @click="() => {
            editUser = data;
            editVisible = true;
         }"
         class="py-[7px] px-2 text-xs bg-greyscale-50 mr-2"
         icon
         rounded
         severity="secondary"
         style="box-shadow: none"
         text>
         <EditIcon />
      </Button>
      <Button
         @click="() => {
            deleteUser = data;
            deleteVisible = true;
         }"
         class="py-[7px] px-2 text-xs bg-greyscale-50"
         icon
         rounded
         severity="danger"
         style="box-shadow: none"
         text>
         <DeleteIcon />
      </Button>
   </template>
   <Dialog
      :pt="dialogConfig"
      dismissableMask
      header="Изменить помощник"
      modal
      v-model:visible="editVisible">
      <p>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <template #footer>
         <div style="justify-content: flex-end; display: flex">
            <template v-if="editLoading">
               <ProgressSpinner class="m-0" animationDuration=".5s" style="width: 40px; height: 40px" strokeWidth="4" />
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
                  @click="assistantEdit"
                  class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4 mx-0"
                  rounded
                  style="box-shadow: none"
                  type="button">
                  Изменить</Button>
            </template>
         </div>
      </template>
   </Dialog>
   <Dialog
      :pt="dialogConfig"
      dismissableMask
      header="Удалить помощник"
      modal
      v-model:visible="deleteVisible">
      <p>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <template #footer>
         <div style="justify-content: flex-end; display: flex">
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
                  @click="assistantDelete"
                  class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4 mx-0"
                  rounded
                  style="box-shadow: none"
                  type="button">
                  Удалить</Button>
            </template>
         </div>
      </template>
   </Dialog>
</template>
<style></style>