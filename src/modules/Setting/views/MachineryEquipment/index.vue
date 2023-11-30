<script setup>
// Core
import { useI18n } from 'vue-i18n'
// Store
import { useSearchStore } from "./stores/index";
// Components
import { CardTable} from "../../../../components/Table/index";
// Composable
const { t } = useI18n()
const searchStore = useSearchStore();
</script>
<template>
  <div class="flex flex-col h-full">
    <div class="flex mb-5 justify-between items-center">
      <h1 class="text-2xl font-bold text-primary-900">Техника и оборудования</h1>
    </div>

    <div class="bg-white flex flex-col h-full rounded-2xl p-6">
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

        <template #dateEntered="{ data }">
          {{data.dateEntered}}
        </template>
      </card-table>
    </div>
  </div>
</template>

<style>
.table-card.m-e-table tr td:first-child {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.table-card.m-e-table tr td:last-child {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.table-card.m-e-table tr{
  box-shadow: none;
}
.table-card.m-e-table th,
.table-card.m-e-table td{
  border-bottom: 1px solid #dee2e6;
}
.table-card.m-e-table thead{
  background-color: rgba(247, 247, 249, 1);
  /* background-color: red; */
  border-radius: 12px !important;
  overflow: hidden;
}
.table-card.m-e-table tr th:first-child{
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}
.table-card.m-e-table tr th:last-child{
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}
</style>

