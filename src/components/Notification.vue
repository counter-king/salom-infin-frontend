<script setup>
</script>

<template>
  <notifications :pauseOnHover="true" :duration="5000" />
</template>

<style>
.vue-notification-group {
  top: 8px !important;
  right: 8px !important;
}

.vue-notification {
  border-radius: 6px !important;
  font-size: 16px !important;
  margin-bottom: 8px !important;
  padding: 8px 12px !important;
}

.notification-title {
  font-family: var(--font-regular) !important;
}
</style>
