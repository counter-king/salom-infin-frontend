<script setup>
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
import { useAuthStore } from '../../../../Auth/stores';
const props = defineProps({ getFirstPageAssistants: Function, setVisible: Function, visible: Boolean });
const assistant = ref('');
const assistantLoading = ref(false);
const assistants = ref([]);
const assistantsPage = ref(1);
const authStore = useAuthStore();
const loading = ref(false);
const supervisor = ref('');
const supervisorLoading = ref(false);
const supervisors = ref([]);
const supervisorsPage = ref(1);
const searchAssistants = ({ search, page }) => {
   assistantLoading.value = true;
   assistant.value = search;
   const currentUserCompany = authStore.currentUser?.company?.id;
   const newSearch = typeof search === 'string' ? search : search.full_name;
   axiosConfig
      .get(`users/?page=${page}&search=${newSearch}&company=${currentUserCompany}`)
      .then(response => {
         const newPage = response?.data?.next ? page + 1 : null;
         const results = response?.data?.results;
         const rootAssistants = page === 1 ? [] : assistants.value;
         const newAssistants = (Array.isArray(results) ? results: []).map(user => ({...user, position: user?.position?.name, optionDisabled: !user.is_active}));
         assistantsPage.value = newPage;
         assistants.value = [ ...rootAssistants, ...newAssistants];
      })
      .catch(() => {
         assistantsPage.value = null;
      })
      .finally(() => {
         assistantLoading.value = false;
      });
};
const searchSupervisors = ({ search, page }) => {
   supervisor.value = search;
   supervisorLoading.value = true;
   const currentUserCompany = authStore.currentUser?.company?.id;
   const newSearch = typeof search === 'string' ? search : search.full_name;
   axiosConfig
      .get(`users/?page=${page}&search=${newSearch}&company=${currentUserCompany}`)
      .then(response => {
         const newPage = response?.data?.next ? page + 1 : null;
         const results = response?.data?.results;
         const rootSupervisors = page === 1 ? [] : supervisors.value;
         const newSupervisors = (Array.isArray(results) ? results: []).map(user => ({...user, position: user?.position?.name, optionDisabled: !user.is_active}));
         supervisors.value = [ ...rootSupervisors, ...newSupervisors ];
         supervisorsPage.value = newPage;
      })
      .catch(() => {
         supervisorsPage.value = null;
      })
      .finally(() => {
         supervisorLoading.value = false;
      });
};
const assistantCreate = () => {
   const supervisorId = supervisor?.value?.id;
   const assistantId = assistant?.value?.id;
   const sendingData = { is_active: true, user: supervisorId, assistant: assistantId };
   if(supervisorId && assistantId) {
      loading.value = true;
      axiosConfig
         .post('/user-assistants/', sendingData)
         .then(response => {
            if(response?.status === 201) {
               assistant.value = '';
               dispatchNotify(null, 'Помощник создан', 'success');
               props.getFirstPageAssistants();
               props.setVisible(false);
               supervisor.value = '';
            }
         })
         .catch(() => {})
         .finally(() => {
            loading.value = false;
         });
   } else if(!supervisorId) {
      dispatchNotify(null, 'Введите руководитель', 'error');
   } else {
      dispatchNotify(null, 'Введите помощника', 'error');
   }
};
</script>
<template>
   <Dialog
      :closable="!loading"
      :pt="dialogConfig"
      :visible="visible"
      header="Создать помощник"
      modal
      @update:visible="() => {
         assistant = '';
         setVisible(!visible);
         supervisor = '';
      }">
      <div class="flex flex-col">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Руководитель<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :loading="supervisorLoading"
            :options="supervisors"
            :page="supervisorsPage"
            :value="supervisor"
            key="id"
            label="full_name"
            noOptionsMessage="Сотрудник не найден"
            placeholder="Введите сотрудник"
            @onInputChange="searchSupervisors"
            @onChange="value => {
               supervisor = value;
            }"
            >
            <template #option="{option}">
               <div class="items-center flex w-[100%] px-3 py-2 text-m font-medium text-primary-900">
                  <div class="mr-3">
                     <Avatar style="color: #ffffff" :label="option.full_name.slice(0, 1)" :style="{'background-color': option.color}" class="w-10 h-10" shape="circle" />
                  </div>
                  <div class="flex flex-col">
                     <div class="text-base">{{ option.full_name }}</div>
                     <div class="flex items-center">
                        <span class="text-sm font-semibold" :style="{'color': option.optionDisabled ? '#F3335C' : '#63BA3D'}">{{ option.status && option.status.name }}</span>
                        <span v-if="option.status && option.status.name" class="mx-2 w-[4px] h-[4px] rounded-full" style="background-color: #79889B"></span>
                        <span class="text-sm font-medium" style="color: #767994">{{ option.position }}</span>
                     </div>
                  </div>
               </div>
            </template>
         </base-auto-complete>
         <p class="text-sm text-greyscale-500 font-medium mt-6 mb-1">Помощник<span class="text-red-500 ml-1">*</span></p>
         <div class="pb-8">
            <base-auto-complete
               :loading="assistantLoading"
               :options="assistants"
               :page="assistantsPage"
               :value="assistant"
               key="id"
               label="full_name"
               noOptionsMessage="Сотрудник не найден"
               placeholder="Введите сотрудник"
               @onInputChange="searchAssistants"
               @onChange="value => {
                  assistant = value;
               }"
               >
               <template #option="{option}">
                  <div class="items-center flex w-[100%] px-3 py-2 text-m font-medium text-primary-900">
                     <div class="mr-3">
                        <Avatar style="color: #ffffff" :label="option.full_name.slice(0, 1)" :style="{'background-color': option.color}" class="w-10 h-10" shape="circle" />
                     </div>
                     <div class="flex flex-col">
                        <div class="text-base">{{ option.full_name }}</div>
                        <div class="flex items-center">
                           <span class="text-sm font-semibold" :style="{'color': option.optionDisabled ? '#F3335C' : '#63BA3D'}">{{ option.status && option.status.name }}</span>
                           <span class="mx-2 w-[4px] h-[4px] rounded-full" style="background-color: #79889B"></span>
                           <span class="text-sm font-medium" style="color: #767994">{{ option.position }}</span>
                        </div>
                     </div>
                  </div>
               </template>
            </base-auto-complete>
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
                     assistant = '';
                     setVisible(!visible);
                     supervisor = '';
                  }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="assistantCreate"
                  class="shadow-none p-button p-component font-semibold text-sm !rounded-full py-[9px] px-4 mx-0"
                  rounded
                  type="button">
                  Создать</Button>
            </template>
         </div>
      </template>
   </Dialog>
</template>
<style>
.user-search-autocomplete .p-autocomplete-item {
   transition: background 0s outline 0s !important;
}
.user-search-autocomplete .p-autocomplete-item.p-focus {
   outline: 1px solid var(--primary) !important;
   background: var(--greyscale-50);
}
</style>
