<script setup>
// cores
import { ChevronDown20SolidIcon, DownloadMinimalisticIcon, FileTextBoldIcon } from '@/components/Icons';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
// components
import Empty from '@/components/Empty.vue';
// utils
import { formatDateMonthWithDay, formatDay } from '@/utils/formatDate';
import FileItemDetail from './FileItemDetail.vue';
//constants
import { COMPONENT_TYPES, MESSAGE_TYPES } from '../constatns';
// stores
import { useChatStore } from '../stores';
// composables
import { useInfiniteScroll } from '../composables/useInfiniteScroll';

const { t } = useI18n();
const chatStore = useChatStore()
// props
const props = defineProps({
  onClickFun: {
   type: Function
  }
})

const route = useRoute()
// reactives
const containerRef = ref(null)
// composables
useInfiniteScroll({ fetchFn: chatStore.actionGetMessageFileList, containerRef, params: { page: 1, page_size: 10, chat:route.params?.id, type: MESSAGE_TYPES.FILE }})

const showDateByCalculate = (index) => {
  const previouMessageCreatedDate = chatStore.messageFileList.results[index - 1]?.created_date
  const nowMessageCreatedDate = chatStore.messageFileList.results[index]?.created_date
  if(formatDay(nowMessageCreatedDate) != formatDay(previouMessageCreatedDate)){
    return true
  } else {
    return false
  }
}

</script>
<template>
  <div class="flex flex-col gap-4 p-4 overflow-auto h-[260px]" ref="containerRef">
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
      {{ t('documents') }}
     </span>
   </div>
   <!-- data -->
    <div class="flex flex-col gap-1">
      <template v-if="chatStore.messageFilesListLoading">
        <base-spinner />
      </template>
      <template v-else>
        <Empty 
          wrapperClass="!shadow-none mt-4"
          v-if="chatStore.messageFileList?.results?.length == 0" 
          title="no-data"  
        />
        <template v-for="(message, index) in chatStore.messageFileList?.results || []" :key="index">
          <!-- date -->
          <div v-if="showDateByCalculate(index)" class="pl-2 text-sm font-medium text-greyscale-500">{{ formatDateMonthWithDay(message?.created_date) }}</div>
          <FileItemDetail :message="message" :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500'}" :left-icon="{ name: FileTextBoldIcon, class: 'text-warning-500' }"/>
        </template>
      </template>
    </div>
  </div>
</template>