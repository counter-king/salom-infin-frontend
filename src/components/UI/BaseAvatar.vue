<script setup>
// Core
import Avatar from 'primevue/avatar'
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
  }
})
</script>

<template>
  <Avatar
    :image="props.image"
    :size="props.size"
    :shape="props.shape"
    :label="props.label[0]"
    :pt="{
      root: {
        style: `${props.color}px`,
        class: [
          { '-ml-2': props.type === 'group' }, props.avatarClasses
        ]
      },
      label: {
        class: 'text-sm leading-none font-semibold text-primary-900'
      },
      image: {
        class: 'object-cover'
      }
    }"
  >
    <slot />
  </Avatar>
</template>

<style scoped>

</style>
