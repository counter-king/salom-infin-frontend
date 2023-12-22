<script setup>

</script>

<template>
  <div>
    <div class="flex bg-greyscale-50 rounded-xl border-dashed border h-16 hover:bg-primary-50 cursor-pointer">
      <div class="flex justify-center items-center w-full text-sm font-semibold select-none">
        <span class="text-primary-500 block mr-1">Перетащите</span> и <span class="text-primary-500 block mx-1">загрузите</span> свой файл
      </div>
    </div>

    <div class="mt-3 max-h-[300px] overflow-y-auto">
      <div
        class="flex bg-greyscale-50 rounded-xl h-16 relative overflow-hidden mb-2"
      >
        <div class="absolute w-2/3 h-full bg-[#EFEEFE]" />
        <div class="flex w-full h-full z-10 p-3 justify-between items-center">
          <div class="flex">
            <div class="bg-white rounded-lg p-2 flex justify-center items-center">
              <base-icon name="FileTextIconFilled" width="20" height="20" :stroke="false" class="text-primary-500" />
            </div>

            <div class="flex flex-col ml-3 gap-y-1">
              <span class="text-sm font-medium">File manager.pdf</span>
              <span class="text-xs font-medium text-greyscale-500">1.5 MB</span>
            </div>
          </div>

          <div class="flex items-center">
            <span class="text-sm font-medium">64%</span>

            <base-icon name="XIcon" width="16" height="16" class="text-greyscale-500 ml-6 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
