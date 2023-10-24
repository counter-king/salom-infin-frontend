<script setup>
// Core
import { useI18n } from 'vue-i18n'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  headers: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <DataTable :value="props.value">
    <template v-for="header in headers" :key="header.field">
      <Column
        :field="header.field"
        :header="header.header"
      >
        <template #header>
          {{ t(header.header) }}
        </template>
      </Column>
    </template>
  </DataTable>
</template>

<style scoped>

</style>
