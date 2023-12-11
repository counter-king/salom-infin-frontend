<script setup>
// Core
import { ref, computed } from 'vue'
// Props
import avatarProps from './props'
// Utils
import { isObject } from '@/utils'
// Macros
const props = defineProps({
  ...avatarProps,
  selectable: {
    type: Boolean
  },
  multiple: {
    type: Boolean,
    default: true
  },
  items: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['emit:selected'])
// Reactive
const userCheckbox = ref('')
// Computed
const rootClass = computed(() => {
  return {
    'bg-greyscale-50 rounded-xl mb-2 py-[10px] px-4': props.selectable
  }
})
// Methods
const handleSelect = (item) => {
  userCheckbox.value = isObject(item.user) ? item.user.id : item.id
  emit('emit:selected', userCheckbox.value)
}
</script>

<template>
  <div
    v-for="item in props.items"
    class="flex items-center gap-3 w-full border border-transparent cursor-pointer"
    :class="[
      rootClass,
      { '!border-primary-500 bg-primary-100/50': isObject(item.user) ? item.user?.id : item.id === userCheckbox }
    ]"
    @click="handleSelect(item)"
  >
    <base-avatar
      :label="isObject(item.user) ? item.user?.full_name : item.full_name"
      :color="isObject(item.user) ? item.user?.color : item.color"
      :image="isObject(item.user) ? item.user?.image : item.image"
      :type="props.type"
      :size="props.size"
      :shape="props.shape"
      :avatarClasses="props.avatarClasses"
    />

    <div class="flex-1 font-medium">
      <h1 class="text-sm text-primary-900">{{ isObject(item.user) ? item.user?.full_name : item.full_name }}</h1>

      <div class="flex items-center gap-2 text-xs">
        <p class="text-warning-500">Командировка</p>
        <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>
        <p class="text-greyscale-500">Bosh mutaxasis</p>
      </div>
    </div>

    <div class="w-[22px] h-[22px]">
      <template v-if="props.multiple">
        <base-icon name="CheckCircleBgIcon" class="icon-selected w-[22px] h-[22px] stroke-0 hidden" />
      </template>

      <template v-else>
        <RadioButton
          v-model="userCheckbox"
          :value="isObject(item.user) ? item.user?.id : item.id"
          :inputId="isObject(item.user) ? item.user?.full_name : item.full_name"
          name="users"
          v-tooltip.top="{
            value: `<h4 class='text-xs text-white text-center -my-1'>Сделать ответственный исполнитель</h4>`,
            escape: true,
            autoHide: false
          }"
        />
      </template>
    </div>
  </div>
</template>

<style>
.p-highlight .icon-selected {
  display: block;
}
</style>
