<script setup>

// Components
import { StatusChip } from '@/components/Chips';

const props = defineProps({
    user: {type: String, default: '' },
    status: {type: Object, default: ()=>{} }
})

</script>

<template>
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
        <template v-if="props.status && Object.keys(props.status).length">
            <status-chip :status="{name: 'Новости', id: 1}" root-class="!text-xs !font-semibold !rounded-md self-start">
                Новости
            </status-chip>
        </template>
    </div>
</template>
