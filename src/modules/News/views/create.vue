<script setup>
// Core

// Components
import { ref } from 'vue';
import HeaderToolbar from '../create/components/HeaderToolbar.vue';
import CreateForm from '../create/Form/CreateForm.vue';

const createFormRef = ref(null)
// methods
const onSubmitForm = async() => {
  return createFormRef.value?.onSubmitForm()
}

</script>
<template>
  <div class="py-5 w-full flex flex-col items-center gap-5 overflow-y-auto h-full" >
    <div class="w-[900px]">
      <header-toolbar :onSubmitForm="onSubmitForm" />
    </div>
    <div class="w-[900px] bg-white rounded-[20px] p-8 overflow-y-auto">
      <create-form ref="createFormRef"/>
    </div>
  </div>
</template>

<style></style>
