<script setup>
// cores
import { onMounted, ref, watch } from 'vue';
// components
import BaseInput from '@/components/UI/BaseInput.vue';
import EmojiStikers from './EmojiStikers.vue';
// icons
import { PaperclipLinearIcon, PlainBoldIcon, SmileCircleLinearIcon } from '@/components/Icons';

// reactives
const message = ref("");
const refInput = ref(null); 
const refFileInput = ref(null);
const showSendIcon = ref(false);
const isSimleStikerHovered = ref(false);
// methods
// when massage is sent
const handleSendMessage = () => {
 if(!!message.value) {
  console.log('send message', message.value);
 }
 message.value = '';
}

// when emoji selected
const handleSelectEmoji = (e) => {
    message.value +=e.i;
}

const handleAttachmentClick = () => {
  refFileInput.value.click();
}

const handleFileInputChange = (event) => {
  console.log(event.target.files);  
}

// showSend icon show or hide
watch(message, (val) => {
 if(!!val) {
   showSendIcon.value = true;
 } else {
   showSendIcon.value = false;
 }
})

onMounted(() => {
  refInput.value;
})

</script>
<template>
 <div class="relative w-full">
   <base-input 
    v-model="message"  
    input-class="p-[6px] pl-5 h-[52px] bg-white w-full text-sm font-medium text-greyscale-900 placeholder:text-sm placeholder:font-medium placeholder:text-greyscale-300"
    placeholder="Ввведите свое сообщение..."
    @keydown.enter="handleSendMessage"
   />
   <div class="flex gap-3 items-center absolute right-[10px] top-[6px]">
     <div
      @mouseover="isSimleStikerHovered = true" 
      @mouseleave="isSimleStikerHovered = false"
      >
        <base-iconify
          :icon="SmileCircleLinearIcon"
          class="!h-5 !w-5 text-greyscale-300 cursor-pointer"
        />
        <EmojiStikers 
          :select-emoji="handleSelectEmoji"
          @mouseleave="isSimleStikerHovered = false"
          v-if="isSimleStikerHovered"  
        />
     </div>
     <base-iconify
      @click="handleAttachmentClick"
      :icon="PaperclipLinearIcon"
      class="!h-5 !w-5 text-greyscale-300 cursor-pointer"
     />
     <div
       class=" bg-primary-500 rounded-xl w-10 h-10 min-h-[40px] min-w-[40px] max-w-[40px] max-h-[40px] flex items-center justify-center cursor-pointer"
      :class="{'!bg-greyscale-300 pointer-events-none': !showSendIcon}"
      >
       <base-iconify
        @click="handleSendMessage"
        :icon="PlainBoldIcon"
        class="!h-5 !w-5 text-white"
       />
     </div>
   </div>
   <input 
      type="file" 
      ref="refFileInput" 
      class="hidden" 
      @change="handleFileInputChange" 
    />
 </div>
</template>
<style scoped>
::v-deep(.p-inputtext) {
 box-shadow: 0px 4px 10px 0px rgba(47, 61, 87, 0.04), 0px 1px 1px 0px rgba(64, 64, 64, 0.03)!important;
}


</style>