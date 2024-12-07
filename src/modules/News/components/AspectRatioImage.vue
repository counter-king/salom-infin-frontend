<script setup>



const props = defineProps({
  image: { type: Object, default: () => {} },
  imageClass: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div
    class="w-full h-full rounded-2x relative"
  >
    <div 
      class="rounded-lg overflow-hidden aspect-ratio-box relative" 
      :class="props.imageClass"
      :style="{ '--dynamic-src': `url(${props.image.url})` }"
    >
      <img :src="props.image.url" alt="rasm" class="w-full h-full object-contain absolute z-2" />
    </div>
  </div>
</template>
<style scoped>
.aspect-ratio-box {
    aspect-ratio: 3 / 2
}

.aspect-ratio-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;  
  width: 100%;
  height: 100%;
  background-image: var(--dynamic-src);
  background-size: cover;
  filter: blur(10px);
  background-position: center; 
  z-index: 0;
}
</style>
