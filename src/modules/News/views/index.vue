<script setup>
// Core
import { RouterLink, useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { useDebounce } from '@vueuse/core'
// Components
import HeaderToolbar from '../components/HeaderToolbar.vue'
import NewCard from '../components/NewsCard.vue'
import { fetchGetNewsList } from '../services/news.service'
import TheFooter from '@/components/TheFooter.vue';

// store 
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'
// route
const route = useRoute()
// reactive 
const newsList = ref([])
const loading = ref(false)
const page = ref(1)
const next = ref(false)
const tagParamId = computed(() => route.query.tag)
// method
const searchQuery = computed(() => route.query.search)
let debouncedSearchQuery = useDebounce(searchQuery, 750)

watch(debouncedSearchQuery, (newValue) => {
  newsList.value = []
  fetchNewsList(1)
})

// getting next gage when scroll reach down.
const handleScroll = (event) => {
  const bottom = event.target.scrollHeight >= Math.floor(event.target.scrollTop + event.target.clientHeight);
  if (bottom) {
    if(next.value){
      page.value += 1
      fetchNewsList(page.value)
    }
  }
};

const fetchNewsList = async (page) => {
  if (loading.value) return;
  // there is newsList data, then don't show loading 
  if(!newsList.value.length) {
    loading.value = true
  }
  try {
    const { data } = await fetchGetNewsList({ page: page, search: debouncedSearchQuery.value, tags: tagParamId.value })    
    next.value = data.next;
    if(!!data.results?.length){
      if(!!tagParamId){
        newsList.value=[...data.results]
      } else {
        newsList.value=[...newsList.value, ...data.results]
      }
    }
  }
  catch(e) {
    dispatchNotify(null, e?.message, COLOR_TYPES.ERROR)
  }
  finally {
      loading.value = false
  }
}

watch(tagParamId, (newValue) => {
  if(!newValue){
    fetchNewsList(1)
  }
})

onMounted(async() => {
  fetchNewsList(page.value)
})

</script>
<template>
    <div class="news-view w-full p-10 pt-7 pb-2 overflow-y-scroll flex flex-col" @scroll="handleScroll">
      <header-toolbar />
      <template v-if="loading">
         <base-spinner />  
      </template>
      <div v-else class="grid xl:grid-cols-4 xl:gap-4 lg:grid-cols-3 lg:gap-3 justify-between place-items-stretch" :class="newsList.length < 4 && '!justify-start'">
        <template v-for="item in newsList" :key="item.id">
          <RouterLink :to="{ name: 'NewsShow', params: {id: item.id}}">
            <NewCard :item="item" />
          </RouterLink>
        </template>
      </div>
      <div class="mt-auto">
        <the-footer/>   
      </div>
    </div>
</template>
