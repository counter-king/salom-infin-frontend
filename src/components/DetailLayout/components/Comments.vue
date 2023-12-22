<script setup>
// Components
import { CommentContainer } from '@/components/Comment'
// Macros
const props = defineProps({
  objectId: {
    type: Number
  }
})
</script>

<template>
  <div class="layout-comments-view">
    <comment-container :object-id="props.objectId" />
  </div>
</template>

<style>
.layout-comments-view {
  height: calc(100vh - 242px);
}
</style>
