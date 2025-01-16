<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div class="flex px-4 py-[14px] hover:bg-greyscale-50 w-full rounded-xl cursor-pointer items-center">
    <base-avatar
      :label="user?.last_name"
      :color="user?.color"
      avatar-classes="w-10 h-10"
      label-classes="text-sm font-medium text-white"
    />

    <div class="flex flex-col w-full ml-3">
      <span class="text-sm font-semibold">{{ user?.last_name }} {{ user?.first_name }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
