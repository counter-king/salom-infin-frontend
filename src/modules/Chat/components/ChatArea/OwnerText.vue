<script setup>
// cores
import { useI18n } from 'vue-i18n';
// componennts
import { CheckBigIcon, CheckReadIcon } from '@/components/Icons';
import BaseIconify from '@/components/UI/BaseIconify.vue';
import ClickedStiker from './ClickedStiker.vue';
// utils
import { formatHour } from '@/utils/formatDate';

const { t } = useI18n(); 
// props
const props = defineProps({
  text: {
    type: String
  },
  date: {
    type: String 
  },
  isReaded: {
    type: Boolean,
    default: false
  },
  stiker : {
    icon: {
      type: String
    },
    info: {
      type: Object
    }
  },
  onShowContextMenu: {
    type: Function
  }
})
// reactives
const onContextMenuClick = (event) => {
  props.onShowContextMenu(event)
};

</script>

<template>
  <div class="flex flex-col gap-2 items-end">
    <div class="flex gap-3 justify-end items-end relative">
    <div class="flex gap-1 items-end">
      <span class="text-xs font-medium text-greyscale-500">{{ formatHour(props.date) }}</span>
      <base-iconify
        :icon="props.isReaded ? CheckReadIcon : CheckBigIcon"
        class="!w-5 !h-5 !text-success-500"
      />
    </div> 
      <p @contextmenu.prevent="onContextMenuClick" class="text-sm font-medium text-white bg-primary-400 rounded-xl rounded-br-[4px] px-4 py-2" >{{ props.text }}</p>
    </div>
    <div class="flex gap-1">
      <ClickedStiker />
      <ClickedStiker />
    </div>
  </div>
</template>
<style scoped>
.dropdown-menu {
  box-shadow: 0px 2px 60px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.03);
}
</style>