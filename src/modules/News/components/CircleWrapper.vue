<script setup>
// Components

const props = defineProps({
    class : {
        type: String
    }
})
</script>

<template>
    <div class="rounded-full min-w-[40px] w-[40px] h-[40px] p-[10px] flex justify-center items-center cursor-pointer border-greyscale-70 border bg-greyscale-50" :class="class">
        <slot></slot>
    </div>
</template>
