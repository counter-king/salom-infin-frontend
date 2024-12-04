<script setup>

// props
const props = defineProps({
    text: {
        type: String,
        default: ''
    },
    class: {
        type: String,
    }   
})  
</script>
<template>
    <div class="py-4 pl-6 pr-20 border-l-[4px] border-primary-500
     bg-primary-30 rounded-r-[12px] relative" :class="props.class" >
        <p class="text-xl text-greyscale-800 italic">
           {{ props.text }}
        </p>
        <div class="w-9 h-9 absolute bottom-4 right-6 z-10">
            <img src="@/assets/img/quotes-icon.png" alt="quote" class="w-full h-full object-cover"/>
        </div>
    </div>
</template>