<script setup>
// Core
import { ref, unref } from 'vue'
// Store
import { useRegIncoming } from '../../../stores/incoming.store'
// Components
import IncomingForm from '../../../components/Form/Incoming.vue'
// Composable
const regIncoming = useRegIncoming()
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
    await regIncoming.actionUpdateDocument()
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
        <incoming-form ref="formRef" />
      </template>
    </base-sidebar>
  </div>
</template>

<style scoped>

</style>
