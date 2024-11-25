<script setup>
// Components

const props = defineProps({
    text: {  type: String, default: '' },
    tagClass: { type: String, default: ''}
})
</script>

<template>
    <div class="min-w-[89px] px-3  py-1 bg-white rounded-[80px] flex items-center justify-center" :class="tagClass">
    {{ props.text }}
    </div>
</template>
