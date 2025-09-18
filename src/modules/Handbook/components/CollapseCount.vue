<script setup>
import { ref, computed } from 'vue'
import BaseIconify from '@/components/UI/BaseIconify.vue'
import { ChevronDown20SolidIcon, ChevronUp20SolidIcon } from '@/components/Icons'

const props = defineProps({
  count: {
    type: Number,
  }
})
const emit = defineEmits(['emit:count'])
const toggle = ref(0)

const defineIcon = computed(() => toggle.value & 1 ? ChevronUp20SolidIcon : ChevronDown20SolidIcon)

const handleCount = () => {
  toggle.value += 1
  emit('emit:count', toggle.value)
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      class="flex items-center gap-0.5 bg-primary-500 hover:bg-primary-400 z-[1] font-semibold text-sm text-white rounded-full cursor-pointer select-none py-1 pl-2.5 pr-1.5"
      @click="handleCount"
    >
      <span>{{ count }}</span>
      <base-iconify :icon="defineIcon" />
    </div>

    <template v-if="toggle & 1">
      <div class="w-0.5 h-5 bg-[#DCE0E4] mx-auto"></div>
    </template>
  </div>
</template>

<style scoped>

</style>
