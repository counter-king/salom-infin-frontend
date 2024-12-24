<script setup>
// core
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
// components
import ShowNewsDialog from '../components/ShowNewsDialog.vue';
import BaseDataTable from '@/components/UI/BaseDataTable.vue';
import NewsStatus from '../components/NewsStatus.vue';
// composable
import { useModerationNewsList } from '../composibles/useModerationNewsList';
import { useSearchNews } from '../composibles/useSearchNews';
// utils
import { formatDate } from '@/utils/formatDate';
// services
import { fetchModerationApproveNews } from '../services/news.service';
import { NEWS_STATUS } from '../enums';

const router = useRouter();
// reactive
const  showNewsDialog = ref(false);
const  newsId = ref(null);
const  newsData = ref(null);
const  isLoadingReject = ref(false)
const  isLoadingApprove = ref(false)
// composables
const {headers, list, totalCount, loading , getModerationNewsList } = useModerationNewsList();
const {debouncedSearchQuery } = useSearchNews();

// methods
const onRowClick = (data) => {
  showNewsDialog.value = true
  newsId.value = data.id
  newsData.value = data
}

watch(debouncedSearchQuery, () => {
  router.replace({ name: 'NewsModerationList', query: { ...router.currentRoute.value.query, search: debouncedSearchQuery.value, page: undefined, page_size: undefined } });
  getModerationNewsList({page:1, page_size: 15, search: debouncedSearchQuery.value})
})

const handleModerationApprove = async () => {
  isLoadingApprove.value = true
  try {
    await fetchModerationApproveNews(newsId.value, { status: NEWS_STATUS.PUBLISHED })
    getModerationNewsList({page:1, page_size: 15, search: debouncedSearchQuery.value})
  } finally{
    isLoadingApprove.value = false
  }
}

const handleRejectModeration = async (reason) => {
  isLoadingReject.value = true
  try {
    await fetchModerationApproveNews(newsId.value, {cancelled_reason: reason, status: NEWS_STATUS.DECLINED})
    getModerationNewsList({page:1, page_size: 15, search: debouncedSearchQuery.value})
  } finally{
    isLoadingReject.value = false
    showNewsDialog.value = false
  }
}

</script>
<template>
  <div class="w-full">
      <base-data-table 
        :action-list="getModerationNewsList"
        :api-params="{ page_size: 15 }"
        :headers="headers"
        :total-count="totalCount"
        :value="list"
        :loading="loading"
        scroll-height="calc(100vh - 295px)"
        @emit:row-click="onRowClick"
      >
        <template #image="{ data }">
         <div class="w-[38px] h-[38px] min-w-[38px] min-h-[38px] rounded-lg overflow-hidden">
           <img :src="data.image?.url" class="w-full h-full object-cover" alt="rasm">
         </div>
        </template>
        <template #status="{ data }">
          <news-status :status="data.status"/>
        </template>
        <template #created_date="{ data }">
          {{ formatDate(data.created_date) }}
        </template>
     </base-data-table>
     <show-news-dialog 
      :id="newsId"
      :data="newsData"
      v-if="showNewsDialog"
      v-model="showNewsDialog"
      type="moderation"
      :isLoadingReject="isLoadingReject"
      :isLoadingModeration="isLoadingApprove"
      :onModeration="handleModerationApprove"
      :onRejectModeration="handleRejectModeration"
      />
  </div>
</template>