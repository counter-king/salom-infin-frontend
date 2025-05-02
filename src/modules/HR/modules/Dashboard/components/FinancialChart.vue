<script setup>
import { ref } from 'vue'
import ChartCard from '../components/Card.vue'

const year = ref(0)
</script>

<template>
  <div class="relative pb-[35%]">
    <div class="absolute top-0 left-0 w-full h-full">
      <chart-card class="h-full pt-6 pb-8 px-10">
        <header class="flex flex-wrap items-center">
          <div class="flex items-center flex-1 gap-7 text-greyscale-900">
            <h1 class="text-lg font-semibold">Динамика ФОТ</h1>

            <label for="checkbox-year" class="flex items-center gap-2 cursor-pointer">
              <Checkbox
                v-model="year"
                :value="true"
                input-id="checkbox-year"
                :pt="{
                  root: {
                    class: 'flex items-center'
                  },
                  input:{
                    class: 'checkbox-event w-5 h-5 rounded'
                  }
                }"
              >
              </Checkbox>

              <span class="font-semibold text-base">2024 Год</span>
            </label>
          </div>

          <div class="flex items-center gap-7">
            <div class="flex items-center gap-2">
              <div
                class="w-4 h-4 rounded"
                style="background: repeating-linear-gradient(-45deg, #66c2ff, #66c2ff 4px, #4da6ff 4px, #4da6ff 8px)"
              ></div>

              <span class="text-[13px] font-medium text-greyscale-900">Сравнение Головной банк</span>
            </div>

            <div class="flex items-center gap-2">
              <div
                class="w-4 h-4 rounded"
                style="background: repeating-linear-gradient(-45deg, #FFECC8, #FFECC8 4px, #FFA803 4px, #FFA803 8px)"
              ></div>

              <span class="text-[13px] font-medium text-greyscale-900">Сравнение Филиальная сеть</span>
            </div>

            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-info-500"></div>

              <span class="text-[13px] font-medium text-greyscale-900">Головной Банк</span>
            </div>

            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-warning-500"></div>

              <span class="text-[13px] font-medium text-greyscale-900">Филиальная сеть</span>
            </div>
          </div>
        </header>

        <div class="grid grid-cols-6 gap-16 mt-11">
          <template v-for="item in 6">
            <div class="col-span-1">
              <div class="flex justify-center gap-5">
                <div class="w-14 h-[385px] relative bg-greyscale-50 rounded-lg overflow-hidden">
                  <div class="bg-info-50 absolute w-full h-[70%] bottom-0 left-0 border-t-[3px] border-t-info-500"></div>

                  <div class="gradient-info-diagonal absolute w-full h-[50%] bottom-0 left-0 border-t-[3px] border-t-info-300"></div>
                </div>

                <div class="w-14 h-[385px] relative bg-greyscale-50 rounded-lg overflow-hidden">
                  <div class="bg-warning-50 absolute w-full h-[70%] bottom-0 left-0 border-t-[3px] border-t-warning-500"></div>

                  <div class="gradient-warning-diagonal absolute w-full h-[50%] bottom-0 left-0 border-t-[3px] border-t-warning-300"></div>
                </div>
              </div>

              <span class="block text-sm font-medium text-greyscale-900 text-center mt-4">Фиксированное вознаграждение</span>
            </div>
          </template>
        </div>
      </chart-card>
    </div>
  </div>
</template>

<style scoped>
.gradient-info-diagonal {
  background: repeating-linear-gradient(
    -45deg,
    #e0f5ff,
    #e0f5ff 15px,
    #d0efff 15px,
    #d0efff 30px
  )
}

.gradient-warning-diagonal {
  background:
    repeating-linear-gradient(
      -45deg,
      #fff8eb,
      #fff8eb 15px,
      #fde7b0 15px,
      #fde7b0 30px
    )
}
</style>
