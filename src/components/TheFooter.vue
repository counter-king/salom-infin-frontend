<script setup>
// Core
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
// Components
import { QuestionCircleBoldIcon } from '@/components/Icons'
import { ModalRate } from '@/components/Modal'
// Service
import { fetchCreateRatePage } from '@/services/common.service'
import Button  from 'primevue/button'
// utils
import { dispatchNotify } from '@/utils/notify'
// enums
import { COLOR_TYPES } from '@/enums'

// Composable
const route = useRoute()
const { t } = useI18n()
// Reactive
const count = ref(10)
const dialog = ref(false)
const isLoading = ref(false)
// Methods
const handleRate = async (rate) => {
  count.value = rate

  if(count.value <= 3) {
    setTimeout(() => {
      dialog.value = true
    }, 500)
  }
  if(count.value > 3) {
      await postRatePage()
  }
}

const postRatePage = async (comment) => {
  isLoading.value = true
  try{      
     await fetchCreateRatePage({ rank: count.value, comment, page_url: route.fullPath})
  }
  catch(e) {
    dispatchNotify(null, e?.message, COLOR_TYPES.ERROR)
  } finally {
        isLoading.value = false
        count.value = 10
  }
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
          {{ t('design-text') }}
        </div>

        <div class="flex items-center gap-2">
          <template v-for="item in 5">
            <Button
              :loading="item === count && isLoading"
              :disabled="item !== count && isLoading"
              :pt="{
                  root: {
                           class:'flex items-center justify-center w-10 h-10 bg-greyscale-300 border border-greyscale-500/20 text-white rounded-xl cursor-pointer hover:bg-greyscale-400 relative focus:!shodow-none custom-button'
                        }
              }"
              :class="{
                '!bg-critic-500': (count === 1 || count === 2) && count >= item,
                '!bg-warning-500': count === 3 && count >= item,
                '!bg-success-500': (count === 4 || count === 5) && count >= item,
              }"
              @click="handleRate(item)"
            >
              {{ count !== item ||  [1,2,3].includes(count) && !isLoading ? item : ""}}
              <template v-if="item === count && isLoading">
                <div
                  class="absolute top-0 left-0 flex items-center justify-center w-full h-full"
                  :class="bg-primary-500"
                >
                  <base-spinner root-classes="!w-6 !h-6" />
                </div>
              </template>
            </Button>
          </template>
        </div>
      </div>
    </div>

    <div class="text-xs font-medium text-greyscale-300 text-center p-2 pb-0">
      Copyright ©2024. All Rights Reserved
    </div>
  </footer>
  <modal-rate v-model="dialog" header="comment" label="send" :createButtonFn="postRatePage" :onCancelModal="onCancelModal" :loading="isLoading" />
</template>

<style scoped>

.p-button:focus{
  box-shadow: none !important;
}

::v-deep(.p-progress-spinner-circle) {
  stroke: white !important;
  animation: p-progress-spinner-color 6s linear infinite !important;
}

@keyframes p-progress-spinner-color {
  0%, 100% {
    stroke: white !important;
  }
  25% {
    stroke: white !important;
  }
  50% {
    stroke: white !important;
  }
  75% {
    stroke: white !important;
  }
}
</style>
