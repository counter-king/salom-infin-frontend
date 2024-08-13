<script setup>
// Core
import {ref, useModel} from "vue";
import BaseBrickTab from "@/components/UI/BaseBrickTab.vue";
import BaseEditor from "@/components/UI/BaseEditor.vue";
import BaseFileUpload from "@/components/UI/BaseFileUpload.vue";
import BaseFroalaEditor from "@/components/UI/BaseFroalaEditor.vue";
// Components
import { FileTextBoldIcon, TextSquareBoldIcon } from '@/components/Icons'
// Macros
const props = defineProps({
  modelValue: {
    type: String,
  },
  fileUploadContainerClasses: {
    type: String,
    default: ""
  },
  files: {
    type: Array,
    default: []
  }
})

const modelValue = useModel(props, 'modelValue');
const emit = defineEmits(['update:modelValue', 'emit:fileUpload'])
const tabPanelList = ref([
  {
    title: 'text',
    slot: 'editor',
    icon: TextSquareBoldIcon
  },
  {
    title: 'file',
    slot: 'file',
    icon: FileTextBoldIcon
  },
]);

</script>

<template>
  <base-brick-tab
    :tab-panel-list="tabPanelList"
    panel-container-class="px-0"
  >
    <template #editor>
      <base-froala-editor
        v-model="modelValue"
      />
    </template>

    <template #file>
      <div
        :class="props.fileUploadContainerClasses"
      >
        <base-file-upload
          :files="props.files"
          @emit:file-upload="(val) => emit('emit:fileUpload', val)"
        />
      </div>
    </template>
  </base-brick-tab>
</template>

<style scoped>

</style>
