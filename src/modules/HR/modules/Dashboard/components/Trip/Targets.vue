<script setup>
import Card from '../Card.vue'
</script>

<template>
  <card>
    <h1 class="font-semibold text-greyscale-900 mb-1">Топ цели</h1>

    <div class="h-[284px] overflow-y-auto -mr-2">
      <template v-for="item in 25">
        <div
          class="group flex gap-4 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 cursor-pointer px-3 py-[9px] mr-2"
        >
          <span class="text-sm font-medium text-greyscale-500">{{ item }}</span>

          <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900 line-clamp-2">
            Joylarda biznes reja ko‘rsatkichlarini bajarilishini o‘rganish
            Joylarda biznes reja ko‘rsatkichlarini bajarilishini o‘rganish
          </h1>

          <span class="text-greyscale-900 text-sm font-semibold">20</span>

          <span class="w-9 text-right text-sm group-hover:text-greyscale-900">
            32%
          </span>
        </div>
      </template>
    </div>
  </card>
</template>

<style scoped>

</style>
