<script setup>
// Core

// Components
import BackButton from '@/components/Actions/BackButton.vue';
import CircleWrapper from '../components/CircleWrapper.vue';
import { StatusChip } from '@/components/Chips';
import RelatedNewsCard from '../components/RelatedNewsCard.vue';
import Swiper from '../components/Swiper.vue';
import Tag from '../components/Tag.vue';
import BaseAvatar from '@/components/UI/BaseAvatar.vue';
import Comment from '../components/Comment.vue';
import Divider from '@/components/Divider';

// icons
import BaseIconify from '@/components/UI/BaseIconify.vue';
import { BookmarkBoldIcon, EyeBoldIcon, EyeLinearIcon, ForwardBoldIcon, HeartBoldIcon } from '@/components/Icons';


</script>

<template>
  <div class="w-full p-10 pt-5">
  <div class="">
    <back-button/>
  </div>
  <!-- container -->
  <!-- <div class="bg-white w-full mt-5 rounded-[20px] p-8 pr-6 flex flex-nowrap justify-between gap-x-12"> -->
  <div class="bg-white w-full mt-5 rounded-[20px] p-8 pr-6 grid grid-cols-[minmax(840px,_3fr)_minmax(300px,_1.5fr)] gap-x-12">
    <!-- right -->
    <div class="">
        <div class="min-w-[840px] h-[382px] rounded-2xl overflow-hidden">
            <img src="@/assets/img/news_detail.png" alt="rasm" class="w-full h-full">
        </div>
        <!-- info -->
        <div class="mt-4 flex justify-between">
            <!-- author -->
            <div class="flex items-center gap-3">
                <base-avatar
                    label="A"
                    color="border-greyscale-300"
                    avatarClasses="w-10 h-10 cursor-pointer border-greyscale-70 border"
                >
                    <span class="text-xl font-semibold text-white">{{ 'A' }}</span>
                </base-avatar>
                <div class="flex gap-[2px] flex-col">
                    <h3 class="text-base font-semibold text-greyscale-900">Brooklyn Simmons Eduard</h3>
                    <p class="text-sm text-greyscale-500 font-regular font-normal" >28 ноября 2024 г.</p>
                </div>
                
                <status-chip :status="{name: 'Новости', id: 1}" root-class="!text-xs !font-semibold !rounded-md self-start">
                    Новости
                </status-chip>
                
            </div>

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

        <!-- swiper -->
        <div class="w-[840px]">
            <Swiper/>
        </div>

        <!-- tages -->
        <div class="flex flex-col gap-5">
            <h2 class="font-semibold text-2xl">Теги</h2>
            <div class="rounded-xl bg-greyscale-50 p-3 flex gap-2">
                <tag text="#команда" />
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
