<script setup>
// Core
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { useDebounce } from '@vueuse/core'
// Components
import HeaderToolbar from '../components/HeaderToolbar.vue'
import NewCard from '../components/NewsCard.vue'
import image from '@/assets/img/news.png'
import { fetchGetNewsList } from '../services/news.service'
// store 
import { usePaginationStore } from '@/stores/pagination.store'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'

// route
const route = useRoute()
// reactive 
const newsList = ref([])
const loading = ref(false)
const page = ref(1)
const next = ref(false)

// method
const searchQuery = computed(() => route.query.search)
let debouncedSearchQuery = useDebounce(searchQuery, 750)

watch(debouncedSearchQuery, (newValue) => {
  newsList.value = []
  fetchNewsList(1)
})

//mock
const mockData = {
  image: image,
  status: {
    name: 'Новости',
    id: 1
  },
  title: 'Вчера наша команда провела отличный тимбилдинг',
  date: '28 ноября 2024 г.',
  totalViewCount: '1,5k'
}

const handleScroll = (event) => {
  const bottom = event.target.scrollHeight === Math.floor(event.target.scrollTop + event.target.clientHeight);
  if (bottom) {
    if(next.value){
      page.value += 1
      fetchNewsList(page.value)
    }
  }
};

const fetchNewsList = async (page) => {
  if (loading.value) return;
  loading.value = true
 
  try {
    const data = await fetchGetNewsList({ page: page, search: debouncedSearchQuery.value})    
    next.value = data.next;
    if(data?.results){
      newsList.value.push(...data.results)
    }
  }
  catch(e){
    dispatchNotify(null, e?.message, COLOR_TYPES.ERROR)
  }
  finally{
      loading.value = false
  }
}


onMounted(async() => {
  fetchNewsList(1)
})

</script>
<template>
    <div class="news-view w-full p-10 pt-7 overflow-y-scroll" @scroll="handleScroll">
      <header-toolbar />
      <template v-if="loading">
         <base-spinner />  
      </template>
      <div v-else class="grid grid-cols-[repeat(auto-fit,minmax(328px,328px))] justify-between gap-4">
        <template v-for="i in 10" :key="i">
          <RouterLink :to="{ name: 'NewsShow', params: {id: 12}}" class="text-indigo-700 text-sm">
            <NewCard :data="mockData" />
          </RouterLink>
        </template>
      </div>
    </div>
</template>
  
<style></style>
