<script setup>
// Enums
import { STATUS_TYPES } from '@/enums'
// Macros
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  counts: {
    type: Object,
    default: () => {}
  },
  type: {
    type: String,
    default: 'new',
    validator(value) {
      return ['new', 'in-progress', 'all'].includes(value)
    }
  }
})
</script>

<template>
  <template v-for="(item, index) in props.list" :key="index">
    <template v-if="item.status">
      <router-link
        :to="{
          name: item.route,
          query: {
            status: props.type === 'new' ? STATUS_TYPES.TODO : props.type === 'in-progress' ? STATUS_TYPES.IN_PROGRESS : undefined
          }
        }"
        class="flex gap-3 bg-white shadow-button rounded-[10px] p-4"
      >
        <div class="flex items-center justify-center w-10 h-10 rounded-full" :class="item.avatarColor">
          <base-icon
            :key="item.icon"
            :name="item.icon"
            :class="item.iconColor"
            :stroke="false"
          />
        </div>

        <div class="flex-1">
          <h1 class="text-sm text-greyscale-900 font-semibold">{{ item.name }}</h1>
          <p class="text-greyscale-500 font-medium">{{ counts[item.key] }}</p>
        </div>
      </router-link>
    </template>
  </template>
</template>

<style scoped>

</style>
