<script setup>
// Core
import Avatar from 'primevue/avatar'
import { ActionChip } from '@/components/Chips'
// Macros
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  color: {
    type: String
  },
  image: {
    type: String
  },
  type: {
    type: String,
    default: 'single',
    validator(value) {
      return ['single', 'group'].includes(value)
    }
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
  },
  actionChipType: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div class="app-avatar flex relative">
    <Avatar
      :image="props.image"
      :size="props.size"
      :shape="props.shape"
      :label="props.label[0]"
      :pt="{
        root: {
          style: {
            backgroundColor: `${props.color}`
          },
          class: [
            { '-ml-2': props.type === 'group' }, props.avatarClasses
          ]
        },
        label: {
          class: 'text-sm leading-none text-white'
        },
        image: {
          class: 'object-cover'
        }
      }"
    >
      <slot />
    </Avatar>

    <template v-if="props.actionChipType">
      <action-chip :type="props.actionChipType" />
    </template>
  </div>
</template>

<style scoped>

</style>
