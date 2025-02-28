<script setup>
// cores
import { ChevronDown20SolidIcon, ClapperboardPlayBoldIcon, DownloadMinimalisticIcon, FileTextBoldIcon } from '@/components/Icons';
import { useI18n } from 'vue-i18n';
// components
import FileItemDetail from './FileItemDetail.vue';
import EmptyData from '@/components/Empty.vue';
// constants
import { COMPONENT_TYPES } from '../constatns';
// utils
import { formatDateMonthWithDay, formatDay } from '@/utils/formatDate';
// stores
import { useChatStore } from '../stores';

const { t } = useI18n();
// props
const props = defineProps({
  onClickFun: {
   type: Function
  }
})

const chatStore = useChatStore()

const showDateByCalculate = (index) => {
  const previouMessageCreatedDate = chatStore.messageVideoFileList.results[index - 1]?.created_date
  const nowMessageCreatedDate = chatStore.messageVideoFileList.results[index]?.created_date
  if(formatDay(nowMessageCreatedDate) != formatDay(previouMessageCreatedDate)){
    return true
  } else {
    return false
  }
}
</script>
<template>
  <div class="flex flex-col gap-4 p-4" @click.stop>
   <!-- control title -->
   <div class="flex items-center gap-3 pl-2">
     <div class="flex bg-greyscale-50 rounded-full p-1">
       <BaseIconify
        :icon="ChevronDown20SolidIcon"
        class="text-greyscale-500 !h-6 !w-6 transform rotate-90 cursor-pointer"
        @click="props.onClickFun(COMPONENT_TYPES.FILES)"
       />
     </div>
     <span class="text-base font-semibold text-greyscale-900 select-none">
      {{ t('video') }}
     </span>
   </div>
   <!-- data -->
    <div class="flex flex-col gap-1">
      <template v-if="chatStore.messageFilesListLoading">
        <base-spinner />
      </template>
      <template v-else>
        <EmptyData 
          wrapperClass="!shadow-none mt-4"
          v-if="chatStore.messageVideoFileList.results.length == 0" 
          title="no-data"  
        />
        <template v-for="(message, index) in chatStore.messageVideoFileList.results || []" :key="index">
          <div v-if="showDateByCalculate(index)" class="pl-2 text-sm font-medium text-greyscale-500">{{ formatDateMonthWithDay(message.created_date) }}</div>
          <FileItemDetail :message="message" :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: ClapperboardPlayBoldIcon, class: 'text-success-500' }"/>
        </template>
      </template>
    </div>
  </div>
</template>