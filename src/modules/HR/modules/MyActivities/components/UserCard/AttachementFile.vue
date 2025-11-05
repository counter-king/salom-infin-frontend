<script setup>
// core
import { ref, unref } from 'vue'
// components
import { PaperclipLinearIcon, AltArrowDownIcon } from '@/components/Icons'
// stores
import { useBlobFileStore } from '@/stores/file.store'

// composables
const blobFileStore = useBlobFileStore()

const props = defineProps({
  list: {
    type: Array,
    required: true
  }
})

const opRef = ref(null)

const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}

const openFile = async (file) => {
 const { blobUrl } = await blobFileStore.actionGetBlobFile(3425 || file?.id)
 window.open(blobUrl, '_blank')
}
const onClickAttachedFile = async (event, file) => {
 if(props.list?.length > 1){
  toggle(event)
 } else {
  await openFile(file)
 }
}
</script>

<template>
  <div @click="onClickAttachedFile($event, props?.list[0])" class="w-fit cursor-pointer flex gap-[6px] items-center px-[6px] py-1 text-xs text-greyscale-500 font-medium rounded-[6px] bg-greyscale-50">
    <base-iconify :icon="PaperclipLinearIcon" class="!w-4 !h-4 text-primary-500" />
    <span class="cursor-pointer text-primary-500">{{ props.list[0]?.name }}</span>
    <div class="flex items-center justify-center w-4 h-4 min-w-4 min-h-4 text-semibold text-xs text-white bg-critic-500 rounded-full">{{ list.length }}</div>
    <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-primary-500" />
  </div>
  <base-overlay-panel
    ref="opRef"
    width="min-w-[120px]"
    menu-class="bg-white mt-2 overflow-hidden"
  >
    <div class="flex flex-col p-1 gap-y-1">
      <template v-for="item in props.list">
        <div @click="openFile(item)" class="w-full cursor-pointer flex gap-[6px] items-center px-3 py-2 text-xs text-greyscale-500 font-medium rounded-[6px] hover:bg-greyscale-50">
          <base-iconify :icon="PaperclipLinearIcon" class="!w-4 !h-4 text-primary-500" />
          <span class="cursor-pointer text-primary-500">{{ item?.name }}</span>
        </div>
      </template>
    </div>
  </base-overlay-panel>
</template>