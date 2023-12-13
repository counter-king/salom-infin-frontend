<script setup>
const emit = defineEmits(['emit:preview', 'emit:clearForm'])
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div class="px-6 py-4 overflow-y-auto">
      <slot name="default"/>
    </div>

    <div class="actions p-6">
      <base-button
        label="clear-form"
        color="bg-primary-0 hover:bg-greyscale-100 text-primary-dark"
        rounded
        shadow
        border-color="border-transparent"
        @click="emit('emit:clearForm')"
      />

      <base-button
        label="preview"
        rounded
        shadow
        border-color="border-transparent"
        class="ml-2"
        @click="emit('emit:preview')"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
