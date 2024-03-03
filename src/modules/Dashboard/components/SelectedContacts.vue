<script setup>
// Components
import { UserWithAction } from '@/components/Users'
</script>

<template>
  <div class="selected-contacts-view">
    <template v-for="(item, index) in 10" :key="index">
      <user-with-action
        label="Нэматуллаев Даврон"
        sub-title="Buxgalter"
        :class="{ 'mb-2': index !== 7 - 1 }"
      >
        <template #sub-title-after>
          <div class="w-[6px] h-[6px] bg-greyscale-400 rounded-full"></div>
          <span class="text-xs text-greyscale-500">00-12</span>
        </template>

        <template #action>
          <base-icon
            name="ChatLineIcon"
            width="16"
            height="16"
            class="text-greyscale-300"
          />
        </template>
      </user-with-action>
    </template>
  </div>
</template>

<style scoped>

</style>
