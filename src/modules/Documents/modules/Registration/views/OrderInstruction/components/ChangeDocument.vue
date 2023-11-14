<script setup>
// Core
import { ref, unref } from 'vue'
// Store
import { useRegOrderInstruction } from '../../../stores/orderInstruction.store'
// Components
import OrderInstructionForm from '../../../components/Form/OrderInstruction.vue'
// Composable
const regOrderInstruction = useRegOrderInstruction()
// Reactive
const sidebarRef = ref(null)
const formRef = ref(null)
const sidebar = ref(false)
// Methods
const updateDocument = async () => {
  const _sidebarRef = unref(sidebarRef)
  const _formRef = unref(formRef)
  const valid = await _formRef.$v.$validate()

  if(!valid) return

  try {
    _sidebarRef.successButtonLoading = true
    await regOrderInstruction.actionUpdateDocument()
    _sidebarRef.successButtonLoading = false
    sidebar.value = false
  }
  catch (error) {
    _sidebarRef.successButtonLoading = false
  }
}
</script>

<template>
  <div class="change-document-view">
    <base-button
      label="update-document"
      rounded
      @click="sidebar = !sidebar"
    />

    <base-sidebar
      ref="sidebarRef"
      v-model="sidebar"
      title="update-document"
      @emit:cancel-button="(value) => sidebar = value"
      @emit:success-button="updateDocument"
    >
      <template #content>
        <order-instruction-form ref="formRef" />
      </template>
    </base-sidebar>
  </div>
</template>

<style scoped>

</style>
