<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import { dialogConfig } from './config';
import ProgressSpinner from 'primevue/progressspinner';
const createAssistant = ref({});
const createLoading = ref(false);
const props = defineProps({
   getFirstPageAssistants: Function,
   setVisible: Function,
   visible: Boolean,
});
const assistantCreate = () => {
   createLoading.value = true;
};
</script>
<template>
   <Dialog
      :pt="dialogConfig"
      :visible="visible"
      dismissableMask
      header="Создать помощник"
      modal
      @update:visible="() => {
         setVisible(!visible);
         createAssistant = {};
      }">
      <p>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <template #footer>
         <div style="justify-content: flex-end; display: flex">
            <template v-if="createLoading">
               <ProgressSpinner class="m-0" animationDuration=".5s" style="width: 40px; height: 40px" strokeWidth="4" />
            </template>
            <template v-else>
               <Button
                  @click="() => {
                     setVisible(!visible);
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
<style></style>