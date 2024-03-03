<script setup>
// Core
import { useReward } from 'vue-rewards'
// Components
import { UserWithAction } from '@/components/Users'
import WidgetWrapper from './WidgetWrapper.vue'
// Non-reactive
const config = {
  startVelocity: 10,
  spread: 180,
  elementCount: 100
}
// Composable
const { reward } = useReward('confetti', 'confetti', config)
</script>

<template>
  <widget-wrapper title="birthday">
    <template #content>
      <template v-for="(item, index) in 7" :key="index">
        <user-with-action
          label="Нэматуллаев Даврон"
          sub-title="Bank ijro apparati"
          :class="{ 'mb-1': index !== 7 - 1 }"
        >
          <template #title-after>
            <div class="w-[6px] h-[6px] bg-greyscale-400 rounded-full"></div>
            <span class="text-xs text-greyscale-500">00-12</span>
          </template>

          <template #action>
            <base-icon
              name="GiftIcon"
              width="16"
              height="16"
              class="text-greyscale-400"
              @click="reward"
            />
          </template>
        </user-with-action>
      </template>

      <span id="confetti" class="absolute top-0 right-1/2 w-0 h-full"></span>
    </template>
  </widget-wrapper>
</template>

<style scoped>

</style>
