<script setup>
// Methods
const handleFiles = (event) => {
  let files = event.target.files

  if(files.length) {
    console.log(files);
  }
}
</script>

<template>
  <div class="attach-files-view">
    <label
      for="file"
      class="block mt-1 mr-1 pointer"
      v-tooltip.top="{
        value: `<h4 class='text-xs text-white -my-1'>Загрузить файл</h4>`,
        escape: true,
        autoHide: false
      }"
    >
      <base-icon name="AddIcon" />

      <input type="file" id="file" multiple hidden @change="handleFiles" />
    </label>

    <!-- Загрузить файлы (modal) -->

    <!-- /Загрузить файлы (modal) -->
  </div>
</template>


<style scoped>

</style>
