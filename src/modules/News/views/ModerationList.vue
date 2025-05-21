<script setup>
// core
import { useI18n } from 'vue-i18n';
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
// components
import BaseDataTable from '@/components/UI/BaseDataTable.vue';
import NewsStatus from '../components/NewsStatus.vue';
// composable
import { useModerationNewsList } from '../composibles/useModerationNewsList';
import { useSearchNews } from '../composibles/useSearchNews';
// utils
import { formatDate } from '@/utils/formatDate';
// stores
import { useNewsCountStore } from '../stores/news.count.store';

const { t } = useI18n();
const router = useRouter();
const newsCountStore = useNewsCountStore()

// composables
const {headers, list, totalCount, loading , getModerationNewsList } = useModerationNewsList();
const { debouncedSearchQuery } = useSearchNews();

// methods
const onRowClick = (data) => {
  router.push({ name: 'NewsDetails', params: {id: data.id, type:"moderation"}})
}

watch(debouncedSearchQuery, () => {
  router.replace({ name: 'NewsModerationList', query: { ...router.currentRoute.value.query, search: debouncedSearchQuery.value, page: undefined, page_size: undefined } });
  getModerationNewsList({page:1, page_size: 15, search: debouncedSearchQuery.value})
})

onMounted(() => {
  newsCountStore.actionGetNewsPandingCountList()
})

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
           <img :src="data.image?.url ? data.image?.url : data.image?.blobUrl" class="w-full h-full object-cover" alt="rasm">
         </div>
        </template>
        <template #author="{ data }">
          <div class="font-semibold text-xs text-greyscale-900">
            <div>{{ data.created_by?.full_name }}</div>  
            <div><span class="text-greyscale-500">{{ t('department') }}</span> : <span class="text-geyscale-800">{{ data.created_by?.top_level_department?.name }}</span></div>  
            <div><span class="text-greyscale-500">{{ t('position') }}</span> : <span class="text-geyscale-800">{{  data.created_by?.position?.name }}</span></div>
          </div>
        </template>
        <template #status="{ data }">
          <news-status :status="data.status"/>
        </template>
        <template #created_date="{ data }">
          {{ formatDate(data.created_date) }}
        </template>
        <template #published_date="{ data }">
          {{ formatDate(data.published_date) }}
        </template>
     </base-data-table>
  </div>
</template>