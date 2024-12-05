<script setup>
// Core
import { useDebounce } from '@vueuse/core';
import { ref, watch } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
// Components
import BackButton from '@/components/Actions/BackButton.vue';
import CircleWrapper from '../components/show/CircleWrapper.vue';
import RelatedNewsCard from '../components/show/RelatedNewsCard.vue';
import Swiper from '../components/Swiper.vue';
import ViewReplayComment from '../components/show/ViewReplayComment.vue';
import SendComment from '../components/show/SendComment.vue';
import Divider from '@/components/Divider';
import MainFileShow from '../components/MainFileShow.vue';
import TitleComponent from '../components/Title.vue';
import UserCard from '../components/UserCard.vue';
import Queto from '../components/Queto.vue';
import Tag from '../components/Tag.vue';
// icons
import BaseIconify from '@/components/UI/BaseIconify.vue';
import { BookmarkBoldIcon, EyeBoldIcon, ForwardBoldIcon, HeartBoldIcon } from '@/components/Icons';
// services
import { fetchCreateNewsComment, fetchCreateNewsLike, fetchGetNews, fetchGetNewsCommentList, fetchGetNewsList } from '../services/news.service';
// utils
import { formatToK } from '@/utils';
import { dispatchNotify } from '@/utils/notify';
// constants
import { CONTENT_TYPES, EOMOJI_TYPES } from '../constants';
import { COLOR_TYPES } from '@/enums';
// stores
import { useAuthStore } from '@/modules/Auth/stores';
const  { t } = useI18n()
const  route = useRoute()
const  router = useRouter()
// reactive 
const loading = ref(false)
const newsOne = ref({})
const viewHeartIsLike = ref(false)
const viewHeartLikeCounts = ref(0)
const debunceTrackinLike = ref(null)
const commentButtonLoading = ref(false)
const commentValue = ref('')
const newCommentList = ref([])
const authStore = useAuthStore()
const relatedNewsList = ref([])

// methods
const fetchOneNews = async() => {
   loading.value = true
   try {
       const { data }  = await fetchGetNews(route.params.id)       
       newsOne.value = data
       viewHeartIsLike.value = data.is_liked
       viewHeartLikeCounts.value = data.like_counts 
   } catch(e) {
    dispatchNotify(null, e?.message, COLOR_TYPES.ERROR)
   } finally {
    loading.value = false
   }
 }

 /* user click like, dislike operation */
const handleClickLike = async() => {
    // user click like, optimitic update 
    viewHeartIsLike.value = !viewHeartIsLike.value
    viewHeartLikeCounts.value = viewHeartIsLike.value ? viewHeartLikeCounts.value + 1 : viewHeartLikeCounts.value - 1
    debunceTrackinLike.value = viewHeartIsLike.value
}

const debouncedUserClickLike = useDebounce(debunceTrackinLike, 750)

watch(debouncedUserClickLike, async() => {
    try{
    await fetchCreateNewsLike({news: route.params.id, emoji:viewHeartIsLike.value ? EOMOJI_TYPES.LIKE : null})
    } catch(e){
        dispatchNotify(null, e?.message, COLOR_TYPES.ERROR)
    }   
})
/* user click like, dislike operation */

/* comments methods */
const handleSendComment = async ()=>{
    commentButtonLoading.value = true
    try {
        await fetchCreateNewsComment({news: route.params.id, comment: commentValue.value})
        commentValue.value = ''
    } catch (error) {
        dispatchNotify(null, e?.message, COLOR_TYPES.ERROR)
    } finally {
        commentButtonLoading.value = false
    }
}
const handleReplayComment = async (value, replayId) => {
    try {
     await fetchCreateNewsComment({news: route.params.id, comment: value, replied_to: replayId})
     getNewCommentList()
    } catch (error) {
        dispatchNotify(null, e?.message, COLOR_TYPES.ERROR)
    }
}
/* comments methods */

const getNewCommentList =  async () =>{
   const { data } = await fetchGetNewsCommentList({news: route.params?.id})
   newCommentList.value = data.results
}

const getRelatedNewsList =  async (page = 1) =>{
   const { data } = await fetchGetNewsList({
    tags: newsOne.value.tags.map(item => item.id).join(','), 
    exclude_id: route.params.id, 
    page: page, 
    page_size: 50})

    relatedNewsList.value = data.results
}


const fetchAllApi = async () => {
    await fetchOneNews()
    await getNewCommentList()
    await getRelatedNewsList()
}

watch(() => route.params.id, async(newsId) => {
    if(newsId){
        await fetchAllApi() 
    }
})

watch(() => commentValue.value, async() => {
    await getNewCommentList()
})

onMounted( async () => {
    await fetchAllApi()
})


</script>

<template>
  <div class="w-full p-10 pt-5">
    <div class="back-button">
        <back-button 
        :self="true" 
        @click="router.push({name:'NewsIndex'})"/>
    </div>
    <template v-if="loading">
        <base-spinner/>
    </template>
    <!-- container -->
    <div v-else class="bg-white w-full h-full mt-5 rounded-[20px] p-8 pr-6 grid grid-cols-[minmax(850px,_3fr)_minmax(300px,_1.5fr)] gap-x-10">
        <!-- right -->
        <div class="overflow-y-auto pr-1 pb-3">
            <div class="min-w-[840px] w-[840px] h-[382px] rounded-2xl overflow-hidden">
                <img :src="newsOne.image?.url" alt="rasm" class="w-full h-full object-cover">
            </div>
            <!-- info -->
            <div class="mt-4 flex justify-between max-w-[840px]">
                <!-- author -->
                <user-card 
                    :name="newsOne.created_by?.full_name"
                    :category="newsOne.category"
                    :created-date="newsOne.created_date"
                    :avatar-color="newsOne.created_by?.color"
                    />
                <div class="flex gap-3">
                    <!-- eyes -->
                    <circle-wrapper class="min-w-fit">
                        <div class="flex gap-1 items-center">
                            <div class="text-greyscale-400">
                                <base-iconify :icon="EyeBoldIcon" />
                            </div>
                            <div class="text-xs font-medium text-greyscale-400 select-none">
                                {{ newsOne.view_counts && formatToK(newsOne.view_counts) }}
                            </div>
                        </div>
                    </circle-wrapper>
                    <!-- heart -->
                    <circle-wrapper @click="handleClickLike" :class="`min-w-fit ${viewHeartIsLike && '!bg-critic-30'}`">   
                        <div class="flex gap-1 items-center">
                            <div class="text-greyscale-400" :class="`${viewHeartIsLike && '!text-critic-500'}`">
                                <base-iconify :icon="HeartBoldIcon" />
                            </div>
                            <div class="text-xs font-medium text-greyscale-400 select-none">
                                {{ viewHeartLikeCounts && formatToK(viewHeartLikeCounts) }}
                            </div>
                        </div>
                    </circle-wrapper>
                    <!-- bookmark -->
                    <!-- <circle-wrapper class="min-w-fit">
                        <div class="text-greyscale-400">
                            <base-iconify :icon="BookmarkBoldIcon" />
                        </div>
                    </circle-wrapper> -->
                    <!-- forward icon-->
                    <!-- <circle-wrapper class="min-w-fit">
                        <div class="text-greyscale-400">
                            <base-iconify :icon="ForwardBoldIcon" />
                        </div>
                    </circle-wrapper> -->
                </div>  
            </div>

            <!-- contents -->
            <title-component :title="newsOne.title" class="mt-4 mb-5"/>
            <div v-html="newsOne.description"></div>
            <template v-for="(content, index) in newsOne.contents" :key="content.id">
                <div v-if="content.type === CONTENT_TYPES.TEXT" v-html="content.content" class="mt-4"></div>
                <div v-if="content.type === CONTENT_TYPES.QUOTE" >
                    <queto :text="content.content" class="my-10"/>
                </div>
                <div v-if="[CONTENT_TYPES.IMAGE,CONTENT_TYPES.AUDIO, CONTENT_TYPES.VIDEO].includes(content.type)">
                    <main-file-show :file="{...content.file, type: content.type}" class="mt-3"/>
                </div>
            </template>
            <Swiper v-if="!!newsOne.galleries?.length" :images="newsOne.galleries" />
            <Tag v-if="!!newsOne.tags?.length" :tags="newsOne.tags" /> 

            <!-- conments -->
            <div class="">
                <!-- title -->
                <div class="mt-10 mb-5 flex items-center gap-2">
                    <h2 class="font-semibold text-2xl">{{ t("comments") }}</h2>
                    <div class="w-8 h-8 min-w-8 min-h-8 text-base text-critic-500 bg-critic-30 rounded-full flex justify-center items-center font-semibold">{{ newCommentList.length}}</div>
                </div>
                <!-- comment enter -->
                <send-comment 
                    @emit:submit-comment="handleSendComment" 
                    type="comment"
                    :isButtonLoading="commentButtonLoading"
                        v-model="commentValue"
                    :data="{created_by: authStore.currentUser}"
                />
                <divider/>
                <template v-for="(comment,index) in newCommentList" :key="comment.id">
                    <view-replay-comment 
                        @emit:replay-comment="handleReplayComment" 
                        :data="comment"
                        :isDiveiderVisible="newCommentList.length != index + 1"
                        />
                </template>
            </div>
        </div>
        <!-- left -->
        <div class="overflow-y-auto pr-1 pb-3" @scroll="handleScroll">
            <h2 class="font-semibold text-lg text-greyscale-900">{{t('similar-news')}}</h2>
            <div class="flex flex-col gap-3 mt-3">
            <template v-for="news in relatedNewsList" :key="news.id">
                <related-news-card :news="news"/>
            </template>
            </div>
        </div>
    </div>
  </div>
</template>

<style></style>
