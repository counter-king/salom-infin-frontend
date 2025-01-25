<script setup>
// core 
import { ref, useModel } from 'vue';
import { helpers, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
// components
import BaseDialog from '@/components/UI/BaseDialog.vue';
import { CameraBoldIcon, Pen2Icon, PenIcon, TrashBinTrashIcon } from '@/components/Icons';
import { UserWithLabel, UserWithSelectable } from '@/components/Users';
import BaseMultiSelect from '@/components/UI/BaseMultiSelect.vue';
import { ContextMenu } from './ChatArea';
// utils
import { isObject } from '@/utils'
// props
const props = defineProps({
 modelValue: {
  type: Boolean,
 },
 formModal: {
  type: Object,
  default: () => ({
    group_name: null,
    users: [],
  }),
 }
});

// reactives
const refContextMenu = ref(null);
const refFileInput = ref(null);

// rules
const rules = {
  group_name: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  users: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}

const $v = useVuelidate(rules, props.formModal);
const modelValue = useModel(props, 'modelValue');

// emits
const emit = defineEmits(['update:modelValue']);
// methods
const onSubmit = async () => {
  const isValid = await $v.value.$validate();
  if(!isValid) return;
  // console.log(props.formModal);
  // emit('update:modelValue', false);
}
const resetForm = () => {
  $v.value.$reset();
  props.formModal.group_name = null;
  props.formModal.users = [];
}


const onShowContextMenu = (event) => {
  console.log(event,refContextMenu.value);
  if (refContextMenu.value && refContextMenu.value.menu) {    
    refContextMenu.value.menu.show(event);
  } else {
    console.error("ContextMenu yoki menu topilmadi.");
  }
}

const menuItems = ref([
   { 
     label: 'select-image',
     iconName: PenIcon,
     command: () => {
      refFileInput.value.click();
     } 
   },
   { 
     label: 'delete',
     iconName: TrashBinTrashIcon,
     class:"bg-red",
     command: () => {
     },
     class: "!text-critic-500"
   }
]);

const handleFileInputChange = (event) => {
  console.log(event.target.files);
};

</script>
<template>
  <base-dialog
    v-model="modelValue"
    label="create-group"
    max-width="max-w-[608px]"
  >
    <template #content>
      <div class="flex flex-col gap-6 min-h-[400px]">
        <!-- avatare and name -->
        <div class="flex gap-4 items-center">
          <div class="relative">
            <base-avatar
              label="A"
              label-classes="text-4xl"
              color="bg-primary-50"
              shape="circle"
              avatar-classes="w-20 h-20"
            /> 
            <div
              @contextmenu.prevent="onShowContextMenu" 
              class="absolute bottom-0 right-0 border-[2px] border-white bg-primary-500 rounded-full p-1 cursor-pointer">
              <base-iconify
                :icon="CameraBoldIcon"
                class="!w-4 !h-4 text-white"
              />
            </div>
        </div>
          <base-input
            v-model="$v.group_name.$model"
            :error="$v.group_name"
            class="w-1/2"
            placeholder="group-name"
          />
        </div>
        <!-- users content -->
         <div>
          <base-multi-select
              v-model="$v.users.$model"
              :error="$v.users" 
              api-url="users"
              label="select-employees"
              display="chip"
              placeholder="select-employees"
              menu-placeholder="search-employees"
              required
            >
              <template #chip="{ value }">
                <user-with-label
                  :compact="true"
                  :label="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                  :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                  color="#635AFF"
                  avatar-classes="w-5 h-5"
                />
              </template>

              <template #option="{ value }">
                <user-with-selectable :items="[value]" />
              </template>

              <template #hint="{ value }">
                <user-with-label
                  :label="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                  :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                  shadow
                  color="#635AFF"
                  avatar-classes="w-5 h-5"
                />
              </template>
            </base-multi-select>
         </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <base-button
          label="reset"
          color="bg-white"
          button-class="text-primary-900"
          border-color="border-primary-50"
          oulined
          rounded
          @click="resetForm"
        />
        <base-button
          label="create"
          rounded
          @click="onSubmit"
        />
      </div>
    </template>
  </base-dialog>
  <input 
      type="file" 
      ref="refFileInput" 
      class="hidden" 
      @change="handleFileInputChange" 
    />
  <ContextMenu ref="refContextMenu" :menu-items="menuItems" />
</template>