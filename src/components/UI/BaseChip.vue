<script setup>
// Components
import { CloseSmIcon, MapPointBoldIcon } from "@/components/Icons"
import BaseIconify from "@/components/UI/BaseIconify.vue";
// Props
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  label: {
    type: String,
    default: "Example",
  },
  type: {
    type: String,
    default: "user",
    validator(value) {
      return ["user", "location", "other"].includes(value)
    }
  },
  clearable: {
    type: Boolean,
    default: false
  }
})

// Methods
const onClickClear = (item) => {
  emit("emit:clear", item)
}

// Emit
const emit = defineEmits(["emit:clear"])
</script>

<template>
  <div class="flex gap-x-[6px] items-center px-2 py-1 bg-greyscale-50 rounded-[90px] border-b border-greyscale-200">
    <div v-if="type === 'user'" class="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white bg-primary-500">{{ label[0] }}</div>
    <base-iconify v-else-if="type === 'location'" :icon="MapPointBoldIcon" class="text-greyscale-400" />
    <div class="text-greyscale-900 text-sm font-medium">{{ label }}</div>
    <div
      v-if="clearable"
      class="flex justify-center items-center w-5 h-5 rounded-full bg-critic-500 cursor-pointer"
      @click="onClickClear(item)"
    >
      <base-iconify :icon="CloseSmIcon" class="text-white" />
    </div>
  </div>
</template>

<style scoped>

</style>
