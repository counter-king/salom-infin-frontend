<script setup>
// core
// components
import { ActionToolbar } from '@/components/Actions';
import DataTable from '../components/DataTable.vue';
// stores
import { useInteractionABSStore } from '../stores';


// composibles
const interactionABSStore = useInteractionABSStore()

// methods

</script>

<template>
  <div class="">
    <action-toolbar title="interaction-with-abs1">
      <template #filters>
      </template>
    </action-toolbar>
    <div class="flex flex-col h-full">
      <DataTable
        :headers="interactionABSStore.headers"
        :value="interactionABSStore.list"
        scroll-height="calc(100vh - 360px)"
        class="flex flex-col h-full"
        :loading="interactionABSStore.listLoading"
        :total-count="interactionABSStore.totalCount"
        :action-list="interactionABSStore.actionGetInteractionABSList"
        :pageSize="15"
        >
          <template #order="{ data }">
            <div class="text-greyscale-500">
             {{ data.order }}
            </div>
          </template>
          <template #employee="{ data }">
            <div class="flex gap-3 items-center">
             <base-avatar :user="data.employee" />
             <span>{{ data.employee }}</span>
            </div>
          </template>

      </DataTable>
    </div>
  </div>
</template>