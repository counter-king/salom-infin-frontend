<script setup>
// Components
import { WidgetDocFlow, WidgetBirthday, WidgetTasks, WidgetContacts, WidgetApplications } from '../components/widgets'
</script>

<template>
  <div class="dashboard-home w-full p-10 pt-6">
    <h1 class="text-2xl text-primary-900 font-bold mb-5">Дашбоард</h1>

    <div class="dashboard-grid flex h-[calc(100%-52px)] gap-5">
      <div class="flex-1">
        <widget-doc-flow class="mb-5" />

        <div class="flex gap-5">
          <widget-tasks />

          <widget-contacts />
        </div>
      </div>

      <div class="flex flex-col max-w-[350px] w-full">
        <widget-birthday class="h-[364px] overflow-y-auto mb-5" />

        <widget-applications class="flex-1 overflow-y-auto" />
      </div>
    </div>
  </div>
</template>

<style>

</style>
