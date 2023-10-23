<script setup>
// Core
import Avatar from 'primevue/avatar'
// Macros
const props = defineProps({
  image: {
    type: String
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
    default: 'square',
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
    :pt="{
      root: {
        class: props.avatarClasses
      },
      image: {
        class: 'object-cover'
      }
    }"
  />
</template>

<style scoped>

</style>
