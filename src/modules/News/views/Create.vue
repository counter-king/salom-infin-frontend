<script setup>
//core
import { ref } from 'vue';
// Components
import HeaderToolbar from '../components/create/HeaderToolbar.vue';
import CreateForm from '../components/create/Form/NewForm.vue';
import TheFooter from '@/components/TheFooter.vue';


const createFormRef = ref(null)
// methods
const onSubmitForm = () => {
  return createFormRef.value?.onSubmitForm()
}

const isValidFormValidation = () => {
  return createFormRef.value?.isValidFormValidation()
}

</script>
<template>
  <div class="flex flex-col overflow-y-auto w-full items-center">
    <div class="py-5 w-full flex flex-col items-center gap-5" >
      <div class="w-[900px]">
        <header-toolbar :onSubmitForm="onSubmitForm"  :isValidFormValidation="isValidFormValidation"/>
      </div>
      <div class="rounded-[20px] pr-1 overflow-y-auto">
        <div class="w-[900px] bg-white rounded-[20px] p-8">
          <create-form ref="createFormRef"/>
        </div>
      </div>
    </div>
    <div class="w-[900px]">
      <the-footer/>
    </div>
  </div>
</template>

<style></style>
