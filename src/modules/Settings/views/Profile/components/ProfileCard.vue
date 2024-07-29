<script setup>
// Macros
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="profile-card-view max-w-[666px] bg-white shadow-block rounded-2xl py-8 px-6">
    <div class="flex items-center pl-2">
      <base-avatar
        avatar-classes="w-20 h-20"
        image="/images/avatars/1.jpg"
        shape="circle"
      />

      <div class="ml-5 flex-1">
        <h1  class="text-primary-900 text-xl font-semibold mb-1">Абдуллаев Рустам</h1>
        <span class="block text-greyscale-500 text-sm font-medium">Администратор</span>
      </div>
    </div>

    <div class="bg-greyscale-50 rounded-lg divide-y divide-greyscale-200 px-6 py-2 mt-8">
      <template v-for="item in props.items" :key="item.label">
        <div class="w-full flex justify-between text-sm py-3">
          <p class="text-greyscale-500 font-medium">{{ item.label }}</p>

          <p class="text-primary-900 font-semibold">{{ item.data }}</p>
        </div>
      </template>
    </div>
  </div>
</template>
