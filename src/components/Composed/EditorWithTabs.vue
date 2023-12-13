<script setup>
// Core
import {ref, useModel} from "vue";
import BaseBrickTab from "@/components/UI/BaseBrickTab.vue";
import BaseEditor from "@/components/UI/BaseEditor.vue";

const props = defineProps({
  modelValue: {
    type: String,
  }
})

const modelValue = useModel(props, 'modelValue');
const emit = defineEmits(['update:modelValue'])
const tabPanelList = ref([
  {
    title: 'text',
    slot: 'editor',
    icon: 'TextSquareIcon'
  },
  {
    title: 'file',
    slot: 'file',
    icon: 'FileTextFilledIcon'
  },
])
</script>

<template>
  <base-brick-tab
    :tab-panel-list="tabPanelList"
    panel-container-class="px-0"
  >
    <template #editor>
      <base-editor
        v-model="modelValue"
      />
    </template>

    <template #file>
      File
    </template>
  </base-brick-tab>
</template>

<style scoped>

</style>
