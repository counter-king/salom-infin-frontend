<script setup>
// core
import { downloadFile } from '../../constatns';

const props = defineProps({
  message: {
    type: Object
  },
  rightIcon: {
   name: {
    type: String,
   },
   class: {
    type: String,
   }
  },
  leftIcon: {
   name: {
    type: String,
   },
   class: {
    type: String,
   }
  },
  onShowContextMenu: {
    type: Function
  },
  type: {
   type: String,
   default: 'friend',
   validator: (value) => {
    return ['owner', 'friend'].includes(value)
   }
  }
})

</script>
<template>
 <div 
  class="flex"
  :class="{'justify-end': props.type === 'owner'}"
  >
  <div 
    @contextmenu.prevent="(e)=>props.onShowContextMenu(e, props.message)"
    class="flex gap-4 items-center p-2 pr-4 min-w-[243px] max-w-[400px] w-full group bg-white cursor-pointer rounded-xl"
    :class="{'!bg-primary-400': props.type === 'owner'}"
    >
      <div 
        class="p-[10px] bg-greyscale-50 rounded-lg"
        :class="{'!bg-primary-300': props.type === 'owner'}"
        >
        <base-iconify 
        :icon="props.leftIcon.name"
         class="!h-5 !w-5" 
        :class="props.leftIcon.class"
        />
      </div>
      <div class="grow flex flex-col gap-1 select-none">
        <h3   
           class="text-sm font-semibold text-greyscale-900 capitalize"
          :class="{'!text-white': props.type === 'owner'}"
          >{{ props.message?.text }}</h3>
        <p 
         :class="{'text-primary-100': props.type === 'owner'}"
          class="text-xs text-greyscale-500"
        >{{ props.message?.size }}</p>
      </div>
      <base-iconify 
        @click="downloadFile" 
        v-if="!!props.message?.uploaded"
        :icon="props.rightIcon.name"
        class="!h-5 !w-5" 
        :class="[{'text-greyscale-90': props.type === 'owner'} ,props.rightIcon.class]"
      />
      <BaseSpinner 
        v-else
        class="!w-4 !h-4 text-greyscale-500 animate-spin" 
        :style="{'--spinner-stroke-color': props.type === 'owner' ? 'white' : 'var(--success-500)'}" 
      />
  </div>
 </div>
</template>
<style scoped>
.p-button:focus{
  box-shadow: none !important;
}

::v-deep(.p-progress-spinner-circle) {
  stroke: var(--spinner-stroke-color, white) !important;
  animation: p-progress-spinner-color 6s linear infinite !important;
}

@keyframes p-progress-spinner-color {
  0%, 100% {
    stroke: var(--spinner-stroke-color, white) !important;
  }
  25% {
    stroke: var(--spinner-stroke-color, white) !important;
  }
  50% {
    stroke: var(--spinner-stroke-color, white) !important;
  }
  75% {
    stroke: var(--spinner-stroke-color, white) !important;
  }
}
</style>