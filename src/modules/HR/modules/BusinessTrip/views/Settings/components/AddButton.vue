<script setup>
// core
import { useI18n } from 'vue-i18n'
// components
import { AddCircleBoldIcon } from '@/components/Icons'

const { t } = useI18n()
// props
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  classes: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['click'])
const handleAdd = () => {
  emit('click')
}
</script>

<template>
  <div 
    class="flex select-none w-fit items-center justify-center gap-2 mt-1 hover:bg-greyscale-70 bg-greyscale-50 rounded-lg px-3 py-[14px] cursor-pointer"
    :class="props.classes"
    @click="handleAdd()"
    >
    <base-iconify 
        :icon="AddCircleBoldIcon" class="!w-5 !h-5 text-primary-500"
    />
    <p class="text-sm font-semibold text-greyscale-900">{{ t(props.label) }}</p>
  </div>
</template>

<style scoped>
</style>