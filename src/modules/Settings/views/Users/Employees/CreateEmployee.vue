<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import { dialogConfig } from './config';
import { ref } from 'vue';
const employee = ref({});
const loading = ref(false);
const props = defineProps({
   getFirstPageEmployees: Function,
   setVisible: Function,
   visible: Boolean,
});
const createUser = () => {
   loading.value = true;
};
</script>
<template>
   <Dialog
      :pt="dialogConfig"
      dismissableMask
      header="Создать сотрудник"
      modal
      :visible="visible"
      @update:visible="() => { setVisible(!visible) }"
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">ФИО Сотрудники<span class="text-red-500 ml-1">*</span></p>
         <InputText style="font-size: 14px;" :pt="{root: {class:['h-[44px] w-[500px] rounded-[12px] mb-6']}}" placeholder="Выберите ФИО" type="text" />
         <p class="text-sm text-greyscale-500 font-medium mb-1">ПИНФЛ<span class="text-red-500 ml-1">*</span></p>
         <InputMask slotChar=" " style="font-size: 14px;" :pt="{root: {class:['h-[44px] w-[500px] rounded-[12px] mb-6']}}" mask="99999999999999" placeholder="Выберите ПИНФЛ" />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Номер телефона<span class="text-red-500 ml-1">*</span></p>
         <InputMask slotChar=" " style="font-size: 14px;" :pt="{root: {class:['h-[44px] w-[500px] rounded-[12px] mb-6']}}" mask="+999 99 999 99 99" placeholder="Выберите номер телефона" />
      </div>
      <template #footer>
         <div class="flex justify-end">
            <template v-if="loading">
               <ProgressSpinner class="m-0" animationDuration=".5s" style="width: 40px; height: 40px" strokeWidth="4" />
            </template>
            <template v-else>
               <Button
                  @click="() => { setVisible(!visible) }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm rounded-xl !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="createUser"
                  class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4"
                  rounded
                  type="button"
               >Создать</Button>
            </template>
         </div>
      </template>
   </Dialog>
</template>
<style></style>