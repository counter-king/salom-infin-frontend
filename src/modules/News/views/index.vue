<script setup>
// Core
import { RouterLink, useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { useDebounce } from '@vueuse/core'
// Components
import HeaderToolbar from '../components/HeaderToolbar.vue'
import NewCard from '../components/NewsCard.vue'
import { fetchGetNewsList } from '../services/news.service'
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
      newsList.value=[...newsList.value, ...data.results]
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
    <div class="news-view w-full p-10 pt-7 overflow-y-scroll" @scroll="handleScroll">
      <header-toolbar />
      <template v-if="loading">
         <base-spinner />  
      </template>
      <div v-else class="grid grid-cols-[repeat(auto-fit,minmax(328px,328px))] justify-between gap-4" :class="newsList.length < 4 && '!justify-start'">
        <template v-for="item in newsList" :key="item.id">
          <RouterLink :to="{ name: 'NewsShow', params: {id: item.id}}" class="text-indigo-700 text-sm">
            <NewCard :item="item" />
          </RouterLink>
        </template>
      </div>
    </div>
</template>
  
<style></style>
