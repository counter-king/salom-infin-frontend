<script setup>
// Components
import { ActionToolbar } from '@/components/Actions'
import Calendar from '../components/Calendar.vue'
import CreateEventMenu from '../components/CreateEventMenu.vue'
import SidebarActions from '../components/SidebarActions.vue'
</script>

<template>
  <div class="calendar-view flex flex-col flex-1">
    <action-toolbar title="Календарь">
      <template #title-after>
        <base-button
          color="bg-primary-0 text-primary-dark"
          border-color="border-transparent"
          label="Сегодня"
          rounded
          shadow
          type="button"
        />
      </template>

      <template #filters>
        <span></span>
      </template>

      <template #end>
        <create-event-menu />
      </template>
    </action-toolbar>

    <div class="flex gap-6 h-[calc(100vh-245px)]">
      <calendar class="flex-1" />

      <sidebar-actions class="w-[354px]" />
    </div>
  </div>
</template>

<style scoped>

</style>
