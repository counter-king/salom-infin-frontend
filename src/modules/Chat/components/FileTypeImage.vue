<script setup>
// cores
import { computed, ref } from 'vue';
import { ChevronDown20SolidIcon, DownloadMinimalisticIcon, GalleryBoldIcon } from '@/components/Icons';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
// components
import FileItemDetail from './FileItemDetail.vue';
import Empty from '@/components/Empty.vue';
// utils
import { formatDateMonthWithDay, formatDay } from '@/utils/formatDate';
// contants
import { CHAT_ROUTE_NAMES, COMPONENT_TYPES, MESSAGE_TYPES } from '../constatns';
// stores
import { useChatStore } from '../stores';
// composables
import { useInfiniteScroll } from '../composables/useInfiniteScroll';

const { t } = useI18n();
// props
const props = defineProps({
  onClickFun: {
   type: Function
  }
})

const chatStore = useChatStore();

const route = useRoute()
// reactives
const containerRef = ref(null)
// computeds
const isPrivateChat = computed(()=> route.name == CHAT_ROUTE_NAMES.PRIVATE)
// composables
useInfiniteScroll({ fetchFn: chatStore.actionGetMessageImageFileList, containerRef, params: { page: 1, page_size: 10, chat: isPrivateChat.value ? chatStore.selectedUser?.chat_id : chatStore.selectedGroup?.chat_id, type: MESSAGE_TYPES.IMAGE }})

const showDateByCalculate = (index) => {
  const previouMessageCreatedDate = chatStore.messageImageFileList[index - 1]?.created_date
  const nowMessageCreatedDate = chatStore.messageImageFileList[index]?.created_date
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
      {{ t('images') }}
     </span>
   </div>
    <!-- data -->
    <div class="flex flex-col gap-1">
      <template v-if="chatStore.messageImageFileListLoading">
        <base-spinner class="mt-5"  />
      </template>
      <template v-else>
        <Empty 
          wrapperClass="!shadow-none mt-4"
          v-if="chatStore.messageImageFileList.length == 0" 
          title="no-data"  
        />
        <template v-for="(message, index) in chatStore.messageImageFileList || []" :key="index">
          <!-- date -->
          <div v-if="showDateByCalculate(index)" class="pl-2 text-sm font-medium text-greyscale-500">{{ formatDateMonthWithDay(message?.created_date) }}</div>
          <FileItemDetail :message="message" :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500'}" :left-icon="{ name: GalleryBoldIcon, class: 'text-warning-500' }"/>
        </template> 
      </template>
    </div>
  </div>
</template>