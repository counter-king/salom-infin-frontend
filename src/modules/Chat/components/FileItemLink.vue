<script setup>
// core
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
// components
import { LinkCircleBoldIcon } from '@/components/Icons';
import LinkMessage from './ChatArea/LinkMessage.vue';

const { t } = useI18n();
const props = defineProps({
  message: {
   type: Object
  }
})

function extractAllURLs(input) {
  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = input.match(urlRegex) || [];
  return urls
}

const extractTextsUntillFirstUrl = computed(() => {
  return props.message.text.split(extractAllURLs(props.message.text)[0])[0]
})

function extractDomain(url) {
  const match = url.match(/^https?:\/\/([^./]+)/);
  return match ? match[1] : null;
}

const computedUrl = computed(() => {
  return extractAllURLs(props.message.text)
})

const handleClickIcon = () => {
  window.open(computedUrl.value[0], '_blank'); 
}

</script>
<template>
 <div 
   class="flex gap-4 items-center p-2 pr-1 group hover:bg-greyscale-50 rounded-xl"
   :class="{ '!items-start': computedUrl.length > 1 }"
   >
    <div class="p-[10px] group-hover:bg-white bg-greyscale-50 rounded-lg">
      <base-iconify 
       :icon="LinkCircleBoldIcon"
       class="!h-5 !w-5 text-primary-500 cursor-pointer" 
       @click="handleClickIcon"
       />
    </div>
    <div class="grow flex flex-col gap-1 select-none">
      <h3 class="text-sm font-semibold text-greyscale-900 capitalize line-clamp-2">{{extractTextsUntillFirstUrl || extractDomain(computedUrl[0])}}</h3>
        <a 
          v-for="(url, index) in computedUrl"
          :key="index"
          :href="url"
          target="_blank"
          class="text-xs text-primary-500 cursor-pointer"
        >
          {{ url }}
        </a>
    </div>
 </div>
</template>