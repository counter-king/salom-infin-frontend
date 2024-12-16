<script setup>
// core
import { useI18n } from 'vue-i18n';
import { onMounted, reactive, ref } from 'vue';
// components
import { useRoute, useRouter } from 'vue-router';
import BaseRadio from './BaseRadio.vue';
import Divider from '@/components/Divider/Divider.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
// services
import { fetchGetNewsCategoryList } from '../services/news.service';
import { getDateRange, popularityRadiosValues, socialPartitipationRadiosValues, timeRadiosValues } from '../constants';

const { t } = useI18n()
const router  = useRouter()
const route  = useRoute()

const filterInitailValues = {
    category : route.query.category || null,
    popularity : route.query.popularity || null,
    time : route.query.time || null,
    socialAttendance : route.query.socialAttendance || null,
}
// reactive
const activeValues = reactive({...filterInitailValues })

const previosValues = reactive({...filterInitailValues})

const categoryList = ref([])

const handleClickActive = (key, value) => {
    if(previosValues[key] === value){
        activeValues[key] = null
        previosValues[key] = null
        router.replace({ name: 'NewsIndex', query: { ...router.currentRoute.value.query, [key]: undefined } });
    } else {
        activeValues[key] = value
        previosValues[key] = value
        router.replace({ name: 'NewsIndex', query: { ...router.currentRoute.value.query, [key]: value } });
    }
}

const handleClickTimeRadio = (id) => {

    if(previosValues.time === id){
        activeValues.time = null
        previosValues.time = null
        router.replace({ name: 'NewsIndex', query: {...router.currentRoute.value.query, startDate: undefined, endDate: undefined, time: undefined } });
    } else {
        activeValues.time = id 
        previosValues.time = id
        router.replace({ name: 'NewsIndex', query: {...router.currentRoute.value.query, time: id, ...getDateRange(id)}});
    }
}

const handleClearRoute = () => {
    router.replace({ name: 'NewsIndex', query: {} });
    Object.keys(activeValues).forEach(key => {
        activeValues[key] = null
        previosValues[key] = null
    });
}

onMounted(async() => {   
   const {data} = await fetchGetNewsCategoryList({page_size: 200})    
   categoryList.value = data.results
});

</script>
<template>
 <div class="news-filter-bar-view bg-white w-full flex flex-col gap-5 rounded-2xl p-6">
    <!-- categories -->
     <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-lg text-greyscale-900 select-none">{{ t('category') }}</h2>
            <div class="flex flex-wrap gap-3">
            <template v-for="category in categoryList" :key="category.id">
                <div @click="()=>handleClickActive('category', category.id)" 
                    class="text-sm text-greyscale-900 font-medium  rounded-[32px] border border-[] px-3 py-2 bg-white cursor-pointer w-fit  hover:text-primary-500  transition-all duration-300 active:scale-[0.98] select-none"
                    :class="{'!bg-primary-30 text-primary-500' : activeValues.category === category.id }"
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
                <template v-for="item in popularityRadiosValues" :key="item.id">
                  <base-radio
                    @click.prevent="handleClickActive('popularity', item.id)"
                    v-model="activeValues.popularity"
                    :name="item.id"
                    :value="item.id"
                    :label="item.title"
                    :inputId="item.id+item.title"
                  />
                </template>
            </div>
        </div>
        <divider class="!border-[#E7EAEE]"/>
    </div>
     <!-- time -->
     <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-lg text-greyscale-900 select-none">{{ t('time') }}</h2>
            <div class="flex flex-col gap-3">
                <template v-for="item in timeRadiosValues" :key="item.id">
                  <base-radio
                    @click.prevent="handleClickTimeRadio(item.id)"
                    v-model="activeValues.time"
                    :name="item.id"
                    :value="item.id"
                    :label="item.title"
                    :inputId="item.id+item.title"
                  />
                </template>
            </div>
        </div>
        <divider class="!border-[#E7EAEE]"/>
    </div>
      <!-- social-participation -->  
    <div class="flex flex-col gap-3">
        <h2 class="font-semibold text-lg text-greyscale-900 select-none">{{ t('social-participation') }}</h2>
        <div class="flex flex-col gap-3">
            <template v-for="item in socialPartitipationRadiosValues" :key="item.id">
                <base-radio
                @click.prevent="handleClickActive('socialAttendance', item.id)"
                v-model="activeValues.socialAttendance"
                :name="item.id"
                :value="item.id"
                :label="item.title"
                :inputId="item.id + item.title"
                />
            </template>
        </div>
    </div>
    <!-- clear filter button -->
    <base-button    
        @click="handleClearRoute"
        buttonClass="mt-6 w-full p-4 flex justify-center items-center text-xs font-medium text-greyscale-900 rounded-[90px] border-greyscale-70 border bg-greyscale-50"
        label="clear"
    />
 </div> 
</template>