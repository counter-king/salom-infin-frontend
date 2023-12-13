<script setup>
// Core
import { ref } from 'vue'
// Components
import { ModalComment } from '@/components/Modal'
// Reactive
const modal = ref(false)
// Methods
const send = async () => {
  console.log('1111')
}
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
    @emit:up="send"
  />
</template>
