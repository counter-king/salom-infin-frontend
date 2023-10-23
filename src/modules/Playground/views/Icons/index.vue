<script setup>
const icons = import.meta.glob('../../../../assets/svg/**/*.svg', {
  as: 'raw',
  eager: true,
})

const transformIcons = Object.entries(icons).map(([name, svg]) => {
  const splitName = name.split("/")

  return {
    name: splitName.splice(splitName.length - 1).join().split(".").shift(),
    svg
  }
})
</script>

<template>
  <div class="icons-view p-5">
    <h1 class="text-26 font-bold mb-4">Icons list</h1>

    <div class="grid flex-wrap grid-cols-5 gap-5">
      <template v-for="icon in transformIcons">
        <div class="icons-card flex flex-col items-center justify-center border-[1px] h-[150px] rounded-md p-3 bg-light-1">
          <div v-html="icon.svg" class="mb-3"></div>

          <h1 class="font-medium">{{ icon.name }}</h1>
        </div>
      </template>
    </div>
  </div>
</template>
