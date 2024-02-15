<script setup>

</script>

<template>
  <div class="flex px-4 py-[14px] hover:bg-greyscale-50 w-full rounded-xl cursor-pointer">
    <base-avatar
      label="Doclines Project"
      color="#E2E8F0"
      shape="circle"
      avatar-classes="w-10 h-10"
      label-classes="text-lg font-semibold text-greyscale-900"
    />

    <div class="flex flex-col w-full ml-3">
      <div class="flex justify-between w-full">
        <span class="text-sm font-semibold">Doclines Project</span>
        <span class="text-xs font-medium text-greyscale-500">09:12</span>
      </div>

      <div class="flex justify-between items-center mt-1">
        <div class="text-xs font-medium text-greyscale-500 truncate max-w-[200px]">
          <span class="text-primary-500 font-semibold">Alimov: </span>
          Salom mening ismim Alimov Sherzod
        </div>
        <div class="flex justify-center items-center bg-critic-500 w-5 h-5 rounded-3xl">
          <span class="text-xs font-semibold text-white">2</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
