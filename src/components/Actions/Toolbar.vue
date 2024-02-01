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
  },
  storageColumnsName: {
    type: String,
    default: () => "",
    required: true
  },
  actionList: {
    type: Function,
    default: () => void 0
  },
  filterKeys: {
    type: Array,
    default: () => []
  },
  keysToIncludeOnClearFilter: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['emit:resetHeaders']);
</script>

<template>
  <div class="flex mb-5 justify-between items-center">
    <h1 class="text-2xl font-bold text-primary-900">{{ t(props.title) }}</h1>

    <div class="flex items-center gap-2">

      <export-button />

      <calendar-menu />

      <filter-menu
        :action-list="props.actionList"
        :filter-keys="props.filterKeys"
        :keys-to-include-on-clear-filter="props.keysToIncludeOnClearFilter"
      />

      <column-menu
        :items="props.columnMenuItems"
        :storage-columns-name="props.storageColumnsName"
        @emit:reset-headers="emits('emit:resetHeaders')"
      />

      <slot name="end"/>
    </div>
  </div>
</template>

<style scoped>

</style>
