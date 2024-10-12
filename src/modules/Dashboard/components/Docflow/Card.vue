<script setup>
// Core
import { useI18n } from 'vue-i18n'
// Composable
const { t } = useI18n()
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
          name: item.route.name,
          query: props.type === 'new' ? item.route.new.query : props.type === 'in-progress' ? item.route.inProgress.query : null
        }"
        class="flex gap-3 bg-white shadow-button rounded-[10px] p-4"
      >
        <div class="flex items-center justify-center w-10 h-10 rounded-full" :class="item.avatarColor">
          <base-iconify
            :key="item.icon"
            :icon="item.icon"
            :class="item.iconColor"
          />
        </div>

        <div class="flex-1">
          <h1 class="text-sm text-greyscale-900 font-semibold">{{ t(item.name) }}</h1>
          <p class="text-greyscale-500 font-medium">{{ counts[item.key] }}</p>
        </div>
      </router-link>
    </template>
  </template>
</template>

<style scoped>

</style>
