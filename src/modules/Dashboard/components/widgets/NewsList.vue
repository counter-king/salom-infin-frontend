<script setup>
// Core
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue';
// Components
import WidgetWrapper from '../WidgetWrapper.vue'
import NewsCard from '../NewsCard.vue';
import { AltArrowLeftIcon } from '@/components/Icons';
// Services
import { fetchGetNewsList } from '@/modules/News/services/news.service';
// Utils
import { dispatchNotify } from '@/utils/notify';
// Composable
const { t } = useI18n()

// reactive
const loading = ref(true)
const newsList = ref([])

// methods
const getNewsList = async () => {
  loading.value = true
  try {
    const { data } = await fetchGetNewsList({ page_size: 10 })
    newsList.value = data?.results || []
  } catch (e) {
    dispatchNotify(null, e?.message, COLOR_TYPES.ERROR)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getNewsList()
})

</script>

<template>
  <widget-wrapper title="news">
    <template #content>
      <div class="bg-greyscale-50 h-[calc(100%-32px)] p-3 rounded-xl">
        <div class="flex flex-col gap-2 h-full pr-2 pb-2 overflow-y-auto">
          <template v-for="item in newsList" :key="item.id">
            <RouterLink :to="{ name: 'NewsShow', params: {id: item.id}}" class="w-full !h-fit">
              <NewsCard :item="item" />
            </RouterLink>
          </template>
        </div>
      </div>
      <router-link :to="{name: 'NewsList'}" class="flex items-center justify-center gap-1 h-6 text-sm mt-2">
        <span class="font-semibold text-primary-500 leading-[1]">{{ t('all-news') }}</span>

        <base-iconify
          :icon="AltArrowLeftIcon"
          width="16"
          height="16"
          class="rotate-180 text-primary-500"
        />
      </router-link>
    </template>
  </widget-wrapper>
</template>

<style scoped>

</style>
