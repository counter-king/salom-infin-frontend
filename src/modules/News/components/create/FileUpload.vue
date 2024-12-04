<script setup>
// Core
import {onMounted, ref} from "vue";
import { useI18n } from 'vue-i18n'
import axiosConfig from "@/services/axios.config";
// Components
import { FilePreview } from '@/components/Files'
import {
	CheckCircleBoldIcon,
	CloudUploadIcon,
	FileTextBoldIcon,
	RestartIcon,
	XMarkSolidIcon
} from '@/components/Icons'
// Ustiles
import { dispatchNotify } from "@/utils/notify";
// Enums
import { COLOR_TYPES } from "@/enums";

const { t } = useI18n()

const fileInput = ref(null);
const uploadingFiles = ref([]);
const isDragging = ref(false);

const emit = defineEmits(['emit:fileUpload', 'emit:onFileDelete']);
const props = defineProps({
  files: {
    type: Array,
    default: []
  },
	label: {
		type: String,
		default: null
	},
  firstPreview: {
    type: Boolean
  },
  containerClass: {
    type: String
  },
	required: {
		type: Boolean
	},
  multiple: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['x-small', 'small', 'normal', 'large'].includes(value)
    }
  },
  error: {
    type: Object,
    default: () => ({
      $error: false,
      $errors: []
  })},
  allowedFileTypes: {
   type: Array,
   default: ()=> []  
  },
  allowedFileInfo: {
   type: String,
   default: () => ({})
  }
})

// Methods
const onDragOver = (event) => {
  event.preventDefault();
  isDragging.value = true;
  event.dataTransfer.dropEffect = "copy";
}
const onDragLeave = (event) => {
  event.preventDefault();
  isDragging.value = false;
}
const onDrop = (event) => {
  event.preventDefault();
  isDragging.value = false;
  const files = event.dataTransfer.files;
  uploadFiles(files);
}
const chooseFiles = () => {
  fileInput.value.click();
}
const onFileSelect = (event) => {
  const files = event.target.files;
  uploadFiles(files);
}
const returnShortFileName = (fileName) => {
  return (fileName.split('.')[0].length >= 12) ? fileName.substring(0, 13) + '... .' + fileName.split('.')[1] : fileName
}
const uploadFiles = async (files) => {
  if (files.length === 0) return;

  
  for (let i = 0; i < files.length; i++) {
    // Fayl formatini tekshirish
    if (!props.allowedFileTypes.includes(files[i].type)) {
      
      dispatchNotify(null,
      `Faqat ${props.allowedFileTypes.reduce((acc,type) => acc + type.split("/")[1]?.toUpperCase() + ", ", "")} formatdagi fayllarga ruxsat beriladi.`,
        COLOR_TYPES.ERROR);
      continue;
    }

    // Fayl hajmini tekshirish
    if (files[i].size > 10 * 1024 * 1024) {
      dispatchNotify(null, "Fayl maksimal 10 MB hajmdan oshib ketdi.", COLOR_TYPES.ERROR);
      continue;
    }
    
    let fileName = returnShortFileName(files[i].name);
    let size = files[i].size;
    let fileSize = (size > 1048576) ? (size / 1048576).toFixed(2) + ' MB' : (size <= 1048576 && size > 1024) ? (size / 1024).toFixed(2) + ' KB' : size + ' B'
    uploadingFiles.value.push({ id: null, name: fileName, size: fileSize, progress: 0, uploaded: null, file: files[i], extension: null, type: files[i].type });
  }

  for (const item of uploadingFiles.value.filter((obj) => obj.uploaded === null)) {
    let formData = new FormData();
    formData.append("file", item.file);

    await axiosConfig.post(`/upload/`, formData, {
      onUploadProgress: ({ loaded, total }) => {
        item.progress = Math.floor((loaded / total) * 100) - 1;
      }
    })
      .then(({ data }) => {
        item.id = data.id;
        item.uploaded = true;
        item.url = data.url;
        item.extension = data.extension
      })
      .catch(() => {
        item.uploaded = false;
      })
  }
  emit("emit:fileUpload", uploadingFiles.value.filter(file => file.uploaded));
}

const setFiles = () => {
  if (props.files && props.files.length){
    props.files.forEach(file => {
      uploadingFiles.value.push({
        id: file.id,
        name: returnShortFileName(file.name),
        size: file.file_size > 1 ? file.file_size + ' MB' : (file.file_size * 1024).toFixed(2) + ' KB',
        progress: 0,
        uploaded: true,
        url: file?.url,
        extension: file.extension || '',
        type: file?.type
      })
    })
  }
}

const deleteFile = (file) => {
  fileInput.value.value = ""
  const index = uploadingFiles.value.findIndex(x => x.id === file.id);
  uploadingFiles.value.splice(index, 1);
  if (props.multiple) {
    emit("emit:fileUpload", uploadingFiles.value.filter(file => file.uploaded))
  } else {
    emit("emit:onFileDelete")
  }
}

onMounted(() => {
  setFiles();
})

</script>

<template>
  <div class="app-file-upload">
    <div :class="{ 'hide-label': props.firstPreview && !props.files.length }">
      <template v-if="props.firstPreview && !!props.files.length">
        <div class="shadow-block h-[530px] border-[0.095rem] border-greyscale-200 rounded-2xl overflow-hidden mb-3">
          <file-preview :file="props.files[0]" />
        </div>
      </template>
    </div>

	  <base-label :label="props.label" :required="props.required" />

    <input type="file" name="file" :multiple="props.multiple" hidden ref="fileInput" @change="onFileSelect">
    <template v-if="!uploadingFiles.length">
      <div
        v-if="!uploadingFiles.length || props.multiple"
        class="group flex items-center justify-center bg-greyscale-50 hover:bg-primary-30 rounded-xl border-dashed border-[2px] border-greyscale-200 hover:border-primary-200 cursor-pointer"
        :class="[
          { 'bg-primary-50' : isDragging },
          props.containerClass,
          { '!h-16': props.firstPreview && !!props.files.length },
          { '!h-16': props.size === 'normal' },
          { 'h-14': props.size === 'small' }
        ]"
        @click="chooseFiles"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
      >
        <slot name="empty-content">
          <div class="flex justify-center items-center w-full text-sm font-semibold select-none">
            <div class="w-12 h-12 min-w-[48px] min-h-[48px] bg-primary-100 flex justify-center items-center rounded-full mr-3">
              <base-iconify :icon="CloudUploadIcon" class="text-primary-500" />
            </div>
            <div class="">
              <i18n-t keypath="upload-text.text" tag="div" class="flex items-center gap-1">
                <template v-slot:move>
                  <span class="text-primary-500 block">
                    {{ t('upload-text.move') }}
                  </span>
                </template>
                <template v-slot:download>
                  <span class="text-primary-500 block">
                    {{ t('upload-text.download') }}
                  </span>
                </template>
              </i18n-t>
              <div class="text-greyscale-400">
                    {{ props.allowedFileInfo }}
              </div>
            </div>
           </div>
        </slot>
      </div>
    </template>
    <section class="uploading-files">
      <template
        v-for="(file, index) in uploadingFiles"
        :key="file.name + index"
      >
        <div class="mt-3 max-h-[300px] overflow-y-auto">
          <div
            class="flex rounded-xl h-16 relative overflow-hidden"
            :class="file.uploaded === true ? 'bg-success-100' : file.uploaded === false ? 'bg-critic-50' : 'bg-greyscale-50'"
          >
            <div
              v-if="file.uploaded === null"
              class="absolute h-full bg-[#EFEEFE] transition-all duration-300 delay-300"
              :style="{ width: `${file.progress}%` }"
            />
            <div class="flex w-full h-full z-10 p-3 justify-between items-center">
              <div class="flex">
                <div class="bg-white rounded-lg p-2 flex justify-center items-center">
                  <base-iconify
                    :icon="FileTextBoldIcon"
                    :class="file.uploaded === false ? 'text-critic-500' : 'text-primary-500'"
                  />
                </div>

                <div class="flex flex-col ml-3 gap-y-1">
                  <span class="text-sm font-medium">{{ file.name }}</span>
                  <span class="text-xs font-medium text-greyscale-500">{{ file.size }}</span>
                </div>
              </div>

              <div class="flex items-center">
                <span v-if="file.uploaded === null" class="text-sm font-medium">{{ file.progress }}%</span>
                <base-iconify v-else-if="file.uploaded === true" :icon="CheckCircleBoldIcon" class="!w-[22px] !h-[22px] text-success-500" />

                <base-iconify
                  :icon="XMarkSolidIcon"
                  class="!w-4 !h-4 text-greyscale-500 ml-3 cursor-pointer"
                  :class="{ 'hidden': !file.uploaded === true }"
                  @click="deleteFile(file)"
                />

                <base-iconify
                  :icon="RestartIcon"
                  class="!w-4 !h-4 text-greyscale-500 ml-3 cursor-pointer"
                  :class="{ 'hidden': !file.uploaded === false }"
                  @click="deleteFile(file)"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </section>
  </div>
  <template v-if="props.error.$errors.length">
      <div class="space-y-1 mt-2">
        <div
          v-for="element of props.error.$errors"
          :key="element.$uid"
        >
          <span class="block text-sm font-medium text-red-500">{{ element.$message }}</span>
        </div>
      </div>
  </template>
</template>

<style scoped>
.hide-label + p {
  display: none;
}
</style>
