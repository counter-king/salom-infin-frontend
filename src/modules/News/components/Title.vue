<script setup>

//props
defineProps({
    title: {
        type: String,
        default: ''
    },
    class: {
        type: String,
    }
})  
</script>
<template>
    <h2 class="font-semibold text-[32px] text-greyscale-900" :class="class">
        {{  title }}
    </h2>
</template>