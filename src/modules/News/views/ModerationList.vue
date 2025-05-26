<script setup>
// core
import { useI18n } from 'vue-i18n';
import { onMounted, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
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
// enums
import { NEWS_STATUS } from '../enums';

const { t } = useI18n();
const router = useRouter();
const route = useRoute()
const newsCountStore = useNewsCountStore()

const statusQuery = computed(() => route.query.status || `${NEWS_STATUS.PANDING},${NEWS_STATUS.PUBLISHED},${NEWS_STATUS.DECLINED}`)
// composables
const {headers, list, totalCount, loading , getModerationNewsList } = useModerationNewsList();
const { debouncedSearchQuery } = useSearchNews();

// methods
const onRowClick = (data) => {
  router.push({ name: 'NewsDetails', params: { id: data.id, type:"moderation" }})
}

watch(debouncedSearchQuery, () => {
  router.replace({ name: 'NewsModerationList', query: { ...router.currentRoute.value.query, status: statusQuery.value, search: debouncedSearchQuery.value, page: undefined, page_size: undefined } });
  getModerationNewsList({ page:1, page_size: 15, ...route.query, search: debouncedSearchQuery.value })
})

watch(() => route.query.status, () => {
  if(route.query.status){
    getModerationNewsList({ page:1, page_size: 15, ...route.query })
  } else {
    getModerationNewsList({ page:1, page_size: 15, ...route.query, status: statusQuery.value})
  }
})

onMounted(() => {
  newsCountStore.actionGetNewsPandingCountList()

  if (!route.query.status) {
    const newQuery = {
      ...route.query,
      status: statusQuery.value
    }
    router.replace({ query: newQuery })
  }
})

</script>
<template>
  <div class="w-full">
      <base-data-table 
        :action-list="getModerationNewsList"
        :api-params="{ page_size: 15, status: statusQuery }"
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
          {{ data.published_date ? formatDate(data.published_date) : '-' }}
        </template>
     </base-data-table>
  </div>
</template>