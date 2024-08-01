<script setup>
// Core
import BaseIconify from './UI/BaseIconify.vue'
import BaseButton from './UI/BaseButton.vue'
// Enums
import { COLOR_TYPES } from '@/enums'
</script>

<template>
  <notifications :pauseOnHover="true" :duration="5000">
    <template #body="props">
      <template v-if="props.item.type === COLOR_TYPES.SUCCESS">
        <base-iconify icon="solar:check-circle-bold" class="text-success-500" />
      </template>

      <template v-else-if="props.item.type === 'warn'">
        <base-iconify icon="solar:info-circle-bold-duotone" class="text-warning-500" />
      </template>

      <template v-else>
        <base-iconify icon="solar:danger-triangle-bold-duotone" class="text-critic-500" />
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
          <base-iconify icon="ci:close-sm" class="!w-5 !h-5" />
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
  border-radius: 6px !important;
  font-size: 16px !important;
  margin-bottom: 8px !important;
  padding: 8px 12px !important;
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
