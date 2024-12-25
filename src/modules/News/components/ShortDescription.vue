<script setup>

//props
const props = defineProps({
    text: {
        type: String,
        default: ''
    },
    wrapClass: {
        type: String,
    }
})  

</script>
<template>
    <h2 class="mt-2 text-base text-greyscale-800" :class="props.wrapClass">
        {{  props.text }}
    </h2>
</template>