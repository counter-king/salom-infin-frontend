<script setup>
// core
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
// components
import NewCard from '../components/NewsCard.vue'
import NewsFilterBar from '../components/NewsFilterBar.vue'
import Empty from '@/components/Empty.vue'
// utils
import { dispatchNotify } from '@/utils/notify'
// enums
import { COLOR_TYPES } from '@/enums'
// services
import { fetchGetNewsList } from '../services/news.service'
// composables
import { useSearchNews } from '../composibles/useSearchNews'
const route = useRoute()
// reactive
const newsList = ref([])
const initialLoading = ref(false)
const loadingMore = ref(false)
const page = ref(1)
const next = ref(false)
const isFilterApplied = ref(false)

const showSidebarFilter = computed(() =>
  newsList.value.length > 0 || isFilterApplied.value 
)

const queryParams = computed(() => ({
  tag: route.query.tag,
  category: route.query.category,
  start_date: route.query.startDate,
  end_date: route.query.endDate,
  ordering: route.query.ordering,
}))
const  {debouncedSearchQuery, searchQuery } = useSearchNews();


const fetchNewsList = async (currentPage, resetList = false) => {

  if (resetList) {
    if (initialLoading.value) return
    initialLoading.value = true
  } else {
    if (loadingMore.value) return
    loadingMore.value = true
  }

  try {
    const { data } = await fetchGetNewsList({ 
      page: currentPage, 
      search: debouncedSearchQuery.value,
      ...queryParams.value 
    })
    next.value = data.next
    if (resetList) {
      newsList.value = data.results
    } else {
      newsList.value = [...newsList.value, ...data.results]
    }
    page.value = currentPage
  } catch (e) {
    dispatchNotify(null, e?.message, COLOR_TYPES.ERROR)
  } finally {
   if (resetList) {
      initialLoading.value = false
    } else {
      loadingMore.value = false
    }
  }
}

const handleScroll = (event) => {
  const bottom = event.target.scrollHeight - Math.floor(event.target.scrollTop) <= event.target.clientHeight + 1
  if (bottom && next.value) {
    page.value += 1
    fetchNewsList(page.value, false)
  }
}

watch(
  [
  () => queryParams.value.category,
  () => queryParams.value.end_date,
  () => queryParams.value.start_date,
  () => queryParams.value.ordering,
  () => queryParams.value.tag,
  debouncedSearchQuery
],
  () => {
    isFilterApplied.value = Object.values(queryParams.value).some(Boolean) || !!debouncedSearchQuery.value && !!newsList.value.length
    console.log(isFilterApplied.value);
    newsList.value = []
    fetchNewsList(1, true)
  },
)

onMounted(() => {
  isFilterApplied.value = Object.values(queryParams.value).some(Boolean) || !!searchQuery.value && !!newsList.value.length
  fetchNewsList(1, true)
})
</script>

<template>
    <div class="flex gap-[10px] h-full">
      <template v-if="initialLoading">
        <base-spinner />  
      </template>
      <template v-else-if="newsList.length === 0">
        <Empty 
          :title="isFilterApplied ? 'no-news-found-filter' : 'there-is-no-news-data'"
          :description="isFilterApplied ? 'no-news-found-filter-description' : 'there-is-no-news-data-description'"
          label-classes="text-greyscale-900 !text-lg font-semibold"
          wrapper-class="w-full h-full !bg-primary-50 shadow-none"
          inner-wrapper-class="w-[335px]"
        />
      </template>
      <div v-else
         class="overflow-y-auto h-full w-full grid 2xl:grid-cols-4 2xl:gap-4 xl:grid-cols-3 xl:gap-3 justify-between place-items-start self-start pr-1 pb-1" :class="newsList.length < 4 && '!justify-start'"
          @scroll="handleScroll"
         >
        <template v-for="item in newsList" :key="item.id">
          <RouterLink :to="{ name: 'NewsShow', params: {id: item.id}}" class="w-full">
            <NewCard :item="item" />
          </RouterLink>
        </template>
        <div v-if="loadingMore" class="flex justify-center items-center h-full w-full">
          <base-spinner />
        </div>
      </div>
      <div v-if="showSidebarFilter" class="w-[325px] min-w-[325px] h-full overflow-y-auto pr-1 pb-1 place-self-stretch">
        <news-filter-bar />
      </div>
    </div>  
</template>