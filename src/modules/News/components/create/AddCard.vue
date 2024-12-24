<script setup>
// Core
import { useI18n } from 'vue-i18n'
//Icons
import BaseIconify from '@/components/UI/BaseIconify.vue';
import { AddPlusIcon } from '@/components/Icons';


// props
const props = defineProps({
    class: {
        type: String,
    },
    iconColor:{
        type: String,
    },
    text: {
        type: String,
    },
})

const { t } = useI18n()

</script>
<template>
    <div class="rounded-2xl bg-greyscale-50 min-w-[203px] h-[112px] p-4 cursor-pointer" :class="class">
        <div class="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full p-2" :class="`!bg-${iconColor}`">
            <div class="w-5 h-5 min-w-[20px] min-h-[20px] rounded-full bg-white">
                <div :class="`text-${iconColor}`">
                    <base-iconify 
                        :icon="AddPlusIcon"
                    />
                </div>
            </div>
        </div>
        <div class="text-sm font-semibold text-greyscale-900 mt-6">
            {{ t(props.text) }}
        </div>
    </div>
</template>
