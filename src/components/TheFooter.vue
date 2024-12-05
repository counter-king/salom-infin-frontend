<script setup>
// Core
import { ref } from 'vue'
// Components
import { QuestionCircleBoldIcon } from '@/components/Icons'
import { ModalRate } from '@/components/Modal'
// Reactive
const count = ref(10)
const dialog = ref(false)
// Methods
const handleRate = (rate) => {
  count.value = rate

  if(count.value <= 3) {
    setTimeout(() => {
      dialog.value = true
    }, 500)
  }
}
</script>

<template>
  <footer class="app-footer bg-primary-900 rounded-3xl">
    <div class="border-b border-b-greyscale-800 p-5 pb-8">
      <div class="flex items-center">
        <div class="flex items-center justify-center w-11 h-11 rounded-full bg-greyscale-800">
          <base-iconify :icon="QuestionCircleBoldIcon" class="text-success-500 w-7 h-7" />
        </div>

        <div class="max-w-[205px] w-full text-white font-medium ml-4 mr-6">
          Sahifaning qulayligini va
          dizaynini qanday baholaysiz?
        </div>

        <div class="flex items-center gap-2">
          <template v-for="item in 5">
            <div
              class="flex items-center justify-center w-10 h-10 bg-greyscale-800 border border-greyscale-500/20 text-white rounded-xl cursor-pointer"
              :class="{
                '!bg-critic-500': (count === 1 || count === 2) && count >= item,
                '!bg-warning-500': count === 3 && count >= item,
                '!bg-success-500': (count === 4 || count === 5) && count >= item,
              }"
              @click="handleRate(item)"
            >
              {{ item }}
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="text-xs font-medium text-greyscale-500 text-center p-2 pb-3">
      Copyright ©2024. All Rights Reserved
    </div>
  </footer>

  <modal-rate v-model="dialog" header="comment" label="send" />
</template>

<style scoped>

</style>
