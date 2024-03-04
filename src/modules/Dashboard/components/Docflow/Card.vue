<script setup>
// Macros
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <template v-for="(item, index) in props.list" :key="index">
    <template v-if="item.status">
      <router-link to="/" class="flex gap-3 bg-white shadow-button rounded-[10px] p-4">
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
          <p class="text-greyscale-500 font-medium">{{ item.count }}</p>
        </div>
      </router-link>
    </template>
  </template>
</template>

<style scoped>

</style>
