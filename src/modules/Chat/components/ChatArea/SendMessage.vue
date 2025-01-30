<script setup>
// cores
import { onMounted, ref, watch } from 'vue';
import InputText from 'primevue/inputtext';
import { useI18n } from 'vue-i18n';
// components
import EmojiStikers from './EmojiStikers.vue';
// icons
import { ForwardIcon, PaperclipLinearIcon, PenIcon, PlainBoldIcon, SmileCircleLinearIcon, XMarkSolidIcon } from '@/components/Icons';
import { useChatStore } from '../../stores';
// composables
import { useFileUpload } from '../../composables/useFileUpload';
// stores
const chatStore = useChatStore()

const { t } = useI18n();
const { uploadFiles } = useFileUpload();

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
    uploadFiles(event.target.files);
}

const onCancelIconReplay = () => {
  chatStore.contextMenu = { edit: false, replay: false }
}
// showSend icon show or hide
watch(message, (val) => {
 if(!!val) {
   showSendIcon.value = true;
 } else {
   showSendIcon.value = false;
 }
})

defineExpose({
  refInput
})

onMounted(() => {
  refInput.value.$el.focus()
})

</script>
<template>
 <div 
  class="relative pt-1"
  :class="{'pt-[36px]': chatStore.contextMenu?.edit || chatStore.contextMenu?.replay}"
  >
  <!-- chat replay and edit -->
  <div 
    v-if="chatStore.contextMenu?.edit || chatStore.contextMenu?.replay"
    class="flex justify-between absolute gap-2 items-center px-2 pt-2 pb-10 top-[0px] bg-white w-full rounded-t-xl select-none"
    >
    <div class="flex items-center gap-2">
      <base-iconify 
        :icon="chatStore.contextMenu?.edit ? PenIcon : ForwardIcon"
        class="!h-4 !w-4 rotate-y-180 text-primary-500"
      />
      <p class="text-xs h-[16px] font-medium text-primary-500 pl-2 border-l-[2px] border-warning-500 line-clamp-1">{{ chatStore.contextMenu?.data?.text }}</p>
    </div>
    <div class="p-1 cursor-pointer">
      <base-iconify 
        @click="onCancelIconReplay"
        :icon="XMarkSolidIcon"
        class="!h-4 !w-4"
      />
    </div>
  </div>
  <!-- seding input -->
  <div class="relative w-full bg-transparent">
    <!-- <base-input 
      ref="refInput"
      v-model="message"  
      input-class="p-[6px] pl-5 h-[52px] bg-white w-full text-sm font-medium text-greyscale-900 placeholder:text-sm placeholder:font-medium placeholder:text-greyscale-300"
      placeholder="Ввведите свое сообщение..."
      @keydown.enter="handleSendMessage"
    /> -->
    <InputText
      ref="refInput"
      v-model="message"
      type="text"
      size="small"
      :placeholder="t('enter-your-message')"
      @keydown.enter="handleSendMessage"
      :pt="{
        root: {
          class: [
            'w-full p-[6px] pl-5 h-[52px] bg-white w-full rounded-xl  text-sm font-medium text-greyscale-900 placeholder:text-sm placeholder:font-medium placeholder:text-greyscale-300',
          ]
        }
      }"
    />
    <div class="flex gap-3 items-center absolute right-[10px] top-[6px] ">
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
    <!-- input file upload hidden -->
    <input 
      type="file" 
      ref="refFileInput" 
      class="hidden" 
      :multiple="true"
      @change="handleFileInputChange" 
    />
  </div>
</div>
</template>
<style scoped>
::v-deep(.p-inputtext) {
  box-shadow: 0px 4px 10px 0px rgba(47, 61, 87, 0.04), 0px 1px 1px 0px rgba(64, 64, 64, 0.03)!important;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>