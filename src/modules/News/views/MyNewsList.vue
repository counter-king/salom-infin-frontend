<script setup>
// core
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
// components
import BaseDataTable from '@/components/UI/BaseDataTable.vue';
import { AltArrowRightIcon, PenIcon, TrashBinTrashIcon } from '@/components/Icons';
import BaseIconify from '@/components/UI/BaseIconify.vue';
import NewsStatus from '../components/NewsStatus.vue';
import DeleteNewsDialog from '../components/DeleteNewsDialog.vue';
import RejectNewsDialog from '../components/RejectNewsDialog.vue';
// composable
import { useMyNewsList } from '../composibles/useMyNewsList';
import { useSearchNews } from '../composibles/useSearchNews';
// stores
import { useCountStore } from '@/stores/count.store'
import { useNewsCountStore } from '../stores/news.count.store'
// utils
import { formatDate } from '@/utils/formatDate';
import { fetchGetMyNewsDelete } from '../services/news.service';
import { NEWS_STATUS } from '../enums';

const { t } = useI18n();
const router = useRouter();
// composables
const countStore = useCountStore()
const newsCountStore = useNewsCountStore()

const {headers, list, totalCount, loading , getMyNewsList } = useMyNewsList();
const {debouncedSearchQuery } = useSearchNews();
// reactive
const  newsId = ref(null);
const  dialogDeleteIsOpen = ref(false)
const  isDeleteLoading = ref(false)
const  isRejectReasonVisible = ref(false)
const  rejectReason = ref(null)

// methods
const onRowClick = (data) => {
  router.push({ name: 'NewsDetails', params: {id: data.id, type:"show"}})
}

const handleClickEdit = (id) => {
  router.push({ name: 'NewsEdit', params: {id: id}})
}

const handleDeleteDialog = (id) => {
  newsId.value = id
  dialogDeleteIsOpen.value = true
}

const handleCloseDeleteDialog = () => {
  dialogDeleteIsOpen.value = false
}

const handleDeleteNews = async ()=>{  
  isDeleteLoading.value = true
  if(!!newsId.value){
   await fetchGetMyNewsDelete(newsId.value)
   getMyNewsList({page:1, page_size: 15, search: debouncedSearchQuery.value})
   countStore.actionCountList()
   newsCountStore.actionGetNewsPandingCountList()
   isDeleteLoading.value = false
   dialogDeleteIsOpen.value = false
  }
}

watch(debouncedSearchQuery, () => {
  router.replace({ name: 'MyNewsList', query: { ...router.currentRoute.value.query, search: debouncedSearchQuery.value, page: undefined, page_size: undefined } });
  getMyNewsList({page:1, page_size: 15, search: debouncedSearchQuery.value})
})

</script>
<template>
  <div class="w-full">
      <base-data-table 
         :action-list="getMyNewsList"
         :headers="headers"
         :total-count="totalCount"
         :value="list"
         :loading="loading"
         scroll-height="calc(100vh - 295px)"
         @emit:row-click="onRowClick"
      >
        <template #image="{ data }">
         <div class="w-[38px] h-[38px] min-w-[38px] min-h-[38px] rounded-lg overflow-hidden">
           <img v-if="data.image?.url ? data.image?.url : data.image?.blobUrl" :src="data.image?.url ? data.image?.url : data.image?.blobUrl" class="w-full h-full object-cover" alt="rasm">
           <div v-else class="flex justify-center items-center h-full w-full">-</div>
         </div>
        </template>
        <template #status="{ data }">
          <div class="flex gap-[100px] items-center">
            <news-status :status="data.status"/>
            <div 
              @click.stop="isRejectReasonVisible = true; rejectReason = data.cancelled_reason"
              v-if="data.status === NEWS_STATUS.DECLINED" class="flex items-center pl-2 pr-1 py-1 rounded-full bg-greyscale-50 hover:bg-white"
              >
                <p class="text-xs text-greyscale-500 font-semibold"> {{ t('reason') }}</p>
                 <BaseIconify :icon="AltArrowRightIcon" class="!w-4 !h-4 !text-greyscale-500"/>
            </div>
          </div>
        </template>
        <template #created_date="{ data }">
          {{ formatDate(data.created_date) }}
        </template>
        <template #actions="{ data }">
         <div class="flex gap-2">
          <div @click.stop="handleClickEdit(data.id)" class="cursor-pointer bg-greyscale-50 text-greyscale-500 p-[6px] rounded-lg hover:bg-white">
            <BaseIconify 
            :icon="PenIcon" 
            />
          </div>
          <div @click.stop="handleDeleteDialog(data.id)" class="cursor-pointer bg-greyscale-50 text-critic-500  p-[6px] rounded-lg hover:bg-white">
            <BaseIconify 
            :icon="TrashBinTrashIcon" 
            />
          </div>
         </div>
        </template>
     </base-data-table>
     <delete-news-dialog v-if="dialogDeleteIsOpen" :isLoading="isDeleteLoading" v-model="dialogDeleteIsOpen" :onClose="handleCloseDeleteDialog" :onDeleteNews="handleDeleteNews"/>
     <reject-news-dialog  v-if="isRejectReasonVisible" v-model="isRejectReasonVisible"  :value="rejectReason" max-width="max-w-[700px]" type="show-reason" :headerLable="t('reason-reject')" :disabled="true"/>
  </div>
</template>