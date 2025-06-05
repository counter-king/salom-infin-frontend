<script setup>
// Core
import { useDebounce } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
// Components
import BackButton from '@/components/Actions/BackButton.vue';
import CircleWrapper from '../components/show/CircleWrapper.vue';
import Swiper from '../components/Swiper.vue';
import ViewReplayComment from '../components/show/ViewReplayComment.vue';
import MainFileShow from '../components/MainFileShow.vue';
import TitleComponent from '../components/Title.vue';
import UserCard from '../components/UserCard.vue';
import Queto from '../components/Queto.vue';
import Tag from '../components/Tag.vue';
import TheFooter from '@/components/TheFooter.vue';
import ShortDescription from '../components/ShortDescription.vue';
import RejectNewsDialog from '../components/RejectNewsDialog.vue';
import NewsModerationHistory from '../components/NewsModerationHistory.vue';
// icons
import BaseIconify from '@/components/UI/BaseIconify.vue';
import { EyeBoldIcon, HeartBoldIcon } from '@/components/Icons';
// services
import { fetchCreateNewsComment, fetchCreateNewsLike, fetchCreateNewsModerationHistory, fetchGetMyNews, fetchGetNewsCommentList, fetchGetNewsModerationHistoryList, fetchModerationApproveNews,fetchGetPendingNews } from '../services/news.service';
import { fetchBlobFile } from '../../../services/file.service';
// store
import { useCountStore } from '@/stores/count.store'
// utils
import { formatToK } from '@/utils';
import { dispatchNotify } from '@/utils/notify';
// constants
import { CONTENT_TYPES, EOMOJI_TYPES } from '../constants';
import { COLOR_TYPES } from '@/enums';
import { NEWS_STATUS } from '../enums';

const  { t } = useI18n()
const  route = useRoute()
const  router = useRouter()
// composibles
const countStore = useCountStore()
// reactive 
const loading = ref(false)
const newsOne = ref({})
const viewHeartIsLike = ref(false)
const viewHeartLikeCounts = ref(0)
const debunceTrackinLike = ref(null)
const commentValue = ref('')
const newCommentList = ref([])
const isRejectModalVisible = ref(false)
const isLoadingModeration = ref(false)
const isLoadingRejectModeration = ref(false)
const activeTabPanel = ref("history")
const newsModerationHistoryList = ref([])
const newsModerationHistoryListLoading = ref(false)
const newsCommentsLoading = ref(false)
// reactive
const type = computed(() => route.params.type)
const newsId = computed(() => route.params.id)
// methods
const fetchOneNews = async() => {
   loading.value = true
   try {

       const { data }  = await fetchGetMyNews(route.params.id)   
       const { blobUrl } = await fetchBlobFile(data.image.id)
       data.image.blobUrl = blobUrl

       data.contents = await Promise.all(data.contents.map(async(item) => {
        if([CONTENT_TYPES.AUDIO, CONTENT_TYPES.VIDEO, CONTENT_TYPES.IMAGE].includes(item.type)){
            const { blobUrl } = await fetchBlobFile(item.file?.id)
            item.file.blobUrl = blobUrl
            return item
        } else {
           return item
        }
       }))

       data.galleries = await Promise.all(data.galleries.map(async(item) => {
        const { blobUrl } = await fetchBlobFile(item.id)
        item.blobUrl = blobUrl
        return item
       }))

       newsOne.value = data
       viewHeartIsLike.value = data.is_liked
       viewHeartLikeCounts.value = data.like_counts 

   } catch(e) {
    dispatchNotify(null, e?.message, COLOR_TYPES.ERROR)
   } finally {
    loading.value = false
   }
}

const fetchOnePendingNews = async() => {
   loading.value = true
   try {

       const { data }  = await fetchGetPendingNews(route.params.id)   
       const { blobUrl } = await fetchBlobFile(data.image.id)
       data.image.blobUrl = blobUrl

       data.contents = await Promise.all(data.contents.map(async(item) => {
        if([CONTENT_TYPES.AUDIO, CONTENT_TYPES.VIDEO, CONTENT_TYPES.IMAGE].includes(item.type)){
            const { blobUrl } = await fetchBlobFile(item.file?.id)
            item.file.blobUrl = blobUrl
            return item
        } else {
           return item
        }
       }))

       data.galleries = await Promise.all(data.galleries.map(async(item) => {
        const { blobUrl } = await fetchBlobFile(item.id)
        item.blobUrl = blobUrl
        return item
       }))

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

const handleReplayComment = async (value, replayId) => {
    try {
     await fetchCreateNewsComment({news: route.params.id, comment: value, replied_to: replayId})
     getNewCommentList()
    } catch (error) {
        dispatchNotify(null, e?.message, COLOR_TYPES.ERROR)
    }
}

//methods
const getNewCommentList =  async () =>{
    newsCommentsLoading.value = true
    try {
        const { data } = await fetchGetNewsCommentList({news: route.params?.id})
        newCommentList.value = data.results
    } finally {
        newsCommentsLoading.value = false
    }
}

const getNewsModerationHistoryList = async () => {{
    newsModerationHistoryListLoading.value = true
    try {
        const { data } = await fetchGetNewsModerationHistoryList({news: route.params?.id})
        newsModerationHistoryList.value = data.results
    }
    finally{
        newsModerationHistoryListLoading.value = false
    }
}}

const handleModerationApprove = async () => {
  isLoadingModeration.value = true
  try {
    await fetchCreateNewsModerationHistory({ news: newsId.value, status: NEWS_STATUS.PUBLISHED, description: null })
    await fetchModerationApproveNews(newsId.value, { status: NEWS_STATUS.PUBLISHED })
    countStore.actionCountList()
  }
  catch(e){
    dispatchNotify(null, e?.message, COLOR_TYPES.ERROR)
  }
  finally{
    isLoadingModeration.value = false
    router.push({ name: 'NewsModerationList', query: { activeMenu: 'for-moderation' } })
  }
}

const handleRejectModeration = async (reason) => {
    isLoadingRejectModeration.value = true
  try {
    await fetchCreateNewsModerationHistory({ news: newsId.value, status: NEWS_STATUS.DECLINED, description: reason })
    await fetchModerationApproveNews(newsId.value, {cancelled_reason: reason, status: NEWS_STATUS.DECLINED})
    countStore.actionCountList()
  } 
  catch(e){
    dispatchNotify(null, e?.message, COLOR_TYPES.ERROR)
  }
  finally{
    isLoadingRejectModeration.value = false
    isRejectModalVisible.value = false
    router.push({ name: 'NewsModerationList', query: { activeMenu: 'for-moderation' } })
  }
}

const handleRejectModerationDialog = async () => {
  isRejectModalVisible.value = true
}

const fetchAllApi = async () => {
    if(type.value === 'show'){
        await fetchOneNews()
    } else {
        await fetchOnePendingNews()
    }
    await getNewCommentList()
    await getNewsModerationHistoryList()
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
  <div class="flex grow flex-col p-10 pt-5 pb-2">
    <div class="w-full grow">
        <div class="mx-auto w-[904px]" :class="{'h-full': loading}">
            <div class="back-button">
                <back-button />
            </div>
            <template v-if="loading" class="w-full h-full">
                <base-spinner/>
            </template>
            <!-- container -->
            <div  
                v-else
                class="bg-white h-full  mt-5 rounded-[20px] p-8 pb-10 flex flex-col"
                :class="{ 'rounded-b-none pb-0': type === 'moderation' }"
                >
                <div
                :style="{ '--dynamic-src': `url(${newsOne.image?.url ? newsOne.image?.url : newsOne.image?.blobUrl})` }"
                class="aspect-ratio-box rounded-2xl overflow-hidden relative" 
                >
                    <img :src="newsOne.image?.url ? newsOne.image?.url : newsOne.image?.blobUrl" alt="rasm" class="w-full h-full object-contain absolute z-2">
                </div>
                <!-- info -->
                <div class="mt-4 flex justify-between">
                    <!-- author -->
                    <user-card 
                        :name="newsOne.created_by?.full_name"
                        :category="newsOne.category"
                        :created-date="newsOne.created_date"
                        :avatar-color="newsOne.created_by?.color"
                        :avatar-image="newsOne.created_by?.avatar?.url"
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
                        <!-- <circle-wrapper @click="shareDialogVisible = true" class="min-w-fit">
                            <div class="text-greyscale-400">
                                <base-iconify :icon="ForwardBoldIcon" />
                            </div>
                        </circle-wrapper> -->
                    </div>  
                </div>
                <!-- contents -->
                <title-component :title="newsOne.title" class="mt-4 mb-5"/>
                <short-description wrap-class="text-greyscale-800 text-xl !mt-0" :text="newsOne.description"/>
                <template v-for="(content, index) in newsOne.contents" :key="content.id">
                    <div v-if="content.type === CONTENT_TYPES.TEXT" v-html="content.content" class="mt-4 text-greyscale-800"></div>
                    <div v-if="content.type === CONTENT_TYPES.QUOTE" >
                        <queto :text="content.content" class="my-10"/>
                    </div>
                    <div v-if="[CONTENT_TYPES.IMAGE,CONTENT_TYPES.AUDIO, CONTENT_TYPES.VIDEO].includes(content.type)">
                        <main-file-show :file="{...content.file, type: content.type}" class="mt-3"/>
                    </div>
                </template>
                <Swiper v-if="!!newsOne.galleries?.length" :images="newsOne.galleries" />
                <Tag v-if="!!newsOne.tags?.length" :tags="newsOne.tags" class="pointer-events-none"/> 
                <!-- conments and history -->
                <div class="">
                    <!-- activeTabPanel titles -->
                    <div class="flex gap-8">
                        <div @click="activeTabPanel = 'comment'" class="mt-10 mb-5 flex items-center gap-2 cursor-pointer">
                            <h2 
                                class="font-semibold text-2xl text-greyscale-300"
                                :class="{'text-greyscale-900': activeTabPanel === 'comment'}"
                            >{{ t("comments") }}</h2>
                            <div 
                                class="w-8 h-8 min-w-8 min-h-8 text-base text-greyscale-300 bg-greyscale-50 rounded-full flex justify-center items-center font-semibold"
                                :class="{'!text-critic-500 !bg-critic-30': activeTabPanel === 'comment'}"

                            >{{ newCommentList.length}}</div>
                        </div>
                        <div @click="activeTabPanel = 'history'" class="mt-10 mb-5 flex items-center gap-2 cursor-pointer">
                            <h2 
                                class="font-semibold text-2xl text-greyscale-300"
                                :class="{'text-greyscale-900': activeTabPanel === 'history'}" 
                                >{{ t("history") }}</h2>
                            <div 
                                class="w-8 h-8 min-w-8 min-h-8 text-base text-greyscale-300 bg-greyscale-50 rounded-full flex justify-center items-center font-semibold"
                                :class="{'!text-critic-500 !bg-critic-30': activeTabPanel === 'history'}"
                                >{{ newsModerationHistoryList.length}}</div>
                        </div>    
                    </div>
                    <!-- comment enter -->
                    <template v-if="activeTabPanel === 'comment'">
                        <template v-if="newsCommentsLoading" class="w-full h-full">
                            <base-spinner/>
                        </template>
                        <template v-else>
                            <view-replay-comment 
                                v-for="(comment,index) in newCommentList" :key="comment.id"
                                :replay-button-visible="false"
                                @emit:replay-comment="handleReplayComment" 
                                :data="comment"
                                :isDiveiderVisible="newCommentList.length != index + 1"
                            />
                        </template>
                    </template>
                    <template v-if="activeTabPanel === 'history'">
                        <template v-if="newsModerationHistoryListLoading" class="w-full h-full">
                            <base-spinner/>
                        </template>
                        <template v-else>
                            <NewsModerationHistory 
                                v-for="(history, index) in newsModerationHistoryList"
                                :key="history.id"
                                :data="history"
                                :isDividerVisible="newsModerationHistoryList.length != index + 1"
                            />
                        </template>
                       
                    </template>
                </div>
            </div>
            <!-- container-bottom -->
            <div v-if="type === 'moderation' && newsOne.status === NEWS_STATUS.PANDING && !loading"
                class="news-details py-4 px-6 flex gap-3 bg-greyscale-50 rounded-b-[20px] justify-end"
                >
                <base-button
                    :disabled="isLoadingModeration"
                    label="refuse"
                    rounded
                    outlined
                    shadow
                    color="!text-critic-500"
                    border-color="border-transparent"
                    @click="handleRejectModerationDialog"
                />
                <base-button
                    :loading="isLoadingModeration"
                    label="publish"
                    rounded
                    shadow
                    @click="handleModerationApprove"
                />
            </div>
        </div>
    </div>
    <div class="mt-6 mx-auto w-[904px]">
        <the-footer/>
    </div>
    <reject-news-dialog  
      header-lable="reject-news-reason"
      v-model="isRejectModalVisible"
      :createButtonFn="handleRejectModeration"
      :loading="isLoadingRejectModeration"
       max-width="max-w-[700px]"
      />
  </div>
</template>

<style scoped>
.aspect-ratio-box {
    aspect-ratio: 3 / 2
}

.aspect-ratio-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;  
  width: 100%;
  height: 100%;
  background-image: var(--dynamic-src);
  background-size: cover;
  filter: blur(10px);
  background-position: center; 
  z-index: 0;
}
.news-details {
  box-shadow: 0px 2px 4px 0px rgba(47, 61, 87, 0.03), 0px 1px 1px 0px rgba(95, 110, 169, 0.03);
}
</style>
