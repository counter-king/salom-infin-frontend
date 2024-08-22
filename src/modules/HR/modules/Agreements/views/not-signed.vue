<script setup>
// Core
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Components
import { ActionToolbar, ActionBackButton, EriKeysMenu } from '@/components/Actions'
// Stores
import { useAgreementsStore } from '../stores/agreements.store'
// Composable
const route = useRoute()
const router = useRouter()
const agreementsStore = useAgreementsStore()
// Methods
const back = async () => {
  await router.replace({ name: 'AgreementGroups' })
}
const signDocument = () => {
  console.log('sign')
}
// Hooks
onMounted(async () => {
  await agreementsStore.getNegotiators({
    doc_type: route.params.item,
    unchecked: 'none'
  })
})
</script>

<template>
  <action-toolbar title="Неподписанные документы">
    <template #title-before>
      <action-back-button
        self
        @click="back"
      />
    </template>

    <template #filters>
      <eri-keys-menu @emit:sign="signDocument" />
    </template>
  </action-toolbar>

  <base-data-table
    :headers="agreementsStore.headers"
    :value="agreementsStore.notSignedList"
    :total-count="agreementsStore.notSignedCount"
  />
</template>
