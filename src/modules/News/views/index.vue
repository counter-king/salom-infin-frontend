<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { useDebounce } from '@vueuse/core'
import HeaderToolbar from '../components/HeaderToolbar.vue'
import NewCard from '../components/NewsCard.vue'
import { fetchGetModerationNewsList } from '../services/news.service'
import TheFooter from '@/components/TheFooter.vue'
import NewsFilterBar from '../components/NewsFilterBar.vue'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'

const route = useRoute()
const newsList = ref([])
const loading = ref(false)
const page = ref(1)
const next = ref(false)
const searchQuery = computed(() => route.query.search)

const queryParams = computed(() => ({
  tags: route.query.tag,
  category: route.query.category,
  startDate: route.query.startDate,
  endDate: route.query.endDate,
  popularity: route.query.popularity,
  socialAttendance: route.query.socialAttendance,
}))

let debouncedSearchQuery = useDebounce(searchQuery, 750)

watch(debouncedSearchQuery, () => {
  newsList.value = []
  fetchNewsList(1, true)
})

const fetchNewsList = async (currentPage, resetList = false) => {
  if (loading.value) return
  loading.value = true
  try {
    const { data } = await fetchGetModerationNewsList({ 
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
    loading.value = false
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
  [() => queryParams.value.category,
  () => queryParams.value.endDate,
  () => queryParams.value.startDate,
  () => queryParams.value.popularity,
  () => queryParams.value.socialAttendance],
  () => {
    newsList.value = []
    fetchNewsList(1, true)
  },
)

onMounted(() => {
  fetchNewsList(1, true)
})
</script>

<template>
  <div class="news-view w-full p-10 pt-7 pb-2 overflow-y-scroll flex flex-col" @scroll="handleScroll">
    <header-toolbar />
    <!-- <template v-if="loading && newsList.length === 0">
      <base-spinner />  
    </template> -->
    <div class="flex gap-4">
      <template v-if="loading && newsList.length === 0">
        <base-spinner />  
      </template>
      <div  v-else  class="grid 2xl:grid-cols-4 2xl:gap-4 xl:grid-cols-3 xl:gap-3 justify-between place-items-stretch self-start" :class="newsList.length < 4 && '!justify-start'">
        <template v-for="item in newsList" :key="item.id">
          <RouterLink :to="{ name: 'NewsShow', params: {id: item.id}}">
            <NewCard :item="item" />
          </RouterLink>
        </template>
      </div>
      <div class="w-[325px] min-w-[325px] h-fit sticky top-0">
        <news-filter-bar />
      </div>
    </div>  
    <div class="mt-auto">
      <the-footer/>   
    </div>
  </div>
</template>