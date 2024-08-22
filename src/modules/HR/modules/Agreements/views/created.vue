<script setup>
// Core
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
// Components
import { ActionToolbar, ActionBackButton } from '@/components/Actions'
import { LinkableCell } from '@/components/Table'
// Stores
import { useAgreementsStore } from '../stores/agreements.store'
// Utils
import { formatDateHour } from '@/utils/formatDate'
// Composable
const router = useRouter()
const agreementsStore = useAgreementsStore()
// Methods
const back = async () => {
  await router.replace({ name: 'AgreementGroups' })
}
// Hooks
onMounted(async () => {
  await agreementsStore.getNegotiations()
})
</script>

<template>
  <action-toolbar title="Созданные документы">
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
    :headers="agreementsStore.createdHeaders"
    :value="agreementsStore.createdList"
    :total-count="agreementsStore.createdCount"
  >
    <template #title="{ data }">
      <linkable-cell :to="{ name: 'AgreementCreatedRead', params: { id: data.id } }" is-not-read>
        {{ data.title ?? '-' }}
      </linkable-cell>
    </template>

    <template #doc_type.name="{ data }">
      <linkable-cell :to="{ name: 'AgreementCreatedRead', params: { id: data.id } }" is-not-read>
        {{ data.doc_type?.name }}
      </linkable-cell>
    </template>

    <template #doc_sub_type.name="{ data }">
      <linkable-cell :to="{ name: 'AgreementCreatedRead', params: { id: data.id } }" is-not-read>
        {{ data.doc_sub_type?.name }}
      </linkable-cell>
    </template>

    <template #created_date="{ data }">
      <linkable-cell :to="{ name: 'AgreementCreatedRead', params: { id: data.id } }" is-not-read>
        {{ formatDateHour(data.created_date) }}
      </linkable-cell>
    </template>
  </base-data-table>
</template>
