<script setup>
// Components

const props = defineProps({
    text: {  type: String, default: '' },
    class: { type: String, default: ''}
})

</script>

<template>
    <RouterLink to="https://google.com" class="min-w-[89px] px-3 py-1 bg-white rounded-[80px] flex items-center justify-center" :class="class">
        {{ props.text }}
    </RouterLink>
</template>
