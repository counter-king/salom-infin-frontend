<script setup>
// Core
import { useI18n } from 'vue-i18n'
// Store
import { useSearchStore } from "./stores/index";
// Components
import { CardTable} from "@/components/Table/index";
// Composable
const { t } = useI18n()
const searchStore = useSearchStore();
</script>
<template>
  <div class="flex flex-col h-full">
    <div class="flex mb-5 justify-between items-center">
      <h1 class="text-2xl font-bold text-primary-900">Журнал</h1>

      <base-button
        label="create"
        icon-left="AddIcon"
        rounded
        type="button"
        @click="sidebar = !sidebar"
      />
    </div>

    <card-table
      class="m-e-table"
      :value="searchStore.list"
      :headers="searchStore.headers"
    >
      <template #number="{ data }">
        {{data.number}}
      </template>

      <template #nameTechnique="{ data }">
        {{data.nameTechnique}}
      </template>

      <template #id="{ data }">
        {{data.id}}
      </template>

      <template #inb="{ data }">
        {{data.inb}}
      </template>

      <template #action>
        <div class="flex justify-end gap-2">
          <base-button
            size="small"
            icon-left="DownloadMinimalistic"
            only-icon
            rounded
            text
            icon-width="18"
            icon-height="18"
            class="group bg-white text-greyscale-500 hover:text-primary-500"
          />

          <base-button
            size="small"
            icon-left="EyeIcon"
            only-icon
            rounded
            text
            icon-width="18"
            icon-height="18"
            class="group bg-white text-greyscale-500 hover:text-warning-500"
          />
        </div>
      </template>
    </card-table>
  </div>
</template>


