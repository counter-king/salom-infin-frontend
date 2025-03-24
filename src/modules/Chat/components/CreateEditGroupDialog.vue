<script setup>
// core 
import { computed, onMounted, reactive, ref, useModel } from 'vue';
import { helpers, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useRouter } from 'vue-router';
// components
import BaseDialog from '@/components/UI/BaseDialog.vue';
import { CameraBoldIcon, PenIcon, TrashBinTrashIcon } from '@/components/Icons';
import { UserWithLabel, UserWithSelectable } from '@/components/Users';
import BaseMultiSelect from '@/components/UI/BaseMultiSelect.vue';
import { ContextMenu } from './ChatArea';
import DeleteDialog from './DeleteDialog.vue';
// utils
import { isObject } from '@/utils'
// services
import axiosConfig from '@/services/axios.config';
import { fetchCreateGroupChat, fetchEditGroupChat } from '../services';
import { fetchBlobFile } from '@/services/file.service';
// store
import { useChatStore } from '../stores';
// constants
import { CHAT_ROUTE_NAMES } from '../constatns';

// props
const props = defineProps({
 modelValue: {
  type: Boolean,
 },
 modalLabel: {
  type: String,
  default: 'create-group'
 },
 type: {
  type: String,
  default: 'create',
  validator(value) {
    return ['create', 'edit'].includes(value);
  }
 }
});

const chatStore = useChatStore();
const router = useRouter();
// reactives
const refContextMenu = ref(null);
const refFileInput = ref(null);
const deleteDialog = ref(false);
const uploadingFiles = ref([]);
const formModal = reactive({
  group_name: "",
  users: [],
})

// rules
const rules = {
  group_name: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  users: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}

const $v = useVuelidate(rules, formModal);
const modelValue = useModel(props, 'modelValue');
// emits
const emit = defineEmits(['update:modelValue']);
// methods
const onSubmit = async () => {
  const isValid = await $v.value.$validate();

  if(!isValid) return;
  if(props.type === 'create') {
   const { data } = await fetchCreateGroupChat({images:[{image: uploadingFiles.value[0]?.id}], title: formModal.group_name, members_id: formModal.users.map(user => user.id)});
   router.push({ name: CHAT_ROUTE_NAMES.GROUP, params: { id: data?.id }, query :{ tab: 'group'} })
   chatStore.actionGetGroupChatList();
  } else if(props.type === 'edit') {
    const data  = await chatStore.actionEditGroupChatById(chatStore.selectedGroup?.chat_id, { images: uploadingFiles.value[0]?.id ? [{ image: uploadingFiles.value[0]?.id }]: undefined, title: formModal.group_name, members_id: formModal.users.map(user => user.id)});
    chatStore.selectedGroup = data;
    chatStore.actionGetGroupChatList();
  }

  uploadingFiles.value = [];
  formModal.group_name = null;
  formModal.users = [];
  emit('update:modelValue', false);
}

const resetForm = () => {
  $v.value.$reset();
  formModal.group_name = null;
  formModal.users = [];
}

const onShowContextMenu = (event) => {
  if (refContextMenu.value && refContextMenu.value.menu) {    
    refContextMenu.value.menu.show(event);
  }
}

const menuItems = computed(() => [
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
     command: () => {
      deleteDialog.value = true;
     },
     class: [{"!text-critic-500": !!uploadingFiles.value.length}, {"pointer-events-none !text-critic-200": !uploadingFiles.value.length}]
   }
]);

const handleFileInputChange = (event) => {  
  uploadFiles(event.target.files);
};

const returnShortFileName = (fileName) => {
  return (fileName.split('.')[0].length >= 12) ? fileName.substring(0, 13) + '... .' + fileName.split('.')[1] : fileName
}

const uploadFiles = async (files) => {
  if (files.length === 0) return;
  for (let i = 0; i < files.length; i++) {
    let fileName = returnShortFileName(files[i].name);
    let size = files[i].size;
    let fileSize = (size > 1048576) ? (size / 1048576).toFixed(2) + ' MB' : (size <= 1048576 && size > 1024) ? (size / 1024).toFixed(2) + ' KB' : size + ' B'
    uploadingFiles.value.push({ id: null, name: fileName, size: fileSize, progress: 0, uploaded: null, file: files[i] });
  }

  for (const item of uploadingFiles.value.filter((obj) => obj.uploaded === null)) {
    let formData = new FormData();
    formData.append("file", item.file);
    formData.append("module", "chat");

    await axiosConfig.post(`/upload/`, formData, {
      onUploadProgress: ({ loaded, total }) => {
        item.progress = Math.floor((loaded / total) * 100) - 1;
      }
    })
      .then(async({ data }) => {
        item.id = data.id;
        item.uploaded = true;
        const { blobUrl } = await fetchBlobFile(data.id) 
        item.blobUrl = blobUrl
        item.url = data.url
      })
      .catch(() => {
        item.uploaded = false;
      })
  }
}

const onDeleteAvatar = () => {
  uploadingFiles.value = []
  deleteDialog.value = false
}

onMounted(() => {
  if(props.type === 'edit') {
    formModal.group_name = chatStore.selectedGroup?.title
    formModal.users = chatStore.selectedGroup?.members?.map(member => member) || []
    uploadingFiles.value = chatStore.selectedGroup?.image ? [chatStore.selectedGroup?.image] : []
  }
})
</script>
<template>
  <base-dialog
    v-model="modelValue"
   :label="props.modalLabel"
    max-width="max-w-[608px]"
  >
    <template #content>
      <div class="flex flex-col gap-6 min-h-[400px]">
        <!-- avatare and name -->
        <div class="flex gap-4 items-center">
          <div class="relative">
            <base-avatar
              :label="formModal.group_name || '-'"
              :image="!!uploadingFiles?.length ? uploadingFiles[0]?.blobUrl ? uploadingFiles[0]?.blobUrl : uploadingFiles[0]?.url : undefined"
              label-classes="text-4xl"
              color="bg-primary-50"
              shape="circle"
              avatar-classes="w-20 h-20"
            >
              <base-iconify
               :icon="CameraBoldIcon"
                class="!w-9 !h-9 text-white"
              />
            </base-avatar> 
            <div
              @contextmenu.prevent="onShowContextMenu" 
              @click="onShowContextMenu"
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
          :label="props.type === 'create' ? 'create' : 'edit'"
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
    :multiple="false"
    @change="handleFileInputChange" 
  />
  <ContextMenu ref="refContextMenu" :menu-items="menuItems" />
  <DeleteDialog
   v-model="deleteDialog" 
   :onDelete="onDeleteAvatar" 
   :onClose="() => deleteDialog = false"
   conetentText="delete-chat-avatar-dialog-content"
  />
</template>