<script setup>
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
import { useAuthStore } from '../../../../Auth/stores';
const assistant = ref('');
const assistantLoading = ref(false);
const assistants = ref([]);
const authStore = useAuthStore();
const loading = ref(false);
const supervisor = ref('');
const supervisorLoading = ref(false);
const supervisors = ref([]);
const currentUserCompany = authStore.currentUser.company;
const props = defineProps({
   getFirstPageAssistants: Function,
   setVisible: Function,
   visible: Boolean,
});
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
               dispatchNotify('Помощник создан', '', 'success');
               props.getFirstPageAssistants();
               props.setVisible(false);
               supervisor.value = '';
            } else {
               dispatchNotify('Помощник не создан', '', 'error');
            }
         })
         .catch(() => {
            dispatchNotify('Помощник не создан', '', 'error');
         })
         .finally(() => {
            loading.value = false;
         });
   } else if(!supervisorId) {
      dispatchNotify('Выберите руководитель', '', 'error');
   } else {
      dispatchNotify('Выберите помощника', '', 'error');
   }
};
</script>
<template>
   <Dialog
      :pt="dialogConfig"
      :visible="visible"
      dismissableMask
      header="Создать помощник"
      modal
      @update:visible="() => { setVisible(!visible); assistant = ''; supervisor = ''; loading = false }">
      <div class="flex flex-col">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Руководитель<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :hasValue="supervisor"
            :loading="supervisorLoading"
            :options="supervisors"
            @onChange="({ value }) => { supervisor = value }"
            @onClear="() => { supervisor = '' }"
            @onInputChange="searchSupervisors"
            noOptionMessage="Сотрудник не найден"
            v-model="supervisor"
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
         <p class="text-sm text-greyscale-500 font-medium mt-6 mb-1">Помощник<span class="text-red-500 ml-1">*</span></p>
         <div class="pb-8">
            <base-auto-complete
               :hasValue="assistant"
               :loading="assistantLoading"
               :options="assistants"
               @onChange="({ value }) => { assistant = value }"
               @onClear="() => { assistant = '' }"
               @onInputChange="searchAssistants"
               v-model="assistant"
               noOptionMessage="Сотрудник не найден"
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
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm rounded-xl !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="assistantCreate"
                  class="shadow-none p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4 mx-0"
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