<script setup>
// Macros
const props = defineProps({
  title: {
    type: String,
    default: 'У вас нет данных'
  },
  labelClasses: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="flex justify-center items-center bg-white shadow-button rounded-xl">
    <div class="text-center">
      <img
        src="/images/cloud-table-empty.svg"
        alt="EmptyFolder"
        class="block mb-5 mx-auto"
      />

      <h1
        class="text-greyscale-500 font-medium text-sm"
        :class="props.labelClasses"
      >{{ props.title }}</h1>
    </div>
  </div>
</template>
