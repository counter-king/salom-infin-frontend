<script setup>
import EmojiPicker from 'vue3-emoji-picker'
const props = defineProps({
  stikerClass: {
    type: String
  },
})
</script>
<template>
  <div class="absolute right-0 top-[-420px] pb-[30px]">
    <EmojiPicker @select="props.selectEmoji" class="stiker !w-[320px] !min-h-[400px] " :class="props.stikerClass"/>
  </div>
</template>
<style scoped>
 
::v-deep(.v3-footer) {
  display: none!important;
}
::v-deep(h5.v3-sticky) {
  position: static!important;
}
::v-deep(.v3-body-inner) {
 scroll-behavior: inherit;
 scrollbar-color:inherit;
 scrollbar-width:inherit;
}
::v-deep(.v3-search input) {
  display: inline-block!important;
  font-size: 14px!important;
  border-radius: 6px!important;
  padding: 10px !important;
  color:var(--greyscale-900)!important;
}

</style>