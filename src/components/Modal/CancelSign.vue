<script setup>
// Core
import { ref } from 'vue'
// Components
import { ModalComment } from '@/components/Modal'
import { DangerTriangleIcon } from '@/components/Icons'
// Macros
const props = defineProps({
  createButtonFn: {
    type: Function,
    default: () => void 0
  }
})
// Reactive
const modal = ref(false)
</script>

<template>
  <base-button
    severity="danger"
    label="cancel-sign"
    :icon-left="DangerTriangleIcon"
    rounded
    type="button"
    @click="modal = true"
  />

  <modal-comment
    v-model="modal"
    label="cancel-sign"
    create-button-color="danger"
    :create-button-fn="props.createButtonFn"
  />
</template>

<style scoped>

</style>
