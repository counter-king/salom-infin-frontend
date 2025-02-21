<script setup>
// cores
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import ContextMenu from 'primevue/contextmenu';

const { t } = useI18n(); 
const props = defineProps({
 onShowContextMenu:{
  type: Function
 },
 menuItems : {
  type: Array,
  default: () => []
 },
 classMenu:{
  type: String
 }
})
// reactives
const menu = ref(null);
defineExpose({
  menu: menu
})

</script>
<template>
 <ContextMenu 
   ref="menu"
   :model="props.menuItems"
   :pt="
     { 
      root: { class: ['dropdown-menu rounded-xl p-1 !absolute top-[38px] right-0 w-[181px] z-[10]', props.classMenu]},
      content: { class: 'rounded-lg overflow-hidden cursor-pointer' },
     }
   "
   >
   <template #item="{ item }">
    <div v-if="!item.iconName" class=" px-1 py-1 flex gap-1 items-center justify-center">
      <span @click="item.action('🔥', 'fire')" class="hover:bg-white rounded-[4px] p-[1px]">🔥</span>
      <span @click="item.action('😄', 'lough')" class="hover:bg-white rounded-[4px] p-[1px]">😄</span>
      <span @click="item.action('❤️', 'heart')" class="hover:bg-white rounded-[4px] p-[1px]">❤️</span>
      <span @click="item.action('👍', 'like')" class="hover:bg-white rounded-[4px] p-[1px]">👍</span>
      <span @click="item.action('😡', 'angry')" class="hover:bg-white rounded-[4px] p-[1px]">😡</span>
      <span @click="item.action('😍', 'love')" class="hover:bg-white rounded-[4px] p-[2px]">😍</span>
    </div>
     <div
       v-else 
       class="flex gap-3 items-center text-greyscale-500 px-3 py-3 rounded-lg hover:bg-greyscale-50"
       :class="[{'!py-2': !item.iconName}, item.class]"
       >
        <slot :item="item">
          <base-iconify class="!w-4 !h-4" :icon="(item.iconName)" v-if="item.iconName" :class="item.iconClass" />
          <span class="text-xs font-medium">{{t(item.label)}}</span>
        </slot>
     </div>
   </template>
   </ContextMenu>
</template>
<style scoped>
.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>