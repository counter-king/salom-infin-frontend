<script setup>
// Components

const props = defineProps({
 
})
</script>

<template>
    <div class="max-w-[416px] w-full p-3 flex items-center gap-4 bg-greyscale-50 rounded-2xl">
        <div class="max-w-[130px] w-full h-[92px]  overflow-hidden rounded-lg">
            <img src="@/assets/img/news.png" alt="" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-col gap-3 justify-center">
            <div class=" font-semibold text-[15px] text-greyscale-900 leading-6">
                Вчера наша команда провела отличный тимбилдинг
            </div>
            <div class=" font-medium text-[11px] text-greyscale-500">
                28 ноября 2024 г.
            </div>
        </div>
    </div>
</template>
