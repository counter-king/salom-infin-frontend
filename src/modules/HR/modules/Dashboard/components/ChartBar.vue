<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHRDashboardStore } from '../../Dashboard/stores'
import { formatNumberToMillionsOrBillions } from '@/utils'

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
</script>

<template>
  <div class="chart-bar-view space-y-2">
    <template v-if="dashboardStore.companyType.loader">
      <div class="h-96">
        <base-spinner />
      </div>
    </template>

    <template v-else>
      <template v-for="(item, index) in dashboardStore.companyType.data">
        <div class="flex items-center gap-4">
          <div class="max-w-[150px]">
            <h1
              class="text-sm text-greyscale-900 font-medium line-clamp-2"
              v-tooltip.top="{
                value: `<h4 class='text-xs text-white text-center -my-1'>${index}</h4>`,
                escape: true,
                autoHide: false
              }"
            >
              {{ index }}
            </h1>
          </div>

          <div class="flex flex-1">
            <template v-for="({ color, longText }, index) in colors">
              <div
                v-if="item.find(({ category }) => category === longText)"
                v-tooltip.top="{
                  value: `<h4 class='text-xs text-white text-center -my-1'>${ formatNumberToMillionsOrBillions(item.find(({ category }) => category === longText).total)}</h4>`,
                  escape: true,
                  autoHide: false
                }"
                class="flex-1 h-3"
                :style="{ background: color }"
              ></div>
            </template>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>

</style>
