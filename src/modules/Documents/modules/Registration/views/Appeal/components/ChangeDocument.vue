<script setup>
// Core
import { ref, unref } from 'vue'
// Store
import { useRegAppeal } from '../../../stores/appeal.store'
// Components
import AppealForm from '../../../components/Form/Appeal.vue'
// Composable
const regAppeal = useRegAppeal()
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
    await regAppeal.actionUpdateDocument()
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
        <appeal-form ref="formRef" />
      </template>
    </base-sidebar>
  </div>
</template>

<style scoped>

</style>
