<script setup>
import { computed } from 'vue'
import { saveAs } from 'file-saver'
// Components
import { FileDownloadIcon } from '@/components/Icons'
// Utils
import { isObject } from '@/utils'
// Macros
const props = defineProps({
  file: {
    tye: Object,
    default: () => {}
  }
})
// Computed
const extension = computed(() => props.file?.extension?.toLowerCase() || '')
// Methods
const download = () => {
  if (props.file) {
    saveAs(props.file.url || props.file.blobUrl, props.file.name)
  }
}
</script>

<template>
  <div v-if="props.file" class="h-full overflow-y-auto">
    <template v-if="extension === 'pdf' || extension === 'PDF'">
      <object
        :data="file.url ? file.url : file?.blobUrl"
        type="application/pdf"
        width="100%"
        height="100%"
      >
	      <iframe
          :src="file.url ? file.url : file?.blobUrl"
          width="500px"
          height="500px"
        />
      </object>
    </template>

    <template v-else-if="extension === 'jpg' || extension === 'jpeg' || extension === 'png'">
      <img
        :src="file.url ? file.url : file?.blobUrl"
        alt="Document image"
        class="max-w-full mx-auto block"
      />
    </template>

    <template v-else>
      <div class="flex flex-col items-center justify-center h-full">
        <h3 class="text-lg font-bold text-primary-900">{{ $t('unsupported-file-type') }}</h3>

        <div
          class="flex gap-2 bg-primary-500 text-sm font-medium text-white rounded-full py-2 px-4 mt-2 cursor-pointer"
          @click="download"
        >
          {{ $t('upload-file') }}

          <base-iconify :icon="FileDownloadIcon" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
