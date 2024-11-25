<script setup>
// Core
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import { useDebounce } from '@vueuse/core'
// Components
import HeaderToolbar from '../components/HeaderToolbar.vue'
import NewCard from '../components/NewsCard.vue'
import image from '@/assets/img/news.png'

// route
const route = useRoute()

// method
const searchQuery = computed(() => route.query.search)
let debouncedSearchQuery = useDebounce(searchQuery, 750)

watch(debouncedSearchQuery, (newValue) => {
  console.log('search', newValue)
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

</script>

<template>
  <div class="news-view w-full p-10 pt-7">
    <header-toolbar />
    <div class="grid grid-cols-[repeat(auto-fit,minmax(328px,328px))] justify-between gap-4">
      <template v-for="i in 10" :key="i">
        <RouterLink :to="{ name: 'NewsShow', params: {id: 12}}" class="text-indigo-700 text-sm">
          <NewCard :data="mockData" />
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<style></style>
