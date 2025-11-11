<script setup>
// Core
import { onMounted } from "vue"
import { useRoute } from "vue-router"
// Store
import { useTableSystemStore } from "@/modules/HR/modules/TimesheetSystem/stores/tableSystem.store"
import { HR_TIMESHEET_TABLE_COLUMN } from "@/modules/HR/constants";
import { ActionBackButton, ActionToolbar } from "@/components/Actions";

// Composable
const store = useTableSystemStore()
const route = useRoute()

// Methods
const back = async() => {

}

// Hooks
onMounted(async() => {
  await store.actionGetTableDetail(route.params.id)
})
</script>

<template>
  <div class="table-show-view">
    <action-toolbar
      title="timesheet-system"
      :action-buttons="[]"
      :column-menu-items="[]"
    >
      <template #title-before>
        <action-back-button
          self
          @click="back"
        />
      </template>
    </action-toolbar>
    <pre>{{ store.detail }}</pre>
  </div>
</template>

<style scoped>

</style>
