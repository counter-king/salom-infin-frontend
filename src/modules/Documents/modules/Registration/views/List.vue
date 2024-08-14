<script setup>
// Core
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Store
import { useCommonStore } from '@/stores/common'
import { useDocFlowStore } from '../stores/docflow.store'
// Components
import { DocTypeChip, StatusChip, PriorityChip } from '@/components/Chips'
import { ActionToolbar } from '@/components/Actions'
import { LinkableCell } from '@/components/Table'
import { Plus20SolidIcon } from '@/components/Icons'
// Constants
import { R_INCOMING_COLUMNS } from '../constants'
// Utils
import { formatDate } from '@/utils/formatDate'
// Enums
import { JOURNAL } from '@/enums'
// Composable
const route = useRoute()
const router = useRouter()
const commonStore = useCommonStore()
const docFlowStore = useDocFlowStore()
// Reactive
const filterKeys = ['approvers', 'author', 'curator', 'signers', 'departments', 'register_number', 'status']
const keysToIncludeOnClearFilter = ['type', 'journal_id']
// Computed
const journal = computed(() => commonStore.getJournalByCode(route.params.code))
// Watch
watch(
  () => route.params.code,
  async (_route) => {
		if(route.params.code) {
			await router.replace({
				query: {
					...route.query,
					journal_id: journal.value.id
				}
			})
			_route && await docFlowStore.actionGetList(route.query)
		}
  },
)
// Methods
const openModal = () => {
  docFlowStore.actionLoadFormCreateDocument({ journalCode: route.params.code })
  docFlowStore.actionToggleModalCreateDocument(true)
}
const link = (data) => {
  return {
    name: 'RegistrationShow',
    params: {
      code: route.params.code,
      id: data.id
    }
  }
}
</script>

<template>
  <div class="registration-incoming-view">
    <action-toolbar
      :title="journal?.name"
      :column-menu-items="docFlowStore.headers"
      :storage-columns-name="R_INCOMING_COLUMNS"
      :action-list="docFlowStore.actionGetList"
      :filter-keys="filterKeys"
      :keys-to-include-on-clear-filter="keysToIncludeOnClearFilter"
      @emit:reset-headers="docFlowStore.resetHeaders"
    >
      <template #end>
        <base-button
          label="create"
          :icon-left="Plus20SolidIcon"
          rounded
          type="button"
          @click="openModal"
        />
      </template>
    </action-toolbar>

    <base-data-table
      :action-list="docFlowStore.actionGetList"
      :api-params="{
        journal_id: route.query.journal_id ?? JOURNAL.INCOMING
      }"
      :headers="docFlowStore.headers"
      :value="docFlowStore.list"
      :total-count="docFlowStore.totalCount"
      :loading="docFlowStore.listLoading"
      :storage-columns-name="R_INCOMING_COLUMNS"
      expandable
      @emit:set-store-headers="(val) => docFlowStore.headers = val"
    >
      <template #priority="{ data }">
        <linkable-cell :to="link(data)">
          <priority-chip :id="data?.priority?.id" />
        </linkable-cell>
      </template>

      <template #title="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.title }}
        </linkable-cell>
      </template>

      <template #document_type="{ data }">
        <linkable-cell :to="link(data)">
          <doc-type-chip :type="data?.document_type?.name"/>
        </linkable-cell>
      </template>

      <template #delivery_type="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.delivery_type?.name }}
        </linkable-cell>
      </template>

      <template #description="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.description }}
        </linkable-cell>
      </template>

      <template #journal="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.journal.name }}
        </linkable-cell>
      </template>

      <template #language="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.language?.name }}
        </linkable-cell>
      </template>

      <template #number_of_papers="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.number_of_papers }}
        </linkable-cell>
      </template>

      <template #outgoing_date="{ data }">
        <linkable-cell :to="link(data)">
          {{ formatDate(data?.outgoing_date) }}
        </linkable-cell>
      </template>

      <template #outgoing_number="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.outgoing_number }}
        </linkable-cell>
      </template>

      <template #register_number="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.register_number }}
        </linkable-cell>
      </template>

      <template #register_date="{ data }">
        <linkable-cell :to="link(data)">
          {{ formatDate(data?.register_date) }}
        </linkable-cell>
      </template>

      <template #reviewers="{ data }">
        <linkable-cell :to="link(data)">
          <base-avatar-group
            :items="data?.reviewers"
            shape="circle"
            avatar-classes="w-8 h-8"
          />
        </linkable-cell>
      </template>

      <template #status="{ data }">
        <linkable-cell v-if="data?.status" :to="link(data)">
          <status-chip :status="data?.status"/>
        </linkable-cell>
      </template>

      <template #correspondent="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.correspondent?.name }}
        </linkable-cell>
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
