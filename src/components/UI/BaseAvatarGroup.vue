<script setup>
// Core
import { computed } from 'vue'
import AvatarGroup from 'primevue/avatargroup'
// Macros
const props = defineProps({
  label: {
    type: String
  },
  items: {
    type: Array,
    default: () => []
  },
  max: {
    type: Number,
    default: 3
  },
  size: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['normal', 'large', 'xlarge'].includes(value)
    }
  },
  shape: {
    type: String,
    default: 'circle',
    validator(value) {
      return ['square', 'circle'].includes(value)
    }
  },
  avatarClasses: {
    type: String
  }
})
// Computed
const list = computed(() => props.items.slice(0, props.max))
const rest = computed(() => props.items.slice(props.max))
</script>

<template>
  <AvatarGroup>
    <template v-for="avatar in list">
      <base-avatar
        :label="avatar.user.full_name"
        :color="avatar.color"
        :image="avatar.image"
        :size="props.size"
        :shape="props.shape"
        :avatar-classes="props.avatarClasses"
        v-tooltip.top="{
          value: `<h4 class='text-xs text-white -my-1'>${avatar.user.full_name}</h4>`,
          escape: true,
          autoHide: false
        }"
        type="group"
      />
    </template>

    <!-- Rest -->
    <template v-if="rest.length">
      <base-avatar
        :size="props.size"
        :shape="props.shape"
        :avatar-classes="props.avatarClasses"
        type="group"
        v-tooltip.top="{
          value: '123',
          escape: true,
          autoHide: false
        }"
      >
        <template #default>
          <span class="text-sm leading-none font-semibold text-primary-900">
            +{{ rest.length }}
          </span>
        </template>
      </base-avatar>
    </template>
  </AvatarGroup>
</template>

<style scoped>

</style>
