<script setup>
// Core
import { useRoute } from 'vue-router'
// Store
import { useReviewStore } from '../../stores/review.store'
// Components
import { StatusChip, PriorityChip } from '@/components/Chips'
import { ActionToolbar } from '@/components/Actions'
import { LinkableCell } from '@/components/Table'
// Utils
import { BOXES_INCOMING_COLUMNS } from '../../constants'
// Composable
const route = useRoute()
const reviewStore = useReviewStore()
// Reactive
const filterKeys = ['approvers', 'author', 'curator', 'signers', 'departments', 'register_number', 'status']
const keysToIncludeOnClearFilter = ['type']
// Methods
const link = (data) => {
  return { name: 'ReviewShow', params: { id: data.id } }
}
</script>

<template>
  <div class="review-view">
    <action-toolbar
      title="reviewers"
      :column-menu-items="reviewStore.headers"
      :storage-columns-name="BOXES_INCOMING_COLUMNS"
      :action-list="reviewStore.actionReviewList"
      :filter-keys="filterKeys"
      :keys-to-include-on-clear-filter="keysToIncludeOnClearFilter"
      @emit:reset-headers="reviewStore.resetHeaders"
    />

    <base-data-table
      :action-list="reviewStore.actionReviewList"
      :api-params="{ ...route.query } ?? null"
      :headers="reviewStore.headers"
      :value="reviewStore.list"
      :total-count="reviewStore.totalCount"
      :loading="reviewStore.listLoading"
      :storage-columns-name="BOXES_INCOMING_COLUMNS"
      expandable
      @emit:set-store-headers="(val) => reviewStore.headers = val"
    >
      <template #document.priority="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          <priority-chip :id="data.document.priority?.id" />
        </linkable-cell>
      </template>

      <template #document.title="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data.document.title }}
        </linkable-cell>
      </template>

      <template #document.document_type.name="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data.document.document_type?.name }}
        </linkable-cell>
      </template>

      <template #document.delivery_type.name="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data.document.delivery_type?.name }}
        </linkable-cell>
      </template>

      <template #document.description="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data.document.description }}
        </linkable-cell>
      </template>

      <template #document.journal.name="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data.document.journal?.name }}
        </linkable-cell>
      </template>

      <template #document.language.name="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data.document.language?.name }}
        </linkable-cell>
      </template>

      <template #document.number_of_papers="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data.document.number_of_papers }}
        </linkable-cell>
      </template>

      <template #document.outgoing_date="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data.document.outgoing_date }}
        </linkable-cell>
      </template>

      <template #document.outgoing_number="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data.document.outgoing_number }}
        </linkable-cell>
      </template>

      <template #document.register_number="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data.document.register_number }}
        </linkable-cell>
      </template>

      <template #document.register_date="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data.document.register_date }}
        </linkable-cell>
      </template>

      <template #for_reviewers="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          <base-avatar-group
            :items="data?.for_reviewers"
            shape="circle"
            avatar-classes="w-8 h-8"
          />
        </linkable-cell>
      </template>

      <template #status="{ data }">
        <linkable-cell
          v-if="data.status"
          :to="link(data)"
          :is-not-read="!data.read_time"
        >
          <status-chip :status="data.status"/>
        </linkable-cell>
      </template>

      <template #document.correspondent.name="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data.document.correspondent?.name }}
        </linkable-cell>
      </template>

      <template #document.code="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data.document.code }}
        </linkable-cell>
      </template>

      <template #document.grif="{ data }">
        <linkable-cell :to="link(data)" :is-not-read="!data.read_time">
          {{ data.document.grif }}
        </linkable-cell>
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
