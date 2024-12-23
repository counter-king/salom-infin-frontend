<script setup>
// core
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
// components
import ShowNewsDialog from '../components/ShowNewsDialog.vue';
import BaseDataTable from '@/components/UI/BaseDataTable.vue';
import { PenIcon, TrashBinTrashIcon } from '@/components/Icons';
import BaseIconify from '@/components/UI/BaseIconify.vue';
import NewsStatus from '../components/NewsStatus.vue';
import DeleteNewsDialog from '../components/DeleteNewsDialog.vue';
// composable
import { useMyNewsList } from '../composibles/useMyNewsList';
import { useSearchNews } from '../composibles/useSearchNews';
// utils
import { formatDate } from '@/utils/formatDate';
import { fetchGetMyNewsDelete } from '../services/news.service';

const router = useRouter();
const {headers, list, totalCount, loading , getMyNewsList } = useMyNewsList();
const {debouncedSearchQuery } = useSearchNews();
// reactive
const  showNewsDialog = ref(false);
const  newsId = ref(null);
const  newsData = ref(null);
const  dialogDeleteIsOpen = ref(false)
const  isDeleteLoading = ref(false)

// methods
const onRowClick = (data) => {
  showNewsDialog.value = true
  newsId.value = data.id
  newsData.value = data
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
   getMyNewsList({page:1, page_size: 15})
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
           <img :src="data.image?.url" class="w-full h-full object-cover" alt="rasm">
         </div>
        </template>
        <template #status="{ data }">
          <news-status :status="data.status"/>
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
     <show-news-dialog :id="newsId" :data="newsData" v-if="showNewsDialog" v-model="showNewsDialog"/>
     <delete-news-dialog v-if="dialogDeleteIsOpen" :isLoading="isDeleteLoading" v-model="dialogDeleteIsOpen" :onClose="handleCloseDeleteDialog" :onDeleteNews="handleDeleteNews"/>
  </div>
</template>