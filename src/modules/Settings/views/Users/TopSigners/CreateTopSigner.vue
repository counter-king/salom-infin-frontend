<script setup>
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
import { useAuthStore } from '../../../../Auth/stores';
import Avatar from 'primevue/avatar';
const topSigner = ref('');
const topSignerLoading = ref(false);
const topSigners = ref([]);
const authStore = useAuthStore();
const docType = ref('');
const docTypeLoading = ref(false);
const docTypes = ref([]);
const loading = ref(false);
const currentUserCompany = authStore.currentUser.company;
const props = defineProps({
   getFirstPageTopSigners: Function,
   setVisible: Function,
   visible: Boolean,
});
const searchTopSigners = e => {
   const value = e.target.value
   topSigner.value = value;
   topSignerLoading.value = true;
   axiosConfig
      .get(`users/?search=${value}&comapany=${currentUserCompany}`)
      .then(response => {
         const results = response?.data?.results;
         const newTopSigners = (Array.isArray(results) ? results: []).map(user => ({...user, position: user?.position?.name, optionDisabled: !user.is_active}));
         topSigners.value = newTopSigners;
      })
      .catch(() => {
         topSigners.value = [];
      })
      .finally(() => {
         topSignerLoading.value = false;
      });
};
const searchDocTypes = e => {
   const value = e.target.value
   docTypeLoading.value = true;
   axiosConfig
      .get(`document-types/?search=${value}`)
      .then(response => {
         const results = response?.data?.results;
         const documentTypes = Array.isArray(results) ? results: [];
         docTypes.value = documentTypes;
      })
      .catch(() => {
         docTypes.value = [];
      })
      .finally(() => {
         docTypeLoading.value = false;
      });
};
const topSignerCreate = () => {
   const user = topSigner.value?.id;
   const docTypes = docType.value;
   if(docTypes?.length && user) {
      loading.value = true;
      const doc_types = [];
      docTypes.forEach(docType => {
         const hasDocType = doc_types.find(doc_type => doc_type?.id === docType?.id);
         if(!hasDocType) {
            doc_types.push(docType);
         }
      });
      const sendingData = { user, doc_types };
      axiosConfig
         .post('/top-signers/', sendingData)
         .then(response => {
            if(response?.status === 201) {
               topSigner.value = '';
               dispatchNotify('Топ подписавший создан', '', 'success');
               props.getFirstPageTopSigners();
               props.setVisible(false);
               docType.value = '';
            } else {
               dispatchNotify('Топ подписавший не создан', '', 'error');
            }
         })
         .catch(e => {
            const code = e?.data?.code;
            const message = e?.data?.message
            if(code === '619') {
               dispatchNotify(message, '', 'error');
            } else {
               dispatchNotify('Топ подписавший не создан', '', 'error');
            }
         })
         .finally(() => {
            loading.value = false;
         });
   } else if(!user) {
      dispatchNotify('Введите топ подписавший', '', 'error');
   } else {
      dispatchNotify('Введите тип документа', '', 'error');
   }
};
</script>
<template>
   <Dialog
      :pt="dialogConfig"
      :visible="visible"
      header="Создать топ подписантов"
      modal
      @update:visible="() => { setVisible(!visible); user = ''; docType = ''; loading = false }">
      <div class="flex flex-col">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Топ подписавший<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :hasValue="topSigner"
            :loading="topSignerLoading"
            :options="topSigners"
            @onChange="({ value }) => { topSigner = value }"
            @onClear="() => { topSigner = '' }"
            @onInputChange="searchTopSigners"
            field="full_name"
            noOptionMessage="Сотрудник не найден"
            v-model="topSigner"
            >
            <template #option="{ option }">
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
         <p class="text-sm text-greyscale-500 font-medium mt-6 mb-1">Тип документа<span class="text-red-500 ml-1">*</span></p>
         <div class="pb-8">
            <base-multi-auto-complete
               :loading="docTypeLoading"
               :options="docTypes"
               :value="docType"
               @onClear="() => { docType = '' }"
               @onInputChange="searchDocTypes"
               @removeOption="option => { docType = option }"
               field="name"
               noOptionMessage="Тип документа не найден"
               v-model="docType"
               >
               <template #option="{ option }">
                  <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
               </template>
            </base-multi-auto-complete>
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
                     user = '';
                     setVisible(!visible);
                     docType = '';
                  }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm rounded-xl !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="topSignerCreate"
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