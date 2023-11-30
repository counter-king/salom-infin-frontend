<script setup>
// Core
import { ref } from 'vue'
// Components
import { CardTable } from '@/components/Table'
import { FileChip } from '@/components/Chips'
// Reactive
const header = ref([
  {
    field: 'user',
    width: '50px'
  },
  {
    field: 'action'
  },
])
const list = ref([
  {
    user: 'uploaded'
  },
  {
    user: 'deleted'
  },
  {
    user: 'forward'
  },
  {
    user: 'done'
  },
])
</script>

<template>
  <div class="layout-history-view p-6 pt-4">
    <card-table
      :headers="header"
      :value="list"
      :shadow="false"
      tableClass="border-spacing-y-2"
      body-cell-class="bg-greyscale-50"
      paginator-root-class="bg-greyscale-50"
      theadClass="hidden"
    >
      <template #user="{ data }">
        <div class="flex">
          <base-avatar
            :action-chip-type="data.user"
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            shape="circle"
            avatar-classes="w-8 h-8"
          />
        </div>
      </template>

      <template #action>
        <div class="-ml-3">
          <div class="flex items-center justify-between text-sm text-primary-900">
            <h1 class="text-semibold">Файл загружен</h1>
            <h1 class="font-medium">IP: 192.168.82.209</h1>
          </div>

          <div class="flex items-center gap-1 text-sm fomt-medium text-greyscale-500">
            <h1 class="font-semibold text-primary-500">Курбанов Нодирбек Собирович</h1>
            <span>загрузил файл</span>
            <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full mx-1"></div>
            <h1>21.12.2023, 15:48</h1>
          </div>

          <div class="border-t-[1px] my-2"></div>

          <div class="flex text-xs text-greyscale-500">
            <div class="w-1/3">
              <h1 class="mb-1">Исходное значение</h1>

              <div class="flex gap-1">
                <file-chip name="Ariza.docx" />
                <file-chip name="Bildirishnoma.pdf" />
              </div>
            </div>

            <div class="flex-1">
              <h1 class="mb-1">Новое значение</h1>

              <p class="text-xs font-semibold text-primary-900">Бегматов Абдулатиф Абдумуталович</p>
            </div>
          </div>
        </div>
      </template>
    </card-table>
  </div>
</template>

<style scoped>

</style>
