<script setup>
// Core
import { useI18n } from "vue-i18n";
// Components
import { CalendarMenu, ColumnMenu, ExportButton, FilterMenu} from "./index";

const { t } = useI18n();

const props = defineProps({
  title: {
    type: String,
    default: 'create'
  },
  columnMenuItems: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="flex mb-5 justify-between items-center">
    <h1 class="text-2xl font-bold text-primary-900">{{ t(props.title) }}</h1>

    <div class="flex items-center gap-2">

      <export-button />

      <calendar-menu />

      <filter-menu />

      <column-menu :items="props.columnMenuItems" />

      <slot name="end"/>
    </div>
  </div>
</template>

<style scoped>

</style>
