<script setup>
// Core
import { useI18n } from "vue-i18n"

const props = defineProps({
  items: {
    type: Array,
    default:() => []
  }
})
// Composable
const { t } = useI18n()

// Methods
const onItemClick = (item) => {
  props.items.forEach(i => i.active = i.id === item.id)
  emit('emit:onItemClick', item)
}

// Emits
const emit = defineEmits(['emit:onItemClick'])
</script>

<template>
  <div class="custom-tabs-component">
    <div class="flex gap-x-2 items-center px-3">
      <div
        v-for="item in items"
        :key="item.id"
        class="rounded-t-[6px] py-2 px-4 text-xs font-semibold cursor-pointer select-none"
        :class="item.active ? 'text-primary-500 bg-white' : 'text-greyscale-500 bg-greyscale-70'"
        @click="onItemClick(item)"
      >
        {{ t(item.label) }}
      </div>
    </div>

    <div class="bg-white">
      <slot :name="items.find(i => i.active).slot" />
    </div>
  </div>
</template>

<style scoped>

</style>
