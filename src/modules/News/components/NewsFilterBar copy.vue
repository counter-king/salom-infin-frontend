<script setup>
// core
import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';
// components
import { useRouter } from 'vue-router';
import BaseRadio from './BaseRadio.vue';
import Divider from '@/components/Divider/Divider.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
// services
import { fetchGetNewsCategoryList } from '../services/news.service';
import { popularityRadiosValues, socialPartitipationRadiosValues, timeRadiosValues } from '../constants';

const { t } = useI18n()
const router  = useRouter()
// reactive
const activeValues = {
    categoryId : ref(null),
    popularity : ref(null),
    time : ref(null),
    social : ref(null),
}

const previosValues = {
    categoryId : ref(null),
    popularity : ref(null),
    time : ref(null),
    social : ref(null),
}

const categoryList = ref([])
// const activeCategory = ref(null)
// const activePrviosCategory = ref(null)
// const activePopularityRadio = ref(null)
// const activePrviosPopularity = ref(null)
// const activeTimeRadio = ref(null)
// const activePrviosTimeRadio = ref(null)
// const activeSocialRadio = ref(null)
// const activePrviosSocialRadio = ref(null)

// const handleClickcategory = (id) => {

//     if(activePrviosCategory.value === id){
//         activeCategory.value = null
//         activePrviosCategory.value = null
//         router.replace({ name: 'NewsIndex', query: { ...router.currentRoute.value.query, categoryId: undefined } });
//     } else{
//         activeCategory.value = id
//         activePrviosCategory.value = id
//         router.replace({ name: 'NewsIndex', query: { ...router.currentRoute.value.query, categoryId: id } });
//     }
// }

// const handleClickPopularityRadio = (id) => {

//     if(activePrviosPopularity.value === id){
//         activePopularityRadio.value = null
//         activePrviosPopularity.value = null
//         router.replace({ name: 'NewsIndex', query: {...router.currentRoute.value.query, popularity: undefined } });
//     } else {
//         activePopularityRadio.value = id 
//         activePrviosPopularity.value = id
//         router.replace({ name: 'NewsIndex', query: {...router.currentRoute.value.query, popularity: id } });
//     }
// }

// const handleClickTimeRadio = (id) => {
//     if(activePrviosTimeRadio.value === id){
//         activeTimeRadio.value = null
//         activePrviosTimeRadio.value = null
//         router.replace({ name: 'NewsIndex', query: {...router.currentRoute.value.query, time: undefined } });
//     } else {
//         activeTimeRadio.value = id 
//         activePrviosTimeRadio.value = id
//         router.replace({ name: 'NewsIndex', query: {...router.currentRoute.value.query, time: id } });
//     }
// }

// const handleClickSocialRadio = (id) => {
//     if(activePrviosSocialRadio.value === id){
//         activeSocialRadio.value = null
//         activePrviosSocialRadio.value = null
//         router.replace({ name: 'NewsIndex', query: {...router.currentRoute.value.query, social_participation: undefined } });
//     } else {
//         activeSocialRadio.value = id 
//         activePrviosSocialRadio.value = id
//         router.replace({ name: 'NewsIndex', query: {...router.currentRoute.value.query, social_participation: id } });
//     }
// }

const handleClick = (key, value) => {
    const active = activeValues[key];
    const previos = previosValues[key];
    if(previos.value === value){
        active.value = null
        previos.value = null
        router.replace({ name: 'NewsIndex', query: { ...router.currentRoute.value.query, [key]: undefined } });
    } else {
        active.value = value
        previos.value = value
        router.replace({ name: 'NewsIndex', query: { ...router.currentRoute.value.query, [key]: value } });
    }
}

onMounted(async() => {   
   const {data} = await fetchGetNewsCategoryList({page_size: 200})    
   categoryList.value = data.results
});

</script>
<template>
 <div class="news-filter-bar-view bg-white h-full w-full flex flex-col gap-5 rounded-2xl p-6">
    <!-- categories -->
     <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-lg text-greyscale-900 select-none">{{ t('category') }}</h2>
            <div class="flex flex-wrap gap-3">
            <template v-for="category in categoryList" :key="category.id">
                <div @click="()=>handleClick('categoryId', category.id)" 
                    class="text-sm text-greyscale-900 font-medium  rounded-[32px] border border-[] px-3 py-2 bg-white cursor-pointer w-fit  hover:text-primary-500  transition-all duration-300 active:scale-[0.98] select-none"
                    :class="{'!bg-primary-30 text-primary-500' : activeValues.categoryId.value === category.id }"
                    >
                    {{category.name}}
                </div>
            </template>
            </div>
        </div>
        <divider class="!border-[#E7EAEE]"/>
    </div>
    <!-- Popularity -->
    <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-lg text-greyscale-900 select-none">{{ t('popularity') }}</h2>
            <div class="flex flex-col gap-3">
                <tempalte v-for="item in popularityRadiosValues" :key="item.id">
                  <base-radio
                    @click.prevent="handleClick('popularity', item.id)"
                    v-model="activeValues.popularity.value"
                    :name="item.id"
                    :value="item.id"
                    :label="item.title"
                    :inputId="item.id+item.title"
                  />
                </tempalte>
            </div>
        </div>
        <divider class="!border-[#E7EAEE]"/>
    </div>
     <!-- time -->
     <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-lg text-greyscale-900 select-none">{{ t('time') }}</h2>
            <div class="flex flex-col gap-3">
                <tempalte v-for="item in timeRadiosValues" :key="item.id">
                  <base-radio
                    @click.prevent="handleClick('time', item.id)"
                    v-model="activeValues.time.value"
                    :name="item.id"
                    :value="item.id"
                    :label="item.title"
                    :inputId="item.id+item.title"
                  />
                </tempalte>
            </div>
        </div>
        <divider class="!border-[#E7EAEE]"/>
    </div>
      <!-- social-participation -->  
    <div class="flex flex-col gap-3">
        <h2 class="font-semibold text-lg text-greyscale-900 select-none">{{ t('social-participation') }}</h2>
        <div class="flex flex-col gap-3">
            <tempalte v-for="item in socialPartitipationRadiosValues" :key="item.id">
                <base-radio
                @click.prevent="handleClick('social', item.id)"
                v-model="activeValues.social.value"
                :name="item.id"
                :value="item.id"
                :label="item.title"
                :inputId="item.id + item.title"
                />
            </tempalte>
        </div>
    </div>
    <!-- clear filter button -->
    <base-button
        buttonClass="mt-6 w-full p-4 flex justify-center items-center text-xs font-medium text-greyscale-900 rounded-[90px] border-greyscale-70 border bg-greyscale-50"
        label="clear"
    />
 </div> 
</template>