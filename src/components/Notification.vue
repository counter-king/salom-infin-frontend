<script setup>
// Components
import { CheckCircleBoldIcon, InfoCircleBoldIcon, DangerTriangleBoldIcon, CloseSmIcon } from '@/components/Icons'
// Enums
import { COLOR_TYPES } from '@/enums'
</script>

<template>
  <notifications :pauseOnHover="true" :duration="5000">
    <template #body="props">
      <template v-if="props.item.type === COLOR_TYPES.SUCCESS">
        <base-iconify :icon="CheckCircleBoldIcon" class="text-success-500" />
      </template>

      <template v-else-if="props.item.type === 'warn'">
        <base-iconify :icon="InfoCircleBoldIcon" class="text-warning-500" />
      </template>

      <template v-else>
        <base-iconify :icon="DangerTriangleBoldIcon" class="text-critic-500" />
      </template>

      <span class="flex-1 text-white">{{ props.item.text }}</span>

      <base-button
        color="bg-greyscale-800 hover:bg-greyscale-900"
        border-color="border-greyscale-800"
        only-icon
        rounded
        size="x-small"
        @click="props.close()"
      >
        <template #label>
          <base-iconify :icon="CloseSmIcon" />
        </template>
      </base-button>
    </template>
  </notifications>
</template>

<style>
.vue-notification-group {
  top: inherit !important;
  bottom: 44px;
  right: 50% !important;
  transform: translateX(50%);
  width: auto !important;
}

.vue-notification-wrapper {
  display: flex !important;
  align-items: center;
  gap:12px;
  @apply bg-primary-900 !important;
  font-size: 16px !important;
  margin: 6px 0 0 !important;
  border-radius: 12px !important;
  padding: 14px 16px !important;
  border-left: 0 !important;
  min-width: 372px !important;
}

.notification-title {
  font-family: var(--font-medium) !important;
  font-weight: 500 !important;
}
</style>
