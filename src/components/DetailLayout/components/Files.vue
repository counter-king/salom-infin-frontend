<script setup>
// Core
import { ref } from 'vue'
// Components
import { CardTable } from '@/components/Table'
// Reactive
const header = ref([
  {
    field: 'user',
    width: '50px'
  },
  {
    field: 'data',
  },
  {
    field: 'action',
    width: '100px'
  },
])
const list = ref([
  {
    user: 'uploaded',
    data: {
      title: '984-qaror.pdf',
      date: '21.08.2023',
      size: '9.3 MB'
    }
  },
  {
    user: 'deleted',
    data: {
      title: '984-qaror.pdf',
      date: '21.08.2023',
      size: '9.3 MB'
    }
  },
  {
    user: 'forward',
    data: {
      title: '984-qaror.pdf',
      date: '21.08.2023',
      size: '9.3 MB'
    }
  },
  {
    user: 'done',
    data: {
      title: '984-qaror.pdf',
      date: '21.08.2023',
      size: '9.3 MB'
    }
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
      <template #user>
        <div class="flex items-center justify-center w-10 h-10 bg-[#E8F1FF] p-1 rounded-[10px]">
          <base-icon name="FileTextIconFilled" color="transparent" />
        </div>
      </template>

      <template #data="{ data }">
        <div class="-ml-4">
          <h1 class="text-sm text-primary-900">{{ data.data.title }}</h1>

          <div class="flex items-center gap-2">
            <span class="text-xs text-greyscale-500 font-medium">9.3 MB</span>

            <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>

            <div class="flex items-center gap-1 text-xs">
              <h1 class="text-primary-900">Загружено</h1>
              <p class="text-greyscale-500">21.08.2023</p>
            </div>
          </div>
        </div>
      </template>

      <template #action="{ data }">
        <div class="flex justify-end gap-2">
          <base-button
            size="small"
            icon-left="DownloadMinimalistic"
            only-icon
            rounded
            text
            icon-width="18"
            icon-height="18"
            v-tooltip.top="{
              value: `<h4 class='text-xs text-white -my-1'>Скачать файл</h4>`,
              escape: true,
              autoHide: false
            }"
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
            v-tooltip.top="{
              value: `<h4 class='text-xs text-white -my-1'>Просмотр файла</h4>`,
              escape: true,
              autoHide: false
            }"
            class="group bg-white text-greyscale-500 hover:text-warning-500"
          />
        </div>
      </template>
    </card-table>
  </div>
</template>

<style scoped>

</style>
