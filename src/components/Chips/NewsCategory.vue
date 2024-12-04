<script setup>
import { hexToRgba } from '@/utils';


const props = defineProps({
    class: {
        type: String,
        default: ''
    },
    category: {
        type: Object,
        default: () => ({})
    }
})

</script>
<template>
    <div 
        :style="`background-color: ${hexToRgba(props.category.color, 0.1)}; color: ${props.category.color}`"
        class="text-xs font-semibold px-2 py-1 rounded-md inline-block" 
        :class="props.class"
        >
        {{ props.category.name }}
    </div>
</template>
