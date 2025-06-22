<script setup>
import { onMounted, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHRDashboardStore } from '../../Dashboard/stores'
import { formatNumberWithFloat } from '@/utils'

const { t } = useI18n()
const dashboardStore = useHRDashboardStore()

const props = defineProps({
  colors: {
    type: Array
  },
  isMain: {
    type: Boolean
  }
})

onMounted(async () => {
  const month = new Date().getMonth()
  const year = new Date().getFullYear()

  await dashboardStore.actionDashboardByCompanyType({
    is_main: props.isMain,
    start_date: `${year}-01-01`,
    end_date: `${year}-${month < 9 ? '0' + month : month}-01`,
  })
})
const showNumbers = inject('showNumbers')
</script>

<template>
  <div class="chart-bar-view space-y-3">
    <template v-if="dashboardStore.companyType.loader">
      <div class="h-96">
        <base-spinner />
      </div>
    </template>

    <template v-else>
      <template v-for="item in dashboardStore.companyType.data">
        <div class="flex gap-4">
          <div class="flex w-[150px] h-10">
            <h1
              class="text-sm text-greyscale-900 font-medium line-clamp-2"
              v-tooltip.top="{
                value: `<h4 class='text-xs text-white text-center -my-1'>${item.department}</h4>`,
                escape: true,
                autoHide: false
              }"
            >
              {{ item.department }}
            </h1>
          </div>

          <div class="flex-1 relative pt-[5px]">
            <template v-if="showNumbers">
              <div class="flex gap-2 absolute -top-6">
                <template v-for="({ color, longText }) in colors">
                  <template v-if="item.items.find(({ category }) => category === longText)">
                    <div class="flex items-center gap-[6px] bg-greyscale-900 relative rounded-lg text-white text-xs font-semibold py-1 px-[6px]">
                      <div class="w-[10px] h-[10px] rounded" :style="{ background: color }"></div>

                      <span>{{ formatNumberWithFloat(item.total) }}</span>

<!--                      <div class="w-4 h-[6px] bg-greyscale-900 absolute bottom-0 -rotate-45 right-8"></div>-->
                    </div>
                  </template>
                </template>
              </div>
            </template>

            <div class="flex">
              <template v-for="({ color, longText }) in colors">
                <div
                  v-if="item.items.find(({ category }) => category === longText)"
                  v-tooltip.top="{
                  value: `<h4 class='text-xs text-white text-center -my-1'>${ formatNumberWithFloat(item.items.find(({ category }) => category === longText).total)}</h4>`,
                  escape: true,
                  autoHide: false
                }"
                  class="h-3"
                  :style="{
                  background: color,
                  width: `${((item.items.find(({ category }) => category === longText).total / dashboardStore.companyType.additionalMax) * 100).toFixed(1)}%`
                }"
                >
                </div>
              </template>
            </div>
          </div>

          <div class="w-[110px] text-xs font-medium text-greyscale-900 text-right">
            {{ formatNumberWithFloat(item.total) }}
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>

</style>
