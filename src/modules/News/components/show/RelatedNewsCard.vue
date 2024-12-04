<script setup>
import { formatDateNamedMonth } from '@/utils/formatDate';

// Components

const props = defineProps({
    news: {
        type: Object,
        default: () => {}
    }   
})
</script>

<template>
    <RouterLink :to="{ name: 'NewsShow', params: {id: news.id}}" class="max-w-[416px] w-full p-3 flex items-center gap-4 bg-greyscale-50 rounded-2xl overflow-hidden">
        <div class="max-w-[130px] min-w-[130px] h-[92px] min-h-[92px]  overflow-hidden rounded-lg">
            <img :src="props.news?.image?.url" alt="" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-col gap-3 justify-center">
            <div class=" font-semibold text-[15px] text-greyscale-900 leading-6 h-[48px] line-clamp-2 " >
               {{ props.news?.title }}
            </div>
            <div class=" font-medium text-[11px] text-greyscale-500">
                {{ formatDateNamedMonth(props.news?.created_date) }}
            </div>
        </div>
    </RouterLink>
</template>
