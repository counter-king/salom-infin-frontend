<script setup>
const items = [
  {
    id: 1,
    image: '/images/dashboard/emoji-1.svg'
  },
  {
    id: 2,
    image: '/images/dashboard/emoji-2.svg'
  },
  {
    id: 3,
    image: '/images/dashboard/emoji-3.svg'
  },
  {
    id: 4,
    image: '/images/dashboard/emoji-4.svg'
  },
  {
    id: 5,
    image: '/images/dashboard/emoji-5.svg'
  }
]
</script>

<template>
  <div class="survey-widget shadow-button rounded-[20px] bg-white py-4 px-5">
    <div class="text-greyscale-500 text-sm font-medium">So'rovnoma</div>
    <div class="text-greyscale-900 text-lg font-semibold mt-1">Bugun kayfiyatingiz qanday?</div>

    <div class="flex justify-around align-center mt-4">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex justify-center items-center w-12 h-12 rounded-full bg-greyscale-50 hover:bg-greyscale-90 cursor-pointer"
      >
        <img :src="item.image" alt="Emoji">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
