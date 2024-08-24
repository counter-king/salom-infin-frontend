<script setup>
// Core
import { computed } from 'vue'
// Components
import { DragVerticalIcon, CheckCircleBoldIcon } from '@/components/Icons'
// Props
import avatarProps from './props'
// Utils
import {isObject, returnStatusColor} from '@/utils'
// Macros
const props = defineProps({
  ...avatarProps,
  selectable: {
    type: Boolean
  },
  selectType: {
    type: String,
    default: 'checked',
    validator(value) {
      return ['checked', 'checkbox', 'radio'].includes(value)
    }
  },
  item: {
    type: Object,
    default: () => {}
  },
  checkboxIndex: {
    type: [Number, Array]
  },
  moveable: {
    type: Boolean
  }
})
const emit = defineEmits(['emit:selected', 'update:checkbox-index'])
// Computed
const rootClass = computed(() => {
  return {
    'bg-greyscale-50 rounded-xl mb-2 py-[10px] px-4': props.selectable
  }
})
const checkboxIndex = computed({
  get() {
    return props.checkboxIndex
  },
  set(value) {
    emit('update:checkbox-index', value)
  }
})
// Methods
const handleSelect = (item) => {
  let id = isObject(item.user) ? item.user.id : item.id

  if(props.selectType === 'checkbox') {
    let index = checkboxIndex.value.find(user => isObject(user.user)
      ? user.user.id === id
      : user === id
    )
    // Удаляем пользователя
    if(checkboxIndex.value.includes(index)) {
      checkboxIndex.value = checkboxIndex.value.filter(user => user !== index)
    }
    // Добавляем пользователя
    else {
      checkboxIndex.value.push(id)
    }
  }
  else {
    checkboxIndex.value = id
  }
}
</script>

<template>
  <div
    class="flex items-center gap-3 w-full border border-transparent cursor-pointer"
    :class="[
      rootClass,
      { 'p-highlight !border-primary-500 bg-primary-100/50': isObject(item.user)
        ? item.user?.id === checkboxIndex
        : item.id === checkboxIndex
      }
    ]"
    @click="handleSelect(item)"
  >
    <template v-if="props.moveable">
      <div
        v-tooltip.top="{
          value: `<h4 class='text-xs text-white -my-1'>Изменить место</h4>`,
          escape: true
        }"
      >
        <base-iconify
          :icon="DragVerticalIcon"
          class="handle text-greyscale-300 cursor-move -mx-1.5"
        />
      </div>
    </template>

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
        <slot name="chip-prepend" :item="item" />

        <p :class="returnStatusColor(item?.status?.code)">{{ item.status?.name }}</p>

        <template v-if="item.position">
          <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>

          <p class="text-greyscale-500">{{ item.position?.name }}</p>
        </template>
      </div>
    </div>

    <div class="w-[22px] h-[22px]">
      <template v-if="props.selectType === 'checked'">
        <base-iconify
          :icon="CheckCircleBoldIcon"
          class="icon-selected hidden"
        />
      </template>

      <template v-else-if="props.selectType === 'checkbox'">
        <Checkbox
          v-model="checkboxIndex"
          :value="isObject(item.user) ? item.user?.id : item.id"
          :inputId="isObject(item.user) ? item.user?.full_name : item.full_name"
          name="users"
        />
      </template>

      <template v-else>
        <RadioButton
          v-model="checkboxIndex"
          :value="isObject(item.user) ? item.user?.id : item.id"
          :inputId="isObject(item.user) ? item.user?.full_name : item.full_name"
          name="users"
          v-tooltip.top="{
            value: `<h4 class='text-xs text-white text-center -my-1'>Назначить исполнителем</h4>`,
            escape: true,
            autoHide: false
          }"
        />
      </template>
    </div>
  </div>
</template>
