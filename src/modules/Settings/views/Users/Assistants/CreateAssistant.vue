<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import { dialogConfig } from './config';
import Avatar from 'primevue/avatar';
import AutoComplete from 'primevue/autocomplete';
import SearchIcon from './SearchIcon.vue';
import ClearIcon from './ClearIcon.vue';
import ProgressSpinner from 'primevue/progressspinner';
import { autocompleteConfig } from './config';
import axiosConfig from "@/services/axios.config";
import { useAuthStore } from '../../../../Auth/stores';
const assistant = ref('');
const assistantLoading = ref(false);
const assistants = ref([]);
const loading = ref(false);
const supervisor = ref('');
const supervisorLoading = ref(false);
const supervisors = ref([]);
const authStore = useAuthStore();
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
   loading.value = true;
   const supervisorId = supervisor?.value?.id;
   const assistantId = assistant?.value?.id;
   const sendingData = { is_active: true, user: supervisorId, assistant: assistantId };
   if(supervisorId && assistantId) {
      axiosConfig
         .post('/user-assistants/', sendingData)
         .then(response => {
            if(response?.status === 201) {
               assistant.value = '';
               loading.value = false;
               props.getFirstPageAssistants();
               props.setVisible(false);
               supervisor.value = '';
            } else {}
         })
         .catch(() => {});
   } else if(!supervisorId) {

   } else {

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
            <template v-if="loading">
               <ProgressSpinner class="m-0" animationDuration=".5s" style="width: 40px; height: 40px" strokeWidth="4" />
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
                  class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4 mx-0"
                  rounded
                  style="box-shadow: none"
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