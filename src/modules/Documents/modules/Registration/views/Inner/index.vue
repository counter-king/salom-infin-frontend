<script setup>
// Core
import {ref, onMounted, unref } from 'vue'
// Store
import { useRegInner } from "../../stores/inner.store"
import { useDocFlowStore } from '../../stores/docflow.store'

// Constants
import { R_INNER_COLUMNS } from "../../constants";
import InnerForm from '../../components/Form/Inner.vue'
// Components
import { DocTypeChip } from '@/components/Chips'
import { ActionToolbar } from "@/components/Actions";
// Composable
const docFlowStore = useDocFlowStore()
const regInner = useRegInner()
// Reactive
const formRef = ref(null)
const sidebarRef = ref(null)
const sidebar = ref(false)
// Hooks
onMounted(async () => {
  await regInner.actionGetList()
})
// Methods
const createDocument = async () => {
  const _sidebarRef = unref(sidebarRef)
  const _formRef = unref(formRef)
  const valid = await _formRef.$v.$validate()

  if(!valid) return

  try {
    _sidebarRef.successButtonLoading = true
    await docFlowStore.actionCreateDocument(regInner.detailModel)
    _sidebarRef.successButtonLoading = false
    sidebar.value = false
    await regInner.actionGetList()
  }
  catch (error) {
    _sidebarRef.successButtonLoading = false
  }
}
</script>

<template>
  <div class="registration-incoming-view">
    <action-toolbar
      title="inner"
      :column-menu-items="regInner.headers"
      :storage-columns-name="R_INNER_COLUMNS"
      @emit:reset-headers="regInner.resetHeaders"
    >
      <template #end>
        <base-button
          label="create"
          icon-left="AddIcon"
          rounded
          type="button"
          @click="sidebar = !sidebar"
        />
      </template>
    </action-toolbar>

    <base-data-table
      :headers="regInner.headers"
      :value="regInner.list"
      :storage-columns-name="R_INNER_COLUMNS"
    >
      <template #document_type="{ data }">
        <doc-type-chip :type="data.document_type.name"/>
      </template>

      <template #reviewers="{ data }">
        <base-avatar-group
          :items="data.reviewers"
          shape="circle"
          avatar-classes="w-8 h-8"
        />
      </template>

      <template #action="{ data }">
        <base-button
          color="text-critic-500"
          icon-left="TrashIcon"
          only-icon
          text
          rounded
        />
      </template>
    </base-data-table>

    <base-sidebar
      ref="sidebarRef"
      v-model="sidebar"
      title="create-document"
      @emit:cancel-button="(value) => sidebar = value"
      @emit:success-button="createDocument"
    >
      <template #content>
        <inner-form ref="formRef" />
      </template>
    </base-sidebar>
  </div>
</template>

<style scoped>
</style>
