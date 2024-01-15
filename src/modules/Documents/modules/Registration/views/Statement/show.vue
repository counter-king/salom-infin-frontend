<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Store
import { useRegStatement } from '../../stores/statement.store'
// Components
import { LayoutWithTabs } from '@/components/DetailLayout'
import ChangeDocument from "./components/ChangeDocument.vue"
// Composable
const route = useRoute()
const statementStore = useRegStatement()
// Reactive
const loading = ref(true)
// Hooks
onMounted(async () => {
  loading.value = true
  await statementStore.actionStatementGetById({ id: route.params.id })
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<template>
  <div class="incoming-show-view h-full">
    <template v-if="loading">
      <base-spinner />
    </template>

    <template v-else>
      <layout-with-tabs
        :title="statementStore.detailModel.title"
        :preview-detail="statementStore.detailModel.__copy_prototype"
        :object-id="statementStore.detailModel.id"
        :headers="statementStore.headers"
      >
        <template #preview-actions>
          <div class="mt-5">
            <change-document />
          </div>
        </template>
      </layout-with-tabs>
    </template>
  </div>
</template>

<style scoped>

</style>

