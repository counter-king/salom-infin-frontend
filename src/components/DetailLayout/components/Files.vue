<script setup>
// Core
import { ref } from 'vue'
import { saveAs } from  'file-saver'
// Components
import { CardTable } from '@/components/Table'
import { FilePreview } from "@/components/Files";
// Utils
import { formatDate } from '@/utils/formatDate'
// Props
const props = defineProps({
  files: {
    type: Array,
    default: () => []
  }
})
// Reactive
const header = ref([
  {
    field: 'title'
  }
])
const zoomDialog = ref(false)
const currentFile = ref({})
// Methods
const zoomFile = (event, file) => {
  event.stopImmediatePropagation()
  zoomDialog.value = true
  currentFile.value = { ...file, document: file }
}
const download = (event, data) => {
  event.stopImmediatePropagation()
  saveAs(data.url, data.name)
}
</script>

<template>
  <div class="layout-files-view">
    <card-table
      :headers="header"
      :value="props.files"
      :shadow="false"
      scroll-height="calc(100vh - 297px)"
      table-class="border-spacing-y-2"
      wrapper-class="h-[calc(100vh-297px)] p-6 pt-4"
      body-cell-class="bg-greyscale-50"
      paginator-root-class="bg-greyscale-50 !rounded-none border-t"
      theadClass="hidden"
    >
      <template #title="{ data }">
        <div class="flex items-center gap-4">
          <div class="flex items-center justify-center w-10 h-10 bg-[#E8F1FF] p-1 rounded-[10px]">
            <base-icon name="FileTextIconFilled" color="transparent" />
          </div>

          <div class="flex-1">
            <h1 class="text-sm text-primary-900">{{ data.name }}</h1>

            <div class="flex items-center gap-2">
              <span class="text-xs text-greyscale-500 font-medium">{{ data.file_size }} MB</span>

              <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>

              <div class="flex items-center gap-1 text-xs">
                <h1 class="text-primary-900">Загружено</h1>
                <p class="text-greyscale-500">{{ formatDate(data.created_date) }}</p>
              </div>
            </div>
          </div>

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
              @click="download($event, data)"
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
              @click="zoomFile($event, data)"
            />
          </div>
        </div>
      </template>
    </card-table>

	  <base-dialog v-model="zoomDialog" max-width="max-w-[820px]">
		  <template #header>
			  <div class="flex-1 truncate mr-2">
				  <h1 class="text-xl font-semibold truncate">{{ currentFile.title }}</h1>
			  </div>
		  </template>

		  <template #content>
			  <div class="-my-6 -mx-8 h-[80vh]">
				  <file-preview :file="currentFile" />
			  </div>
		  </template>
	  </base-dialog>
  </div>
</template>

<style scoped>

</style>
