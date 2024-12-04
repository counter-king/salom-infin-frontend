<script setup>
// Core
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
// Components
const { t } = useI18n();
const props = defineProps({
    tags:{
        type: Array,
    },
    class : {
        type: String
    }
})
// methods
const handleTagClick = (tag) => {
    router.push({
        name: 'NewsIndex',
        query: {
            tag: tag.id
        }   
    })
}

</script>

<template>
    <div class="flex flex-col gap-5" :class="props.class">
        <h2 class="font-semibold text-2xl">{{t('tag')}}</h2>    
        <div class="rounded-xl bg-greyscale-50 p-3 flex gap-2">
            <template v-for="(tag, index) in props.tags" :key="index">
                <div 
                    @click="handleTagClick(tag)"
                    class="min-w-[89px] px-3 py-1 bg-white rounded-[80px] flex items-center justify-center cursor-pointer hover:text-primary-500">
                   {{ "#"+tag.name }}
            </div>
            </template>
        </div>
    </div>
</template>
