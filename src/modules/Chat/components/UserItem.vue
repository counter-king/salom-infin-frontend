<script setup>

</script>

<template>
  <div class="flex px-4 py-[14px] hover:bg-greyscale-50 w-full rounded-xl cursor-pointer">
    <div class="relative">
      <base-avatar
        label="Kirgizboev"
        color="#E2E8F0"
        shape="circle"
        avatar-classes="w-10 h-10"
        label-classes="text-lg font-semibold text-greyscale-900"
      />
      <div class="absolute w-3 h-3 bg-success-500 rounded-lg right-0 bottom-0 border-[2px] border-white"></div>
    </div>

    <div class="flex flex-col w-full ml-3">
      <div class="flex justify-between w-full items-center">
        <span class="text-sm font-semibold">Turg'unov Bahodir</span>
        <span class="text-xs font-medium text-greyscale-500">17:25</span>
      </div>

      <div class="flex justify-between items-center mt-1">
        <div class="text-xs font-medium text-greyscale-500 truncate max-w-[200px]">Привет! Как дела? Где ты ход...</div>
        <div class="flex justify-center items-center bg-critic-500 w-5 h-5 rounded-3xl">
          <span class="text-xs font-semibold text-white">2</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
