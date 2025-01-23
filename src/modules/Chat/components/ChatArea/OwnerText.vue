<script setup>
// cores
import { useI18n } from 'vue-i18n';
import { onUnmounted, ref } from 'vue';
// componennts
import { CheckBigIcon, CheckReadIcon, ForwardIcon, Pen2Icon, CopyIcon, TrashBinBoldIcon, TrashBinTrashIcon } from '@/components/Icons';
import Menu from 'primevue/menu';
import BaseIconify from '@/components/UI/BaseIconify.vue';
// utils
import { formatHour } from '@/utils/formatDate';
import { onMounted } from 'vue';

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
  }
})
// reactives
const showDropDown = ref(false)
const menuContainer = ref(null);
const items = ref([
    { 
      label: 'New', iconName: CheckReadIcon,
      command: () => {
        showDropDown.value = false 
      }
    },
    { 
      label: 'answer',
      iconName: ForwardIcon,
      command: () => {
        showDropDown.value = false 
      } 
    },
    { 
      label: 'update',
      iconName: Pen2Icon,
      command: () => {
        showDropDown.value = false 
      } 
    },
    { 
      label: 'copy',
      iconName: CopyIcon,
      command: () => {
        showDropDown.value = false 
      } 
    },
    { 
      label: 'delete',
      iconName: TrashBinTrashIcon,
      command: () => {
        showDropDown.value = false 
      },
      class: "!text-critic-500"
    }
]);
const handleDropDown = (event) => {
 const menuElement = event.target
 showDropDown.value = !showDropDown.value
}

const handleOutsideClick = (event) => {
 const menuElement = document.querySelector('.dropdown-menu');
   if (menuElement && !menuElement.contains(event.target)) {
     showDropDown.value = false;
   }
 };

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>

<template>
  <div class="flex gap-3 justify-end items-end select-none relative">
   <div class="flex gap-1 items-end">
    <span class="text-xs font-medium text-greyscale-500">{{ formatHour(props.date) }}</span>
    <base-iconify
      :icon="props.isReaded ? CheckReadIcon : CheckBigIcon"
      class="!w-5 !h-5 !text-success-500"
    />
   </div> 
   <p @contextmenu.prevent="handleDropDown" class="text-sm font-medium text-white bg-primary-400 rounded-xl rounded-br-[4px] px-4 py-2">{{ props.text }}</p>
    <Menu 
       ref="menuContainer"
      :model="items"
      :pt="
        { 
         root: { class: ['dropdown-menu rounded-xl p-1 !absolute top-[38px] right-0 w-[180px] z-[10]', { 'hidden': !showDropDown} ]},
         content: { class: 'rounded-lg overflow-hidden cursor-pointer' },
        }
      "
    >
     <template #item="{ item }">
      <div 
        class="flex gap-3 items-center text-greyscale-500 px-3 py-3 rounded-lg hover:bg-greyscale-50"
        :class="item.class"
      >
        <base-iconify class="!w-4 !h-4" :icon="(item.iconName)" />
        <span class="text-xs font-medium">{{t(item.label) }}</span>
      </div>
     </template>
   </Menu>
  </div>
</template>
<style scoped>
.dropdown-menu {
  box-shadow: 0px 2px 60px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.03);
}
</style>