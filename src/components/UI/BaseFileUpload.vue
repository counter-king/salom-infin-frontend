<script setup>
// Core
import {onMounted, ref} from "vue";
import axiosConfig from "@/services/axios.config";

const fileInput = ref(null);
const uploadingFiles = ref([]);
const isDragging = ref(false);

const emit = defineEmits(['emit:fileUpload']);
const props = defineProps({
  files: {
    type: Array,
    default: []
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
    let fileName = returnShortFileName(files[i].name);
    let size = files[i].size;
    let fileSize = (size > 1048576) ? (size / 1048576).toFixed(2) + ' MB' : (size <= 1048576 && size > 1024) ? (size / 1024).toFixed(2) + ' KB' : size + ' B'
    uploadingFiles.value.push({ id: null, name: fileName, size: fileSize, progress: 0, uploaded: null, file: files[i] });
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
        uploaded: true
      })
    })
  }
}
const deleteFile = (file) => {
  const index = uploadingFiles.value.findIndex(x => x.id === file.id);
  uploadingFiles.value.splice(index, 1);
  emit("emit:fileUpload", uploadingFiles.value.filter(file => file.uploaded));
}

onMounted(() => {
  setFiles();
})

</script>

<template>
  <div>
    <input type="file" name="file" multiple hidden ref="fileInput" @change="onFileSelect">
    <div
      class="flex bg-greyscale-50 rounded-xl border-dashed border h-16 hover:bg-primary-50 cursor-pointer"
      :class="{ 'bg-primary-50' : isDragging }"
      @click="chooseFiles"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <div class="flex justify-center items-center w-full text-sm font-semibold select-none">
        <span class="text-primary-500 block mr-1">Перетащите</span> и <span class="text-primary-500 block mx-1">загрузите</span> свой файл
      </div>
    </div>

    <section class="uploading-files">
      <template
        v-for="(file, index) in uploadingFiles"
        :key="file.name + index"
      >
        <div class="mt-3 max-h-[300px] overflow-y-auto">
          <div
            class="flex rounded-xl h-16 relative overflow-hidden mb-2"
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
                  <base-icon
                    name="FileTextIconFilled"
                    width="20"
                    height="20"
                    :stroke="false"
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
                <base-icon v-else-if="file.uploaded === true" name="CheckCircleBgIcon" width="22" height="22" class="text-success-500" :stroke="false"/>

                <base-icon
                  name="XIcon"
                  width="16"
                  height="16"
                  class="text-greyscale-500 ml-3 cursor-pointer"
                  :class="{ 'hidden': !file.uploaded === true }"
                  @click="deleteFile(file)"
                />

                <base-icon
                  name="RestartIcon"
                  width="16"
                  height="16"
                  class="text-greyscale-500 ml-3 cursor-pointer"
                  :class="{ 'hidden': !file.uploaded === false }"
                  @click="deleteFile(file)"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </section>

<!--    <pre>{{ props.files }}</pre>-->
  </div>
</template>

<style scoped>

</style>
