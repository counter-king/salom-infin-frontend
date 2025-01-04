<script setup>
// core
import { useI18n } from 'vue-i18n';
import { onMounted, reactive, ref, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// components
import BaseRadio from './BaseRadio.vue';
import Divider from '@/components/Divider/Divider.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseIconify from '@/components/UI/BaseIconify.vue';
import BaseSpinner from '@/components/UI/BaseSpinner.vue';
// icons
import { CloseCircleBoldIcon } from '@/components/Icons';
// services
import { getDateRange, popularityRadiosValues, timeRadiosValues } from '../constants';
// composables
import { useCategoryList } from '../composibles/useCategoryList';

const { t, locale} = useI18n()
const router  = useRouter()
const route  = useRoute()

const filterInitailValues = {
    category : Array.isArray(route.query.category)
    ? route.query.category.map(Number)
    : route.query.category
    ? [Number(route.query.category)]
    : [],
    ordering : route.query.ordering || null,
    time : route.query.time || null,
}
// reactive
const activeValues = reactive({...filterInitailValues })
const previosValues = reactive({...filterInitailValues})
const listContainer = ref(null)

const {loading: categoryListLoading, hasMoreLoading: hasMoreLoadingCategory, list: categoryList, getCategoryList, handleScrollCategory, initCategoryList } = useCategoryList(activeValues)



const handleClickActive = (key, value) => {
    if(previosValues[key] === value){
        activeValues[key] = null
        previosValues[key] = null
        router.replace({ name: 'NewsList', query: { ...router.currentRoute.value.query, [key]: undefined } });
    } else {
        activeValues[key] = value
        previosValues[key] = value
        router.replace({ name: 'NewsList', query: { ...router.currentRoute.value.query, [key]: value } });
    }
}

const handleClickCategory = (category, index) => {

    if(activeValues.category.includes(category.id)){
        activeValues.category = activeValues.category.filter(item => item !== category.id)
        categoryList.value.splice(index, 1)
        categoryList.value.splice(activeValues.category.length, 0, category) 
        router.replace({ name: 'NewsList', query: { ...router.currentRoute.value.query, category: activeValues.category } });
    } else {
        activeValues.category = [...activeValues.category, category.id]   
        categoryList.value.splice(index, 1)
        categoryList.value = [category,...categoryList.value]
        nextTick(() => {
            if (listContainer.value) {
                listContainer.value.scrollTop = 0
            }
         })
        router.replace({ name: 'NewsList', query: { ...router.currentRoute.value.query, category: activeValues.category } });
    }   
}

const handleClickTimeRadio = (id) => {

    if(previosValues.time === id) {
        activeValues.time = null
        previosValues.time = null
        router.replace({ name: 'NewsList', query: {...router.currentRoute.value.query, startDate: undefined, endDate: undefined, time: undefined } });
    } else {
        activeValues.time = id 
        previosValues.time = id
        router.replace({ name: 'NewsList', query: {...router.currentRoute.value.query, time: id, ...getDateRange(id)}});
    }
}

const handleClearRoute = () => {
    router.replace({ name: 'NewsList', query: { ...router.currentRoute.value.query, category: undefined, ordering: undefined, startDate: undefined, endDate: undefined, time: undefined } });
    Object.keys(activeValues).forEach(key => {
        if(key === 'category') {
            activeValues[key] = []
        } else{
            activeValues[key] = null
        }
        previosValues[key] = null

    });
}

// when category list initialize, activeValues url change accoring to exist values, if not exist category values in activeValues, then removed that values from activeValues
const handlingCategoryFilter = async () => {
   await initCategoryList()
   const filteredCategory = categoryList.value?.filter(item => activeValues.category.includes(item.id))
   categoryList.value = [...filteredCategory, ...categoryList.value.filter(item => !activeValues.category.includes(item.id))]
   activeValues.category = activeValues.category?.filter(item => categoryList.value.some(catrgory=> catrgory.id === item))
   router.replace({ name: 'NewsList', query: {...router.currentRoute.value.query, category: activeValues.category } });
}

watch(locale, async () => {
    await handlingCategoryFilter()
})

onMounted(async () => {   
    await handlingCategoryFilter()
});

</script>
<template>
 <div class="news-filter-bar-view w-full h-full overflow-y-auto bg-white flex flex-col gap-5 rounded-2xl p-6 ">
    <!-- categories -->
     <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-lg text-greyscale-900 select-none">{{ t('category') }}</h2>
            <div  ref="listContainer" @scroll="handleScrollCategory" class="flex flex-wrap gap-1 h-[200px] overflow-y-auto pr-2">
                <template v-if="categoryListLoading">
                    <base-spinner />  
                </template>
                <template v-else v-for="(category, index) in categoryList" :key="category.id">
                    <div 
                        @click="()=>handleClickCategory(category,index)" 
                        class="flex items-center justify-between gap-2 text-sm text-greyscale-900 font-medium  rounded-[32px] border border-[] px-3 py-2 bg-white cursor-pointer w-full  hover:text-primary-500  transition-all duration-300 active:scale-[0.98] select-none"
                        :class="{'!bg-primary-30 text-primary-500' : activeValues.category.includes(category.id) }"
                        >
                        <span>{{category.name}}</span>
                        <BaseIconify 
                            v-if="activeValues.category.includes(category.id)"
                            :icon="CloseCircleBoldIcon"
                        />
                    </div>
                </template>
                <div v-if="hasMoreLoadingCategory" class="flex justify-center items-center h-[40px] w-full">
                    <base-spinner />  
                </div>
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
                    @click.prevent="handleClickActive('ordering', item.id)"
                    v-model="activeValues.ordering"
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
    </div>
    <!-- clear filter button -->
    <base-button    
        @click="handleClearRoute"
        buttonClass="mt-auto !p-4  w-full flex justify-center items-center text-xs font-medium text-greyscale-900 rounded-[90px] border-greyscale-70 border bg-greyscale-50"
        label="clear"
    />
 </div> 
</template>