<script setup>
import { useI18n } from "vue-i18n";

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

// Composable
const { t } = useI18n()

// Methods
const onStepClick = (item) => {
  emit('emit:stepClick', item)
}

const emit = defineEmits(['emit:stepClick'])
</script>

<template>
  <div class="base-stepper-component flex items-center select-none">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="flex items-center"
    >
      <div
        class="flex gap-x-[6px] items-center py-2 px-4 border rounded-[80px] text-base font-semibold cursor-pointer bg-greyscale-50"
        :class="item.active ? 'border-primary-500 text-primary-900' : 'border-greyscale-70 text-greyscale-500'"
        @click="onStepClick(item)"
      >
        <base-iconify
          :icon="item.icon"
          :class="item.active ? 'text-primary-500' : 'text-greyscale-400'"
        />
        <span>{{ t(item.label) }}</span>
      </div>

      <div v-if="index < items.length - 1" class="flex h-1 bg-greyscale-200 w-8"></div>
    </div>
  </div>
</template>

<style scoped>

</style>
