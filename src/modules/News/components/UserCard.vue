<script setup>

// Components
import { NewsCategory } from '@/components/Chips';
import { returnFirstLetter } from '@/utils';
import { formatDateNamedMonth } from '@/utils/formatDate';

const props = defineProps({
    name: {type: String, default: ''},
    info: {type: String, default: '' },
    category: {type: Object, default: ()=>{} },
    createdDate: {type: String, default: ''},   
    class: {type: String},
    avatarColor: {type: String},
    avatarImage: {type: String}
})
</script>

<template>
     <div class="flex items-center gap-3" :class="props.class">
        <base-avatar
            :color="props.avatarColor"
            :image="props.avatarImage"
            avatarClasses="w-10 h-10 cursor-pointer border-greyscale-70 border"
        >
            <span class="text-xl font-semibold text-white"> {{ returnFirstLetter(props.name) }}</span>
        </base-avatar>
        <div class="flex flex-col">
            <h3 class="text-base font-semibold text-greyscale-900">{{ props.name }}</h3>
            <p class="text-sm text-greyscale-500 font-regular font-normal" >{{ props.createdDate ? formatDateNamedMonth(props.createdDate) : props.info }}</p>
        </div>
        <template v-if="props.category && Object.keys(props.category).length">
            <news-category :category="props.category" class="self-start"/>
        </template>
    </div>
</template>
