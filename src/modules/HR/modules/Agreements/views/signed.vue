<script setup>
// Core
import { useRouter } from 'vue-router'
// Components
import { ActionToolbar, ActionBackButton } from '@/components/Actions'
// Stores
import { useAgreementsStore } from '../stores/agreements.store'
// Composable
const router = useRouter()
const agreementsStore = useAgreementsStore()
// Methods
const back = async () => {
  await router.replace({ name: 'AgreementGroups' })
}
</script>

<template>
  <action-toolbar title="Подписанные документы">
    <template #title-before>
      <action-back-button
        self
        @click="back"
      />
    </template>

    <template #filters>
      <span></span>
    </template>
  </action-toolbar>

  <base-data-table
    :headers="agreementsStore.headers"
    :value="agreementsStore.notSignedList"
    :total-count="agreementsStore.notSignedCount"
  />
</template>
