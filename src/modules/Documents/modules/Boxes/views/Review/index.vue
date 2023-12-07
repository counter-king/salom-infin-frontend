<script setup>
// Core
import { ref, unref, onMounted } from 'vue'
// Store
import { useReviewStore } from '../../stores/review.store'
// Utils
import { BOXES_INCOMING_COLUMNS } from '../../constants'
// Composable
const reviewStore = useReviewStore()
// Hooks
onMounted(async () => {
  await reviewStore.actionReviewList()
})
</script>

<template>
  <div class="review-view">
    <base-data-table
      :headers="reviewStore.headers"
      :value="reviewStore.list"
      :loading="reviewStore.listLoading"
      :storage-columns-name="BOXES_INCOMING_COLUMNS"
      expandable
    >
      <template #document.correspondent.name="{ data }">
        <pre>{{ data }}</pre>
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
