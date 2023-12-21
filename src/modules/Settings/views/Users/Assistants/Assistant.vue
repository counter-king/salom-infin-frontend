<script setup>
import { ref, watch, onMounted } from 'vue';
import DeleteIcon from './DeleteIcon.vue';
import AutoComplete from 'primevue/autocomplete';
import Avatar from 'primevue/avatar';
import EditIcon from './EditIcon.vue';
import Dialog from 'primevue/dialog';
import ClearIcon from './ClearIcon.vue';
import Skeleton from 'primevue/skeleton';
import Button from 'primevue/button';
import SearchIcon from './SearchIcon.vue';
import { dispatchNotify } from '@/utils/notify';
import DownIcon from './DownIcon.vue';
import CheckedIcon from './CheckedIcon.vue';
import DeleteSymbolIcon from './DeleteSymbolIcon.vue';
import axiosConfig from "@/services/axios.config";
import ProgressSpinner from 'primevue/progressspinner';
import { useAuthStore } from '../../../../Auth/stores';
import { dialogConfig, menuConfig, autocompleteConfig } from './config';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const assistant = ref('');
const assistantLoading = ref(false);
const assistants = ref([]);
const authStore = useAuthStore();
const supervisor = ref('');
const supervisorLoading = ref(false);
const supervisors = ref([]);
const currentUserCompany = authStore.currentUser.company;
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
   getFirstPageAssistants: Function,
   setAssistants: Function,
});
const toggle = event => {
   menu.value.toggle(event);
};
const updateStatus = value => {
   statusLoading.value = true;
   const sendingData = { is_active: !!value?.value, assistant: props?.data?.assistant?.id, user: props?.data?.user?.id };
   const assistantId = props?.data?.id;
   axiosConfig
      .put(`user-assistants/${assistantId}/`, sendingData)
      .then(response => {
         const data = response?.data;
         const status = response?.status;
         if(status === 200) {
            const newAssistants = props?.assistants.map(assistant => {
               if(assistant?.id === assistantId) {
                  return data;
               } else {
                  return assistant;
               }
            });
            props.setAssistants(newAssistants);
            dispatchNotify('Состояние обновлено', '', 'success');
         } else {
            dispatchNotify('Состояние не обновлено', '', 'error');
         }
      })
      .catch(() => {
         dispatchNotify('Состояние не обновлено', '', 'error');
      })
      .finally(() => {
         statusLoading.value = false;
      });
};
const assistantDelete = () => {
   deleteLoading.value = true;
   axiosConfig
      .delete(`user-assistants/${props?.data?.id}/`)
      .then(response => {
         if(response?.status === 204) {
            deleteVisible.value = false;
            dispatchNotify('Помощник удален', '', 'success');
            props.getFirstPageAssistants();
         } else {
            dispatchNotify('Помощник не удален', '', 'error');
         }
      })
      .catch(() => {
         dispatchNotify('Помощник не удален', '', 'error');
      })
      .finally(() => {
         deleteLoading.value = false;
      });
};
const searchAssistants = e => {
   const value = e.target.value
   assistant.value = value;
   assistantLoading.value = true;
   axiosConfig
      .get(`users/?search=${value}&company=${currentUserCompany}`)
      .then(response => {
         const results = response?.data?.results;
         const newAssistants = (Array.isArray(results) ? results: []).map(user => ({...user, position: user?.position?.name, optionDisabled: !user.is_active}));
         assistants.value = newAssistants;
      })
      .catch(() => {
         assistants.value = [];
      })
      .finally(() => {
         assistantLoading.value = false;
      });
};
const searchSupervisors = e => {
   const value = e.target.value
   supervisor.value = value;
   supervisorLoading.value = true;
   axiosConfig
      .get(`users/?search=${value}&company=${currentUserCompany}`)
      .then(response => {
         const results = response?.data?.results;
         const newSupervisors = (Array.isArray(results) ? results: []).map(user => ({...user, position: user?.position?.name, optionDisabled: !user.is_active}));
         supervisors.value = newSupervisors;
      })
      .catch(() => {
         supervisors.value = [];
      })
      .finally(() => {
         supervisorLoading.value = false;
      });
};
const assistantEdit = () => {
   const supervisorId = supervisor?.value?.id;
   const assistantId = assistant?.value?.id;
   const id = editUser?.value?.id;
   const is_active = editUser?.value?.is_active;
   const sendingData = { is_active, user: supervisorId, assistant: assistantId };
   if(supervisorId && assistantId) {
      editLoading.value = true;
      axiosConfig
         .put(`/user-assistants/${id}/`, sendingData)
         .then(response => {
            const status = response?.status;
            const data = response?.data;
            if(status === 200) {
               dispatchNotify('Помощник изменен', '', 'success');
               editVisible.value = false;
               const newAssistants = props.assistants.map(assistant => {
                  if(assistant?.id === id) {
                     return data;
                  } else {
                     return assistant
                  }
               });
               props.setAssistants(newAssistants);
            } else {
               dispatchNotify('Помощник не изменен', '', 'error');
            }
         })
         .catch(() => {
            dispatchNotify('Помощник не изменен', '', 'error');
         })
         .finally(() => {
            editLoading.value = false;
         });
   } else if(!supervisorId) {
      dispatchNotify('Выберите руководитель', '', 'error');
   } else {
      dispatchNotify('Выберите помощника', '', 'error');
   }
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
         <Skeleton height="16px" />
      </template>
      <template v-else>
         <span @click="toggle" style="display: inline-flex; justify-content: center; align-items: center" :style="{ background: data.is_active ? '#EEFFE7' : '#F7F7F9', color: data.is_active ? '#63BA3D' : '#767994' }" class="pr-2 pl-3 py-1 font-medium rounded-[80px] text-sm text-greyscale-500 cursor-pointer">
            <span class="mr-1">{{ data.is_active ? 'Активный' : 'Неактивный' }}</span>
            <DownIcon />
         </span>
         <Menu ref="menu" :model="items" style="width: initial !important" :popup="true" :pt="menuConfig">
            <template #item="{ item }">
               <div @click="() => { updateStatus(item) }" class="flex justify-between py-[6px] pr-2 pl-3 cursor-pointer">
                  <span class="text-sm font-medium text-primary-900">{{ item.label }}</span>
                  <span class="ml-2" v-if="item.value === data.is_active">
                     <CheckedIcon/>
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
            assistant = data?.assistant;
            supervisor = data?.user;
         }"
         class="py-[7px] px-2 text-xs bg-greyscale-50 rounded-[8px] mr-2"
         icon
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
         class="py-[7px] px-2 text-xs bg-greyscale-50 rounded-[8px]"
         icon
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
      <div class="flex flex-col">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Руководитель<span class="text-red-500">*</span></p>
         <AutoComplete completeOnFocus forceSelection v-model="supervisor" scrollHeight="258px" :minLength="0" @input="searchSupervisors" @item-select="({ value }) => { supervisor = value }" dropdownClass="bg-white border-0 shadow-none absolute w-[42px] h-[42px] left-[1px] top-[1px] rounded-xl mb-6" inputClass="w-full rounded-xl" selectionMessage="full_name" dropdown searchMessage="full_name" loading dataKey="id" optionLabel="full_name" :suggestions="supervisors" :pt="autocompleteConfig">
            <template #option="{ option }">
               <div style="align-items: center;" class="flex w-[100%] px-3 py-2 text-m font-medium text-primary-900">
                  <div class="mr-3">
                     <Avatar :label="option.full_name.slice(0, 1)" :style="{'background-color': option.color}" style="color: white; width: 40px; height: 40px;" shape="circle" />
                  </div>
                  <div class="flex flex-col">
                     <div style="font-size: 16px;">{{ option.full_name }}</div>
                     <div class="flex" style="align-items: center;">
                        <span style="font-size: 14px; font-weight: 600;" :style="{'color': option.optionDisabled ? '#F3335C' : '#63BA3D'}">{{ option.status && option.status.name }}</span>
                        <span class="mx-2 w-[4px] h-[4px] rounded-full" style="background-color: #79889B; display: inline-block;"></span>
                        <span style="color: #767994; font-weight: 500; font-size: 14px;">{{ option.position }}</span>
                     </div>
                  </div>
               </div>
            </template>
            <template #loadingicon>
               <template v-if="supervisorLoading">
                  <div style="position: absolute; right: 6px; top: 6px" class="flex align-center justify-center w-[36px] h-[36px]">
                     <ProgressSpinner class="m-0 w-[32px] h-[32px]" animationDuration=".5s" strokeWidth="3" />
                  </div>
               </template>
               <template v-else>
                  <template v-if="supervisor">
                     <Button @click="() => { supervisor = '' }" rounded type="button" style="position: absolute; right: 6px; top: 6px; align-items: center" class="bg-greyscale-50 rounded-3xl cursor-pointer w-[32px] h-[32px] flex justify-center p-button p-component font-semibold text-sm rounded-xl !rounded-full p-0 m-0 border-none">
                        <ClearIcon/>
                     </Button>
                  </template>
                  <template></template>
               </template>
            </template>
            <template #empty>
               <div style="align-items: center;" class="flex justify-center w-[100%] h-[40px] text-m font-medium text-primary-900">
                  Сотрудник не найден
               </div>
            </template>
            <template #dropdownicon>
               <div style="align-items: center" class="cursor-pointer w-[32px] h-[32px] flex justify-center">
                  <SearchIcon/>
               </div>
            </template>
         </AutoComplete>
         <p class="text-sm text-greyscale-500 font-medium mt-6 mb-1">Помощник<span class="text-red-500">*</span></p>
         <AutoComplete style="margin-bottom: 30px;" completeOnFocus forceSelection v-model="assistant" scrollHeight="258px" :minLength="0" @input="searchAssistants" @item-select="({ value }) => { assistant = value }" dropdownClass="bg-white border-0 shadow-none absolute w-[42px] h-[42px] left-[1px] top-[1px] rounded-xl" inputClass="w-full rounded-xl" selectionMessage="full_name" dropdown searchMessage="full_name" loading dataKey="id" optionLabel="full_name" :suggestions="assistants" :pt="autocompleteConfig">
            <template #option="{ option }">
               <div style="align-items: center;" class="flex w-[100%] px-3 py-2 text-m font-medium text-primary-900">
                  <div class="mr-3">
                     <Avatar :label="option.full_name.slice(0, 1)" :style="{'background-color': option.color}" style="color: white; width: 40px; height: 40px;" shape="circle" />
                  </div>
                  <div class="flex flex-col">
                     <div style="font-size: 16px;">{{ option.full_name }}</div>
                     <div class="flex" style="align-items: center;">
                        <span style="font-size: 14px; font-weight: 600;" :style="{'color': option.optionDisabled ? '#F3335C' : '#63BA3D'}">{{ option.status && option.status.name }}</span>
                        <span class="mx-2 w-[4px] h-[4px] rounded-full" style="background-color: #79889B; display: inline-block;"></span>
                        <span style="color: #767994; font-weight: 500; font-size: 14px;">{{ option.position }}</span>
                     </div>
                  </div>
               </div>
            </template>
            <template #loadingicon>
               <template v-if="assistantLoading">
                  <div style="position: absolute; right: 6px; top: 6px" class="flex align-center justify-center w-[36px] h-[36px]">
                     <ProgressSpinner class="m-0 w-[32px] h-[32px]" animationDuration=".5s" strokeWidth="3" />
                  </div>
               </template>
               <template v-else>
                  <template v-if="assistant">
                     <Button @click="() => { assistant = '' }" rounded type="button" style="position: absolute; right: 6px; top: 6px; align-items: center" class="bg-greyscale-50 rounded-3xl cursor-pointer w-[32px] h-[32px] flex justify-center p-button p-component font-semibold text-sm rounded-xl !rounded-full p-0 m-0 border-none">
                        <ClearIcon/>
                     </Button>
                  </template>
                  <template></template>
               </template>
            </template>
            <template #empty>
               <div style="align-items: center;" class="flex justify-center w-[100%] h-[40px] text-m font-medium text-primary-900">
                  Сотрудник не найден
               </div>
            </template>
            <template #dropdownicon>
               <div style="align-items: center" class="cursor-pointer w-[32px] h-[32px] flex justify-center">
                  <SearchIcon/>
               </div>
            </template>
         </AutoComplete>
      </div>
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
      <div class="flex flex-col items-center pb-10 pt-4">
         <div>
            <DeleteSymbolIcon />
         </div>
         <h2 class="text-center font-semibold text-3xl text-gray-900 p-0 mt-6">Удалить помощник?</h2>
         <p class="text-center py-0 px-6 mt-2 text-gray-400">
            Вы уверены, что хотите удалить этого помощника
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