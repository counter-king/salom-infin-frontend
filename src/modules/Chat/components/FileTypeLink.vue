<script setup>
// cores
import { useI18n } from 'vue-i18n';
// components
import FileItemLink from './FileItemLink.vue';
import Empty from '@/components/Empty.vue';
// utils
import { formatDateMonthWithDay, formatDay } from '@/utils/formatDate';
// stores
import { useChatStore } from '../stores';

const chatStore = useChatStore()
// props
const props = defineProps({
})

const showDateByCalculate = (index) => {
  const previouMessageCreatedDate = chatStore.messageLinkList[index - 1]?.created_date
  const nowMessageCreatedDate = chatStore.messageLinkList[index]?.created_date
  if(formatDay(nowMessageCreatedDate) != formatDay(previouMessageCreatedDate)){
    return true
  } else {
    return false
  }
}

</script>
<template>
  <div class="flex flex-col gap-4 p-4 overflow-auto h-[260px]">
   <!-- data -->
    <div class="flex flex-col gap-1">
       <template v-if="chatStore.messageFilesListLoading">
         <base-spinner />
       </template>
       <template v-else>
        <Empty 
          wrapperClass="!shadow-none mt-4"
          v-if="!chatStore.messageLinkList?.length" 
          title="no-data"  
        />
         <template v-for="(message,index) in chatStore.messageLinkList || []" :key="message.id">
            <template v-if="showDateByCalculate(index)">
              <div class="pl-2 text-sm font-medium text-greyscale-500">{{ formatDateMonthWithDay(message.created_date) }}</div>
            </template>
           <FileItemLink :message="message" />
         </template>
       </template>
    </div>
  </div>
</template>