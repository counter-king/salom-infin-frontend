<script setup>
import { ref, unref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHRDashboardStore } from '../stores'
import ChartCard from '../components/Card.vue'
import { numberFormat } from '@/utils/formatIntl'
import { formatNumberToMillionsOrBillions, formatNumberToFinanceChart } from '@/utils'

const { t } = useI18n()
const dashboardStore = useHRDashboardStore()

const month = new Date().getMonth()
const year = new Date().getFullYear()

const blueBarRef = ref(null)
const warningBarRef = ref(null)
const numbersRef = ref(null)
const isCompare = ref(false)
const showNumbers = ref(false)
const current = ref({
  current_start: `${year}-01-01`,
  current_end: `${year}-${month < 9 ? '0' + month : month}-01`,
})
const compare = ref({
  compare_start: `${year - 1}-01-01`,
  compare_end: `${year - 1}-${month < 9 ? '0' + month : month}-01`,
})

const handleYear = async () => {
  if(isCompare.value) {
    await dashboardStore.actionDashboardComparison({
      ...current.value,
      ...compare.value
    })
  }
  else {
    await dashboardStore.actionDashboardComparison(current.value)
  }

  animateBars()
}
const handleShowNumber = () => {

}
const findMaxPercentage = (item, index) => {
  return Math.max(
    parseInt(item.current_amount_percent),
    isCompare.value ? parseInt(item.comparison_amount_percent) : 0,
    parseInt(dashboardStore.comparison.data.branches[index]?.current_amount_percent) ?? 0,
    isCompare.value ? parseInt(dashboardStore.comparison.data.branches[index]?.comparison_amount_percent) ?? 0 : 0
  )
}
const animateBars = () => {
  setTimeout(() => {
    const _blueBarRef = unref(blueBarRef)
    const _warningBarRef = unref(warningBarRef)

    _blueBarRef.forEach(el => el.classList.add('h-[385px]'))
    _warningBarRef.forEach(el => el.classList.add('h-[385px]'))
  }, 1000)
}

onMounted(async () => {
  await dashboardStore.actionDashboardComparison(current.value)
  animateBars()
})
</script>

<template>
  <div class="relative h-[575px]">
    <div class="absolute top-0 left-0 w-full h-full">
      <chart-card class="h-full pt-6 pb-8 mt-2 px-10">
        <header class="flex flex-wrap items-center">
          <div class="flex items-center flex-1 gap-7 text-greyscale-900">
            <h1 class="text-lg font-semibold">
              {{ t('finance-dashboard.text-0') }}
              ({{ t('mln') }})
            </h1>

            <div class="flex items-center gap-2 cursor-pointer">
              <Checkbox
                v-model="isCompare"
                :binary="true"
                input-id="checkbox-year"
                :pt="{
	                root: {
	                  class: 'flex items-center'
	                },
	                input:{
	                  class: 'checkbox-event w-5 h-5 rounded'
	                }
	              }"
                @change="handleYear"
              >
              </Checkbox>

              <label for="checkbox-year" class="cursor-pointer">
                <span class="font-semibold text-base">{{ new Date().getFullYear() - 1 }} {{ t('year') }}</span>
              </label>
            </div>

            <div class="flex items-center gap-2 cursor-pointer">
              <Checkbox
                v-model="showNumbers"
                :binary="true"
                input-id="checkbox-numbers"
                :pt="{
	                root: {
	                  class: 'flex items-center'
	                },
	                input:{
	                  class: 'checkbox-event w-5 h-5 rounded'
	                }
	              }"
                @change="handleShowNumber"
              >
              </Checkbox>

              <label for="checkbox-numbers" class="cursor-pointer">
                <span class="font-semibold text-base">{{ t('show-numbers') }}</span>
              </label>
            </div>
          </div>

          <div class="flex items-center gap-7">
            <template v-if="isCompare">
              <div class="flex items-center gap-2">
                <div
                  class="w-4 h-4 rounded"
                  style="background: repeating-linear-gradient(-45deg, #66c2ff, #66c2ff 4px, #4da6ff 4px, #4da6ff 8px)"
                ></div>

                <span class="text-[13px] font-medium text-greyscale-900">{{ t('comparison-with-head-bank') }}</span>
              </div>

              <div class="flex items-center gap-2">
                <div
                  class="w-4 h-4 rounded"
                  style="background: repeating-linear-gradient(-45deg, #FFECC8, #FFECC8 4px, #FFA803 4px, #FFA803 8px)"
                ></div>

                <span class="text-[13px] font-medium text-greyscale-900">{{ t('comparison-with-branch') }}</span>
              </div>
            </template>

            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-info-500"></div>

              <span class="text-[13px] font-medium text-greyscale-900">{{ t('head-office') }}</span>
            </div>

            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-warning-500"></div>

              <span class="text-[13px] font-medium text-greyscale-900">{{ t('branch') }}</span>
            </div>
          </div>
        </header>

        <template v-if="dashboardStore.comparison.loader">
          <div class="relative h-full">
            <base-spinner />
          </div>
        </template>

        <template v-else>
          <div class="grid grid-cols-6 gap-16 relative pl-10 mt-11">
            <div class="flex flex-col absolute top-0 left-0 w-full h-full">
              <template v-for="item in dashboardStore.comparison.axes">
                <div class="flex flex-1 gap-2">
                  <h1 class="text-xs font-medium text-greyscale-500">
                    {{ formatNumberToMillionsOrBillions(item) }} {{ t(formatNumberToFinanceChart(item)) }}
                  </h1>

                  <div
                    class="flex-1 h-[1px] mt-[6px]"
                    style="background-image: repeating-linear-gradient(to right, #E2E8F0 0px, #E2E8F0 10px, transparent 10px, transparent 20px)"
                  ></div>
                </div>
              </template>
            </div>

            <template v-for="(item, index) in dashboardStore.comparison.data.head_office">
              <div class="col-span-1">
                <div class="flex justify-center items-end h-[385px] relative gap-5">
                  <template v-if="showNumbers">
                    <div
                      ref="numbersRef"
                      class="absolute left-1/2 -translate-x-1/2 transition-opacity w-full max-w-[140px]"
                      :style="{
                        bottom: `${(findMaxPercentage(item, index) + 2)}%`
                      }"
                    >
                      <div class="bg-[#000] text-white text-xs space-y-2 rounded py-2 px-3">
                        <div class="flex items-center gap-2">
                          <div class="w-4 h-4 bg-info-200 rounded"></div>

                          <span class="font-medium">{{ numberFormat(parseInt(item.current_amount)) }}</span>
                        </div>

                        <template v-if="isCompare">
                          <div class="flex items-center gap-2">
                            <div
                              class="w-4 h-4 rounded"
                              style="background: repeating-linear-gradient(-45deg, #66c2ff, #66c2ff 4px, #4da6ff 4px, #4da6ff 8px)"
                            ></div>

                            <span class="font-medium">{{ numberFormat(parseInt(item.comparison_amount)) }}</span>
                          </div>
                        </template>

                        <div class="flex items-center gap-2">
                          <div class="w-4 h-4 bg-warning-200 rounded"></div>

                          <span class="font-medium">{{ numberFormat(parseInt(dashboardStore.comparison.data.branches[index]?.current_amount ?? 0)) }}</span>
                        </div>

                        <template v-if="isCompare">
                          <div class="flex items-center gap-2">
                            <div
                              class="w-4 h-4 rounded"
                              style="background: repeating-linear-gradient(-45deg, #FFECC8, #FFECC8 4px, #FFA803 4px, #FFA803 8px)"
                            ></div>

                            <span class="font-medium">{{ numberFormat(parseInt(dashboardStore.comparison.data.branches[index]?.comparison_amount ?? 0)) }}</span>
                          </div>
                        </template>
                      </div>
                    </div>
                  </template>

                  <div
                    ref="blueBarRef"
                    class="w-14 h-0 relative rounded-lg overflow-hidden transition-all duration-700"
                  >
                    <div
                      class="bg-info-50 hover:bg-info-100 transition-colors absolute w-full h-[70%] bottom-0 left-0 border-t-[3px] border-t-info-500 cursor-pointer"
                      :class="[item.comparison_amount_percent > item.current_amount_percent ? 'z-[1]': '']"
                      :style="{
												'height': item.current_amount_percent
											}"
                      v-tooltip.focus.top="{
		                    value: `<h4 class='text-xs text-white -my-1'>${numberFormat(parseInt(item.current_amount))}</h4>`,
		                    escape: true,
		                    autoHide: false
		                  }"
                      tabindex="0"
                    ></div>

                    <div
                      v-if="isCompare"
                      class="gradient-info-diagonal absolute w-full h-[50%] bottom-0 left-0 border-t-[3px] border-t-info-300 cursor-pointer"
                      :style="{
												'height': item.comparison_amount_percent,
											}"
                      v-tooltip.focus.top="{
		                    value: `<h4 class='text-xs text-white text-center -my-1'>${numberFormat(parseInt(item.comparison_amount))} <br> <span class='block mt-[2px]'>Сравнение с ${new Date().getFullYear() - 1} г.</span></h4>`,
		                    escape: true,
		                    autoHide: false
		                  }"
                      tabindex="0"
                    ></div>
                  </div>

                  <div ref="warningBarRef" class="w-14 h-0 relative rounded-lg overflow-hidden transition-all duration-700">
                    <div
                      class="bg-warning-50 hover:bg-warning-100 transition-colors absolute w-full h-[70%] bottom-0 left-0 border-t-[3px] border-t-warning-500 cursor-pointer"
                      :class="[
												dashboardStore.comparison.data.branches[index]?.comparison_amount_percent > dashboardStore.comparison.data.branches[index]?.current_amount_percent
													? 'z-[1]'
													: ''
												]"
                      :style="{
												'height': dashboardStore.comparison.data.branches[index]?.current_amount_percent ?? 0,
											}"
                      v-tooltip.focus.top="{
		                    value: `<h4 class='text-xs text-white -my-1'>${numberFormat(parseInt(dashboardStore.comparison.data.branches[index]?.current_amount ?? 0))}</h4>`,
		                    escape: true,
		                    autoHide: false
		                  }"
                      tabindex="0"
                    ></div>

                    <div
                      v-if="isCompare"
                      class="gradient-warning-diagonal absolute w-full h-[50%] bottom-0 left-0 border-t-[3px] border-t-warning-300 cursor-pointer"
                      :style="{
												'height': dashboardStore.comparison.data.branches[index]?.comparison_amount_percent ?? 0,
											}"
                      v-tooltip.focus.top="{
		                    value: `<h4 class='text-xs text-white text-center -my-1'>${numberFormat(parseInt(dashboardStore.comparison.data.branches[index]?.comparison_amount ?? 0))} <br> <span class='block mt-[2px]'>Сравнение с ${new Date().getFullYear() - 1} г.</span></h4>`,
		                    escape: true,
		                    autoHide: false
		                  }"
                      tabindex="0"
                    ></div>
                  </div>
                </div>

                <span class="block h-10 content-center text-sm font-medium text-greyscale-900 text-center mt-4">
				          {{ item.pay_type_id === 5
                  ? t('finance-dashboard.text-1')
                  : item.pay_type_id === 9
                    ? t('finance-dashboard.text-2')
                    : item.pay_type_id === 3
                      ? t('finance-dashboard.text-3')
                      : item.pay_type_id === 4
                        ? t('finance-dashboard.text-4')
                        : item.pay_type_id === 6
                          ? t('finance-dashboard.text-5')
                          : item.pay_type_id === 2
                            ? t('finance-dashboard.text-6')
                            : item.pay_type_id === 1
                              ? t('finance-dashboard.text-7')
                              : t('finance-dashboard.text-8')
                  }}
			          </span>
              </div>
            </template>
          </div>
        </template>
      </chart-card>
    </div>
  </div>
</template>

<style>
.gradient-info-diagonal {
  background: repeating-linear-gradient(
    -45deg,
    #e0f5ff,
    #e0f5ff 15px,
    #d0efff 15px,
    #d0efff 30px
  );
  transition: background 0.4s ease;
}

.gradient-info-diagonal:hover {
  background: repeating-linear-gradient(-45deg, #c9eafc, #c9eafc 15px, #b3e2fc 15px, #b3e2fc 30px);
}

.gradient-warning-diagonal {
  background:
    repeating-linear-gradient(
      -45deg,
      #fff8eb,
      #fff8eb 15px,
      #fde7b0 15px,
      #fde7b0 30px
    );
  transition: background 0.4s ease;
}

.gradient-warning-diagonal:hover {
  background: repeating-linear-gradient(
    -45deg,
    #fcebcf,
    #fcebcf 15px,
    #fcd98e 15px,
    #fcd98e 30px
  )
}
</style>
