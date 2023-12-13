<script setup>
// Core
import { ref } from 'vue'
// Components
import ModalComment from './Comment.vue'
// Reactive
const modal = ref(false)
</script>

<template>
  <div class="done-document-view">
    <base-button
      label="execute-document"
      rounded
      type="button"
      @click="modal = true"
    />
  </div>

  <modal-comment
    v-model="modal"
    label="execute-document"
  />
</template>
