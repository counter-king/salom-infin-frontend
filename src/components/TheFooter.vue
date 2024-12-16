<script setup>
// Core
import { ref } from 'vue'
import { useRoute } from 'vue-router';
// Components
import { QuestionCircleBoldIcon } from '@/components/Icons'
import { ModalRate } from '@/components/Modal'
import { fetchCreateRatePage } from '@/services/common.service';
// store

const route = useRoute();

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

const postRatePage = async (comment) => {
  await fetchCreateRatePage({ rank: count.value, comment, page_url: route.fullPath})
  count.value = 10
}

const onCancelModal = () => {
  count.value = 10
}

</script>

<template>
  <footer class="app-footer rounded-3xl mt-6">
    <div class="border-b border-b-greyscale-200/90 py-5">
      <div class="flex items-center">
        <div class="flex items-center justify-center w-11 h-11 rounded-full bg-greyscale-200">
          <base-iconify :icon="QuestionCircleBoldIcon" class="text-success-500 w-7 h-7" />
        </div>

        <div class="max-w-[205px] w-full text-greyscale-300 ml-4 mr-6">
          Sahifaning qulayligini va
          dizaynini qanday baholaysiz?
        </div>

        <div class="flex items-center gap-2">
          <template v-for="item in 5">
            <div
              class="flex items-center justify-center w-10 h-10 bg-greyscale-300 border border-greyscale-500/20 text-white rounded-xl cursor-pointer"
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

    <div class="text-xs font-medium text-greyscale-300 text-center p-2 pb-0">
      Copyright ©2024. All Rights Reserved
    </div>
  </footer>

  <modal-rate v-model="dialog" header="comment" label="send" :createButtonFn="postRatePage" :onCancelModal="onCancelModal" />
</template>

<style scoped>

</style>
