<script setup>
import { useI18n } from 'vue-i18n'
import { useSearchStore } from "./stores/index";
import { CardTable} from "@/components/Table/index";
const { t } = useI18n()
const searchStore = useSearchStore();
</script>
<template>
  <div class="flex flex-col h-full">
    <div class="flex mb-5 justify-between items-center">
      <h1 class="text-2xl font-bold text-primary-900">Журнал</h1>
      <base-button
        @click="sidebar = !sidebar"
        icon-left="AddIcon"
        label="create"
        rounded
        type="button"
      />
    </div>
    <card-table
      class="m-e-table"
      :value="searchStore.list"
      :headers="searchStore.headers"
    >
      <template #nameRu="{ data }">
        {{data.nameRu}}
      </template>
      <template #nameUZ="{ data }">
        {{data.nameUZ}}
      </template>
      <template #creatData="{ data }">
        {{data.creatData}}
      </template>
      <template #action>
        <div class="flex justify-end gap-2">
          <base-button
            class="group bg-white text-greyscale-500 hover:text-primary-500"
            icon-height="18"
            icon-left="DownloadMinimalistic"
            icon-width="18"
            only-icon
            rounded
            size="small"
            text
          />
          <base-button
            class="group bg-white text-greyscale-500 hover:text-warning-500"
            icon-height="18"
            icon-left="EyeIcon"
            icon-width="18"
            only-icon
            rounded
            size="small"
            text
          />
        </div>
      </template>
    </card-table>
  </div>
</template>
<style></style>