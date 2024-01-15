<script setup>
import { computed } from 'vue'
// Macros
const props = defineProps({
  file: {
    tye: Object,
    default: () => {}
  }
})
// Computed
const extension = computed(() => props.file.name.split(".").pop())
</script>

<template>
  <div v-if="props.file" class="h-full">
    <template v-if="extension === 'pdf' || extension === 'PDF'">
      <object
        :data="props.file?.url"
        type="application/pdf"
        width="100%"
        height="100%"
      >
	      <iframe :src="props.file?.url" width="500px" height="500px">

	      </iframe>
      </object>
    </template>

    <template v-else-if="extension === 'jpg' || extension === 'jpeg' || extension === 'png'">
      <img :src="props.file?.url" alt="Document image" class="max-w-full mx-auto block" />
    </template>

    <template v-else>
      <div class="flex flex-col items-center justify-center h-full">
        <h3 class="text-lg font-bold text-primary-900">{{ $t('unsupported-file-type') }}</h3>

        <a
          :href="props.file?.url"
          :download="props.file?.url"
          target="_blank"
          class="flex gap-2 bg-primary-500 text-sm font-medium text-white rounded-full py-2 px-4 mt-2"
        >
          {{ $t('upload-file') }}

          <base-icon name="FileDownload" />
        </a>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
