<script setup>
// Core
import { useRoute } from 'vue-router';
// Components
import BackButton from '@/components/Actions/BackButton.vue';
import CircleWrapper from '../show/components/CircleWrapper.vue';
import RelatedNewsCard from '../show/components/RelatedNewsCard.vue';
import Swiper from '../show/components/Swiper.vue';
import Tag from '../components/Tag.vue';
import Comment from '../show/components/Comment.vue';
import Divider from '@/components/Divider';
// icons
import BaseIconify from '@/components/UI/BaseIconify.vue';
import { BookmarkBoldIcon, EyeBoldIcon, EyeLinearIcon, ForwardBoldIcon, HeartBoldIcon } from '@/components/Icons';
import UserCard from '../components/UserCard.vue';
import Queto from '../create/components/Queto.vue';
import { onMounted } from 'vue';

// services
import { fetchGetNews } from '../services/news.service';
import { ref } from 'vue';

const  route = useRoute()
// reactive 
const loading = ref(false)

// methods
const fetchOneNews = async() => {

   loading.value = true
   try {
       const data  = await fetchGetNews(route.params.id)
   } catch(e) {
    
   } finally {
    loading.value = false
   }
 }

onMounted(() => {
    fetchOneNews()
})


</script>

<template>
  <div class="w-full p-10 pt-5">
    <div class="">
        <back-button/>
    </div>
    <template v-if="loading">
        <base-spinner/>
    </template>
    <!-- container -->
    <!-- <div class="bg-white w-full mt-5 rounded-[20px] p-8 pr-6 flex flex-nowrap justify-between gap-x-12"> -->
    <div v-else class="bg-white w-full mt-5 rounded-[20px] p-8 pr-6 grid grid-cols-[minmax(840px,_3fr)_minmax(300px,_1.5fr)] gap-x-12">
        <!-- right -->
        <div class="">
            <div class="min-w-[840px] h-[382px] rounded-2xl overflow-hidden">
                <img src="@/assets/img/news_detail.png" alt="rasm" class="w-full h-full">
            </div>
            <!-- info -->
            <div class="mt-4 flex justify-between">
                <!-- author -->
                <user-card :status="{id: 1, name: 'Новости'}"/>
                <div class="flex gap-3">
                        <!-- eyes -->
                        <circle-wrapper class="min-w-fit">
                            <div class="flex gap-1 items-center">
                                <div class="text-greyscale-400">
                                    <base-iconify :icon="EyeBoldIcon" />
                                </div>
                                <div class="text-xs font-medium text-greyscale-400">1,5k</div>
                            </div>
                        </circle-wrapper>
                        <!-- heart -->
                        <circle-wrapper>   
                            <div class="text-greyscale-400">
                                <base-iconify :icon="HeartBoldIcon" />
                            </div>
                        </circle-wrapper>
                        <!-- bookmark -->
                        <circle-wrapper>
                            <div class="text-greyscale-400">
                                <base-iconify :icon="BookmarkBoldIcon" />
                            </div>
                        </circle-wrapper>
                        <!-- forward icon-->
                        <circle-wrapper>
                            <div class="text-greyscale-400">
                                <base-iconify :icon="ForwardBoldIcon" />
                            </div>
                        </circle-wrapper>
                    </div>  
            </div>
            <!-- quetos -->
            <div class="mt-4">
                <Queto/>
            </div>

            <!-- swiper -->
            <div class="w-[840px]">
                <Swiper/>
            </div>

            <!-- tages -->
            <div class="flex flex-col gap-5">
                <h2 class="font-semibold text-2xl">Теги</h2>
                <div class="rounded-xl bg-greyscale-50 p-3 flex gap-2">
                    <tag text="#команда" class="cursor-pointer hover:text-primary-500" />
                </div>
            </div>
            <!-- conments -->
            <div class="">
                <!-- title -->
                <div class="mt-10 mb-5 flex items-center gap-2">
                    <h2 class="font-semibold text-2xl">Комментарии</h2>
                    <div class="w-8 h-8 min-w-8 min-h-8 text-base text-critic-500 bg-critic-30 rounded-full flex justify-center items-center font-semibold">3</div>
                </div>
                <!-- comment enter -->
                <Comment type="comment"/>
                <divider/>
                <Comment type="info"/>
                <Comment type="info">
                    <template #answer>
                        <divider class="mt-5"/>
                            <Comment type="info">
                                <template #answer>
                                    <divider class="mt-5"/>
                                    <Comment type="info"/>
                                </template>
                            </Comment>      
                    </template>
                </Comment>
                
            </div>
        </div>
        <!-- left -->
        <div class="">
            <h2 class="font-semibold text-lg text-greyscale-900">Похожие Новости</h2>
            <div class="flex flex-col gap-3 mt-3">
            <template v-for="a in 10" :key="a">
                <related-news-card/>
            </template>
            </div>
        </div>
    </div>
  </div>
</template>

<style></style>
