<script setup>
// Core
import { computed } from 'vue'
import AvatarGroup from 'primevue/avatargroup'
// Utils
import { isObject } from '@/utils'
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
  detailDialog: {
    type: Boolean
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
        :label="isObject(avatar.user) ? avatar.user.full_name : avatar.full_name"
        :color="isObject(avatar.user) ? avatar.user.color : avatar.color"
        :meta="isObject(avatar.user) ? avatar.user : avatar"
        :image="avatar.image"
        :size="props.size"
        :shape="props.shape"
        :detail-dialog="props.detailDialog"
        :avatar-classes="props.avatarClasses"
        type="group"
        class="-mr-2"
      />
    </template>

    <!-- Rest -->
    <template v-if="rest.length">
      <base-avatar
        :size="props.size"
        :shape="props.shape"
        :avatar-classes="props.avatarClasses"
        type="group"
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
